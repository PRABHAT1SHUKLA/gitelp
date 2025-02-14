'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import useProject from '@/hooks/use-project'
import Image from 'next/image'
import React, { useState } from 'react'

const AskQuestionCArd = () => {
  const { project } = useProject()
  const [question, setQuestion] = useState('')
  const [open, setOpen] = useState(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setOpen(true)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}
      >

        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <Image src='/logo.jpg' alt="gitelp" width={40} height={40} />
            </DialogTitle>
          </DialogHeader>

        </DialogContent>

      </Dialog>
      <Card className='relative col-span-3'>
        <CardHeader>
          <CardTitle>Ask a Question</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <Textarea placeholder='Which file should i edit to change the layout of dashboard?' value={question} onChange={e => setQuestion(e.target.value)} />

            <div className="h-4"></div>

            <Button type='submit'>
              Ask Gitelp
            </Button>


          </form>
        </CardContent>
      </Card>

    </>
  )
}

export default AskQuestionCArd