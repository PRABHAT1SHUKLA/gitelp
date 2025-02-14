import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    // 1. Query to check SourceCodeEmbedding table structure
    const tableInfo = await prisma.$queryRaw`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'SourceCodeEmbedding';
    `;
    console.log('Table Structure:', tableInfo);

    // 2. Query all SourceCodeEmbedding records using raw SQL to include vector field
    const embeddings = await prisma.$queryRaw`
      SELECT 
        id,
        "sourceCode",
        "fileName",
        summary,
        "projectId",
        "summaryEmbedding"::text as "summaryEmbedding"
      FROM "SourceCodeEmbedding";
    `;
    console.log('Embeddings:', embeddings);

    // 3. Query with project relations
    const embeddingsWithProjects = await prisma.sourceCodeEmbedding.findMany({
      select: {
        id: true,
        sourceCode: true,
        fileName: true,
        summary: true,
        projectId: true,
        project: {
          select: {
            name: true,
            githubUrl: true
          }
        }
      }
    });
    console.log('Embeddings with Projects:', embeddingsWithProjects);

    // 4. Count total embeddings
    const count = await prisma.sourceCodeEmbedding.count();
    console.log('Total embeddings:', count);

    // 5. Example query to get embeddings for a specific project
    const projectEmbeddings = await prisma.sourceCodeEmbedding.findMany({
      where: {
        project: {
          name: {
            contains: 'your-project-name' // Replace with actual project name
          }
        }
      },
      select: {
        fileName: true,
        summary: true,
        project: {
          select: {
            name: true
          }
        }
      }
    });
    console.log('Project specific embeddings:', projectEmbeddings);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();