import { db } from "@/server/db"
import { Octokit} from "octokit"
import axios from "axios"
import { aiSummariseCommit } from "./gemini"


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

  const [owner, repo] = githubUrl.split('/').slice(-2)
  if(!owner || !repo){
    throw new Error("Invalid github url")
  }
           
   const {data} = await octokit.rest.repos.listCommits({
    owner,
    repo
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


export const pollCommits =  async(projectId : string) =>{
  const {project , githubUrl} = await fetchProjectGithubUrl(projectId)
  const commitHashes = await getCommitHashes(githubUrl)
  const unprocessedCommits  = await filterUnprocessedCommits(projectId,commitHashes)
  console.log(unprocessedCommits)
  return unprocessedCommits
}


async function summariseCommit(githubUrl:string , commitHash: string){
  //get the commit difference , then pass it into ai
   
  const {data} = await axios.get(`${githubUrl}/commit/${commitHash}.diff`,{
    headers:{
      Accept : 'application/vnd.github.v3.diff'
    }
  })
 return await aiSummariseCommit(data) || ""
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

await(pollCommits('cm70k7lq80000objuanhciuyr')).then(console.log)