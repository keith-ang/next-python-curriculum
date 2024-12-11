export const runtime = 'nodejs'; // Set Node.js runtime

import { initialiseDb } from '@/scripts/initialiseDb';
import { ChromaClient } from 'chromadb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getEnvVar } from '@/scripts/initialiseDb';

const chromaApiUrl = getEnvVar('CHROMA_DATABASE_URL')
const chromaClient = new ChromaClient({ path: chromaApiUrl });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { queryText } = req.body;

  try {
    const collection = await initialiseDb(chromaClient);
    const queryResult = await collection.query({
      queryTexts: [queryText],
      nResults: 3,
    });

    const docsArray = queryResult.documents.flat();
    res.status(200).json({ documents: docsArray });
  } catch (err) {
    console.error('Error accessing/querying the database:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}