import { db } from '@/server/db';

// Test fetching all projects
export async function testFetchProjects() {
    const result = await db.project.findMany();
    console.log("Projects:", result);
}

// Test fetching all source code embeddings
export async function testFetchSourceCodeEmbeddings() {
    const result = await db.sourceCodeEmbedding.findMany();
    console.log("Source Code Embeddings:", result);
}

// Test fetching a specific project by ID
export async function testFetchProjectById(projectId: string) {
    const result = await db.project.findUnique({
        where: { id: projectId }
    });
    console.log(`Project with ID ${projectId}:`, result);
}

// Test fetching source code embeddings by project ID
export async function testFetchSourceCodeEmbeddingsByProjectId(projectId: string) {
    const result = await db.sourceCodeEmbedding.findMany({
        where: { projectId: projectId }
    });
    console.log(`Source Code Embeddings for project ${projectId}:`, result);
}

// Test running the raw query for similarity search
export async function testVectorSearch(queryVector: number[], projectId: string) {
    const vectorQuery = `ARRAY[${queryVector.join(',')}]`;

    const result = await db.$queryRaw`
        SELECT "fileName", "sourceCode", "summary",
        1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) AS similarity
        FROM "SourceCodeEmbedding"
        WHERE 1 - ("summaryEmbedding" <=> ${vectorQuery}::vector) > 0.5
        AND "projectId" = ${projectId}
        ORDER BY similarity DESC
        LIMIT 10
    ` as { fileName: string; sourceCode: string; summary: string }[];

    console.log(`Vector search results for project ${projectId}:`, result);
}

// Test fetching all commits
export async function testFetchCommits() {
    const result = await db.commit.findMany();
    console.log("Commits:", result);
}

// Test fetching commits by project ID
export async function testFetchCommitsByProjectId(projectId: string) {
    const result = await db.commit.findMany({
        where: { projectId: projectId }
    });
    console.log(`Commits for project ${projectId}:`, result);
}

// Test updating a specific source code embedding manually
export async function testUpdateSourceCodeEmbedding(embeddingId: string, newEmbedding: number[]) {
    await db.$executeRaw`
        UPDATE "SourceCodeEmbedding"
        SET "summaryEmbedding" = ${JSON.stringify(newEmbedding)}::vector
        WHERE "id" = ${embeddingId}
    `;
    console.log(`Updated embedding for ID: ${embeddingId}`);
}

// Test inserting a new source code embedding (if needed)
export async function testInsertSourceCodeEmbedding(projectId: string, fileName: string, sourceCode: string, summary: string) {
    const result = await db.sourceCodeEmbedding.create({
        data: {
            projectId,
            fileName,
            sourceCode,
            summary
        }
    });
    console.log("Inserted Source Code Embedding:", result);
}

// Test fetching users
export async function testFetchUsers() {
    const result = await db.user.findMany();
    console.log("Users:", result);
}

// Test fetching user by ID
export async function testFetchUserById(userId: string) {
    const result = await db.user.findUnique({
        where: { id: userId }
    });
    console.log(`User with ID ${userId}:`, result);
}

// Test fetching user-to-project relationships
export async function testFetchUserProjects() {
    const result = await db.userToProject.findMany();
    console.log("User to Project Relationships:", result);
}

// Test fetching user-to-project relationships by user ID
export async function testFetchUserProjectsByUserId(userId: string) {
    const result = await db.userToProject.findMany({
        where: { userId: userId }
    });
    console.log(`Projects associated with user ${userId}:`, result);
}

//"cm75ullpd0032xxng756d0151"

 // Ensure you import your Prisma instance

async function fetchSummaryEmbeddingsByProjectId(projectId: string) {
  try {
    const result = await db.sourceCodeEmbedding.findMany({
      where: { projectId },
      select: {
        id: true,
        fileName: true,
        summary: true,
        summaryEmbeddings: true, // Explicitly selecting embeddings
        projectId: true
      }
    });

    return result;
  } catch (error) {
    console.error('Error fetching summary embeddings:', error);
    throw new Error('Failed to fetch summary embeddings');
  }
}


testFetchSourceCodeEmbeddingsByProjectId("cm75ullpd0032xxng756d0151")