import { db } from "@/server/db"
import { Octokit} from "octokit"


export const octokit =  new Octokit({
  auth: process.env.GITHUB_TOKEN
})

const githubUrl = 'https://github.com/facebook/react'

type Response = {
  commitMessage  :      string
  commitHash    :       string
  commitAuthorName   :  string
  commitAuthorAvatar  : string
  commitDate   :        string
}

export const getCommitHashes = async (githubUrl : string) : Promise<Response[]>=>{
           
   const {data} = await octokit.rest.repos.listCommits({
    owner: "facebook",
    repo: 'react'
   })

   const sortedCommits = data.sort((a:any , b:any) => new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime() ) as any[]

   return sortedCommits.slice(0,10).map((commit:any) =>({
           commitHash : commit.sha as string,
           commitMessage : commit.commit.message ?? "",
           commitAuthorName : commit.commit?.author?.name ?? "",
           commitAuthorAvatar : commit.commit?.author?.avatar_url ?? "",
           commitDate : commit.commit?.author?.date ?? ""
   }))

   
}




async function fetchProjectGithubUrl(projectId : string){
  const project = await db.project.findUnique({
    where:{
      id: projectId
    },
    select:{
      githubUrl:true
    }
  })

  if(!project?.githubUrl){
        throw new Error("No Github url present")
  }


  return { project , githubUrl: project?.githubUrl}
}

//to run any .ts  file inpendently  use tsx

async function filterUnprocessedCommits(projectId:string , commitHashes : Response[]){
    
   const  processedCommits = await db.commit.findMany({
    where:{ projectId}
   })

   const unprocessedCommits = commitHashes.filter((commit) => !processedCommits.some((processedCommit) => processedCommit.commitHash === commit.commitHash ))

   return unprocessedCommits
}