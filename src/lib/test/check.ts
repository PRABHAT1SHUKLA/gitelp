import { db } from '@/server/db';

async function fetchSummaryEmbeddings(projectId: string) {
  try {
    const results = await db.$queryRaw<
      { id: string; summaryEmbedding: string }[]
    >`
      SELECT "id", "summaryEmbedding"::TEXT
      FROM "SourceCodeEmbedding"
      WHERE "projectId" = ${projectId}
    `;

    console.log('Fetched summary embeddings:', results);
    return results.map(result => ({
      ...result,
      summaryEmbedding: JSON.parse(result.summaryEmbedding), // Convert back to JSON
    }));
  } catch (error) {
    console.error('Error fetching summary embeddings:', error);
    throw new Error('Failed to fetch summary embeddings');
  }
}


fetchSummaryEmbeddings('cm75ullpd0032xxng756d0151').then(console.log);
