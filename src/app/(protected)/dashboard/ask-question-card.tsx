'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import useProject from '@/hooks/use-project'
import React, { useState } from 'react'

const AskQuestionCArd = () => {
  const {project} = useProject()
  const [question , setQuestion] = useState('')
 
  const onSubmit = async(e: React.FormEvent<HTMLFormElement>) =>{
       e.preventDefault()
       window.alert(question)
  }

  return (
    <>
      <Card className='relative col-span-3'>
         <CardHeader>
          <CardTitle>Ask a Question</CardTitle>
         </CardHeader>
         <CardContent>
          <form onSubmit={onSubmit}>
            <Textarea placeholder='Which file should i edit to change the layout of dashboard?' value={question} onChange={e => setQuestion(e.target.value)}/>

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