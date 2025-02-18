'use client'
import useProject from '@/hooks/use-project'
import { api } from '@/trpc/react'
import React from 'react'
import MeetingCard from '../dashboard/meeting-card'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import useRefetch from '@/hooks/use-refetch'

const MeetingPage = () => {
  
  const {projectId} = useProject()
  const refetch = useRefetch()
  const {data:meetings , isLoading} = api.project.getMeetings.useQuery({projectId},{
    refetchInterval:4000
  })

  const deleteMeeting = api.project.deleteMeeting.useMutation()


  return (
  <>
    <MeetingCard/>
    <div className="h-6"></div>
    <h1 className="text-2xl font-semibold">Meetings</h1>
    {meetings && meetings.length === 0 && <div>No meetings found</div>}
     {isLoading && <div>Loading...</div>}
     <ul className='divide-y divide-gray-200'>
      {meetings?.map(meeting => (
        <li key={meeting.id} className='flex items-center justify-between py-5 gap-x-6'>
          <div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Link href={`/meeting/${meeting.id}`} className='text-sm font-semibold'>
                   {meeting.name}
                </Link>
                 {meeting.status === 'PROCESSING' && (
                  <Badge className='bg-yellow-500 text-white'>
                       Processing...
                  </Badge>
                 )}
                 {meeting.status === 'FULFILLED' && (
                  <Badge className='bg-green-700 text-pretty text-white'>
                      Completed
                  </Badge>
                 )}
              </div>
            </div>
            
            <div className="flex items-center text-xs text-gray-500 gap-x-2">
              <p className='whitespace-nowrap'>
                {meeting.createdAt.toLocaleString()}
              </p>
              <p className='truncate'>
                {meeting.issues.length} issues
              </p>
            </div>

          </div>

           <div className="flex items-center flex-none gap-x-4">
             <Link href={`/meetings/${meeting.id}`}  >
             <Button className='hover:bg-green-800'>
             View Meeting
             </Button>
                
             </Link>
             <Button  key={meeting.id} disabled={deleteMeeting.isPending} size='sm' variant='destructive' onClick={()=>deleteMeeting.mutate({meetingId: meeting.id},{
              onSuccess:()=>{
                toast("Meeting deleted Successfully")
                refetch()
              }
             })}>Delete Meeting</Button>
           </div>
        </li>
      ))}
     </ul>
  </>
  )
}

export default MeetingPage