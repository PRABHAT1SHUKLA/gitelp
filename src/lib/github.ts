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



//to run any .ts  file inpendently  use tsx