import {GithubRepoLoader} from "@langchain/community/document_loaders/web/github"
import { Document } from "@langchain/core/documents"
import { generateEmbedding, summariseCode } from "./gemini"
import { db } from "@/server/db"
import { Octokit } from "octokit"


const getFileCount = async(path:string , octokit:Octokit , githubOwner:string , githubRepo:string , acc: number=0) =>{

  const { data } = await octokit.rest.repos.getContent({
    owner : githubOwner,
    repo:githubRepo,
    path
  })

}

export const checkCredits = async(githubUrl:string , githubToken:string) =>{
  
  const octokit =  new Octokit({auth: githubToken})
  const githubOwner = githubUrl.split('/')[3]
  const githubRepo = githubUrl.split('/')[4]
  if(!githubOwner || !githubRepo){
    return 0
  }
}

export const loadGithubRepo = async(githubUrl:string,githubToken?: string ) => {
  const loader = new GithubRepoLoader(githubUrl, {
    accessToken: githubToken || '',
    branch: 'main',
    ignoreFiles:['package-lock.json','yarn.lock','pnpm-lock.yml','bun.lockb'],
    recursive: true, 
    unknown:'warn',
    maxConcurrency:5
  })

  const docs = await loader.load()
  return docs
}

export const indexGithubRepo = async (projectId: string , githubUrl : string , githubToken? : string) =>{

  const docs = await loadGithubRepo(
    githubUrl,
    githubToken
  )

  const allEmbeddings = await generateEmbeddings(docs)

  await Promise.allSettled(allEmbeddings.map( async(embedding , index) =>{
    console.log(`processing ${index} of all ${allEmbeddings.length}`)
     if(!embedding) return 

     const sourceCodeEmbedding = await db.sourceCodeEmbedding.create({
      data:{
        summary : embedding.summary,
        sourceCode: embedding.sourceCode,
        fileName: embedding.filename,
        projectId: projectId
      }
     })

     console.log('embedding about to enter the summaryembeddings into the db', embedding)
     console.log("embedding.embedding",embedding.embedding)
     

     await db.$executeRaw`
     UPDATE "SourceCodeEmbedding"
     SET "summaryEmbedding" = ${JSON.stringify(embedding.embedding)}::vector
     WHERE "id" = ${sourceCodeEmbedding.id}
   `
   
      
  }))



} 


const generateEmbeddings = async(docs : Document[]) =>{
      return await Promise.all(docs.map(async doc => {
        const summary = await summariseCode(doc)
        const embedding = await generateEmbedding(summary)

        return {
          summary,
          embedding,
          sourceCode : JSON.parse(JSON.stringify(doc.pageContent)),
          filename : doc.metadata.source
        }
      }))
}