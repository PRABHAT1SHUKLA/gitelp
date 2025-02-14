import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function debugVectorEmbeddings(projectId) {
  try {
    // 1. Check if vector extension is properly installed
    console.log('\n1. Checking vector extension:');
    const vectorExtension = await prisma.$queryRaw`
      SELECT * FROM pg_extension WHERE extname = 'vector';
    `;
    console.log('Vector extension:', vectorExtension);

    // 2. Check table structure
    console.log('\n2. Checking table structure:');
    const tableStructure = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'SourceCodeEmbedding';
    `;
    console.log('Table structure:', tableStructure);

    // 3. Check if there are any rows in the table
    console.log('\n3. Checking total rows:');
    const totalRows = await prisma.$queryRaw`
      SELECT COUNT(*) as total FROM "SourceCodeEmbedding";
    `;
    console.log('Total rows:', totalRows[0].total);

    // 4. Check rows with non-null embeddings
    console.log('\n4. Checking rows with embeddings:');
    const rowsWithEmbeddings = await prisma.$queryRaw`
      SELECT COUNT(*) as total 
      FROM "SourceCodeEmbedding" 
      WHERE "summaryEmbedding" IS NOT NULL;
    `;
    console.log('Rows with embeddings:', rowsWithEmbeddings[0].total);

    // 5. Sample a single embedding to check its structure
    console.log('\n5. Sampling one embedding:');
    const sampleEmbedding = await prisma.$queryRaw`
      SELECT "summaryEmbedding"::text
      FROM "SourceCodeEmbedding"
      WHERE "summaryEmbedding" IS NOT NULL
      LIMIT 1;
    `;
    console.log('Sample embedding:', sampleEmbedding);

    // 6. Check for the specific project
    console.log('\n6. Checking project-specific data:');
    const projectRows = await prisma.$queryRaw`
      SELECT COUNT(*) as total
      FROM "SourceCodeEmbedding"
      WHERE "projectId" = ${projectId};
    `;
    console.log('Rows for project:', projectRows[0].total);

    // 7. Try to insert a test vector
    console.log('\n7. Testing vector insertion:');
    try {
      const testVector = Array(768).fill(0.1); // Assuming 768-dimensional vector
      await prisma.$executeRaw`
        INSERT INTO "SourceCodeEmbedding" (
          "id", 
          "sourceCode", 
          "fileName", 
          "summary", 
          "projectId", 
          "summaryEmbedding"
        ) VALUES (
          'test-' || now()::text, 
          'test', 
          'test.js', 
          'test summary', 
          ${projectId}, 
          ${testVector}::vector
        );
      `;
      console.log('Test vector insertion successful');
    } catch (error) {
      console.log('Test vector insertion failed:', error.message);
    }

  } catch (error) {
    console.error('Error during debugging:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Usage
const projectId = 'your-project-id'; // Replace with actual project ID
debugVectorEmbeddings(projectId);