// // vectorSearch.js
// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// async function searchVectorSimilarity(projectId, vectorQuery) {
//     try {
//         // Verify project exists
//         const project = await prisma.project.findUnique({
//             where: { id: projectId }
//         });

//         if (!project) {
//             console.log('Project not found. Available projects:');
//             const projects = await prisma.project.findMany({
//                 select: { id: true, name: true }
//             });
//             console.log(projects);
//             return [];
//         }

//         // Perform vector similarity search
//         const results = await prisma.$queryRaw(
//             `SELECT 
//                 "fileName",
//                 "sourceCode",
//                 "summary",
//                 1-("summaryEmbedding" <=> $1::vector) AS similarity
//             FROM "SourceCodeEmbedding"
//             WHERE "projectId" = $2
//             AND "summaryEmbedding" IS NOT NULL
//             ORDER BY similarity DESC
//             LIMIT 10`,
//             vectorQuery,
//             projectId
//         );

//         return results;

//     } catch (error) {
//         console.error('Error during vector search:', error);
//         throw error;
//     }
// }

// // Example usage
// async function main() {
//     try {
//         // List all projects
//         const projects = await prisma.project.findMany({
//             select: {
//                 id: true,
//                 name: true
//             }
//         });
        
//         if (projects.length === 0) {
//             console.log('No projects found. Creating a test project...');
//             const newProject = await prisma.project.create({
//                 data: {
//                     name: 'Test Project',
//                     githubUrl: 'https://github.com/test/test'
//                 }
//             });
//             console.log('Created project:', newProject);
//             projects.push(newProject);
//         }

//         console.log('Available projects:', projects);

//         // Use the first project for testing
//         const projectId = projects[0].id;
        
//         // Create a test vector (768 dimensions)
//         const testVector = Array(768).fill(0.1);
        
//         console.log(`Searching vectors for project ${projectId}...`);
//         const results = await searchVectorSimilarity(projectId, testVector);
        
//         console.log('\nSearch results:');
//         results.forEach((result, index) => {
//             console.log(`\nResult ${index + 1}:`);
//             console.log(`File: ${result.fileName}`);
//             console.log(`Summary: ${result.summary}`);
//             console.log(`Similarity: ${result.similarity.toFixed(4)}`);
//         });

//     } catch (error) {
//         console.error('Main error:', error);
//     } finally {
//         await prisma.$disconnect();
//     }
// }

// main();