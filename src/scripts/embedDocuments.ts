import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import { initialiseDb, getEnvVar } from './initialiseDb';
import { ChromaClient } from "chromadb";
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const directoryPath = getEnvVar('DOCUMENTS_FOLDER');
const chromaApiUrl = getEnvVar('CHROMA_DATABASE_URL');

export const chromaClient = new ChromaClient({ path: chromaApiUrl });

const chunkSize = Number(getEnvVar('CHUNK_SIZE')) || 512;
const chunkOverlap = Number(getEnvVar('CHUNK_OVERLAP')) || 100;

async function getDocumentsFromDirectory(dir: string): Promise<{ documents: string[], ids: string[] }> {
  const files = await readdir(dir);
  const documents: string[] = await Promise.all(files.map(file => readFile(path.join(dir, file), 'utf8')));

  const splitter = new RecursiveCharacterTextSplitter({ chunkSize, chunkOverlap });
  const chunkedDocuments: string[] = [];
  const expandedIds: string[] = [];

  for (const [index, doc] of documents.entries()) {
    const docChunks = await splitter.splitText(doc);
    chunkedDocuments.push(...docChunks);
    expandedIds.push(...docChunks.map((_, chunkIndex) => `${files[index]}-${chunkIndex}`));
  }

  return { documents: chunkedDocuments, ids: expandedIds };
}

async function main() {
  try {
    const collection = await initialiseDb(chromaClient);
    const { documents, ids } = await getDocumentsFromDirectory(directoryPath);
    await collection.upsert({ documents, ids });
    console.log('Finished upserting documents');
  } catch (err) {
    console.error('Error during embedding and upserting:', err);
  }
}

main().catch(console.error);