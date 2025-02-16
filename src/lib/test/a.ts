import { db } from '@/server/db';

const checkProjectSummaryEmbedding = async (projectId: string) => {
  const result = await db.$queryRaw`
    SELECT "fileName", "summaryEmbedding", "projectId"
    FROM "SourceCodeEmbedding"
    WHERE "projectId" = ${projectId};
  `;
  if (result=== 0) {
    console.log('No records found for the specified projectId:', projectId);
  } else {
    console.log('Records found for projectId:', projectId);
    console.log(result);
  }
};

checkProjectSummaryEmbedding('cm71ioyyu0000qcayertfe176').catch(console.error);
