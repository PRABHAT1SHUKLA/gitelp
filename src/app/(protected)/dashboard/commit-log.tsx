'use client'

import useProject from '@/hooks/use-project'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'
import React from 'react'

const CommitLog = () => {
   
  const {projectId} = useProject()

  const {data : commits} = api.project.getCommits.useQuery({projectId})
  console.log(commits)
  return (
    <>
      <ul className='space-y-6'>
         {commits?.map((commit, commitIdx) => {
          return <li key={commit.id} className='relative flex gap-x-4'>
            <div className={cn(
              commitIdx === commits.length-1 ? 'h-6' : '-bottom-6',
              'absolute left-0 top-0 flex w-6 justify-center'
            )}>
              <div className='w-px translate-x-1 bg-gray-200'></div>
            </div>

            <>
          

              <img src={commit.commitAuthorAvatar} alt='commit avatar' className='relative mt-4 size-8 flex-none rounded-full b-gray-50'/>
            </>
          </li>
         })}

      </ul>
    </>
  )
}

export default CommitLog