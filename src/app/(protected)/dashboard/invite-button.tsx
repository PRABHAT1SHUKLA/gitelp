
'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import useProject from '@/hooks/use-project'
import React, { useState } from 'react'
import { toast } from 'sonner'

const InviteButton = () => {
  
  const {projectId} = useProject()
  const [open , setOpen] = useState(false)
 
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Invite Team to collaborate on this project.
            </DialogTitle>
          </DialogHeader>

          <p className='text-sm text-gray-500'>
            Ask them to copy and paste this link
          </p>

          <Input 
            className='mt-4'
            readOnly
            onClick={()=>{
              if (typeof window !== "undefined") {
                navigator.clipboard.writeText(`${window.location.origin}/join/${projectId}`)
                toast.success("Copied to clipboard")
              }

            }}
            value={typeof window !== "undefined" ? `${window.location.origin}/join/${projectId}` : ""}
            />
         
        </DialogContent>
      </Dialog>

      <Button size='sm' onClick={()=>setOpen(true)}> Invite Members</Button>
    </>
  )
}

export default InviteButton