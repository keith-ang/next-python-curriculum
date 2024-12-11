import { ChromaClient, OpenAIEmbeddingFunction } from "chromadb";
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

const apiKey = getEnvVar('OPENAI_API_KEY');
const embeddingModel = getEnvVar('OPENAI_EMBEDDING_MODEL');
const collectionName = getEnvVar('CHROMA_COLLECTION_NAME');

export async function initialiseDb(client: ChromaClient) {
  try {
    const embeddingFunction = new OpenAIEmbeddingFunction({
      openai_api_key: apiKey,
      openai_model: embeddingModel,
    });
    const collection = await client.getOrCreateCollection({
      name: collectionName,
      embeddingFunction: embeddingFunction,
    });
    return collection;
  } catch (err) {
    console.error('Error during database setup:', err);
    throw err;
  }
}