import { db } from '@/server/db';

async function checkSummaryEmbeddings(projectId: string) {
  try {
    const embeddings = await db.$queryRaw`
      SELECT "summaryEmbedding" 
      FROM "SourceCodeEmbedding" 
      WHERE "projectId" = ${projectId}
    `;

    console.log("Summary Embeddings:", embeddings);
  } catch (error) {
    console.error("Error fetching embeddings:", error);
  }
}

// Call the function with your projectId
checkSummaryEmbeddings(cm739xwx80007ufvmcdd2uelq);