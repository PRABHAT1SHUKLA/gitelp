'use client'
import useProject from '@/hooks/use-project'
import { api } from '@/trpc/react'
import React from 'react'
import MeetingCard from '../dashboard/meeting-card'

const MeetingPage = () => {
  
  const {projectId} = useProject()
  const {data:meetings} = api.project.getMeetings.useQuery({projectId},{
    refetchInterval:4000
  })


  return (
  <>
    <MeetingCard/>
    <div className="h-6"></div>
    <h1 className="text-2xl font-bold">Meetings</h1>
  </>
  )
}

export default MeetingPage