'use client'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import useProject from '@/hooks/use-project'
import { api } from '@/trpc/react'
import React, { useState } from 'react'
import AskQuestionCArd from '../dashboard/ask-question-card'

const QaPage = () => {
  
  const {projectId} = useProject()

  const {data : questions} = api.project.getQuestions.useQuery({projectId})

  const [questionIndex , setQuestionIndex] = useState(0)

  const question = questions?.[questionIndex]

  return (
   <Sheet>
      <AskQuestionCArd/>
       <div className="h-4"></div>
       <div className="text-xl font-semibold">Saved Questions</div>
       <div className="h-2"></div>
       <div className="flex flex-col gap-2">
        {questions?.map((question , index) =>{
          return <React.Fragment key={question.id}>
            <SheetTrigger onClick={()=>{setQuestionIndex(index)}}>
                 <div className="flex items-center gap-4 bg-white rounded-lg p-4 shadow border">
                  <img className='rounded-full' height={30} width={30} src={question.user.imageUrl}/>
                 </div>
            </SheetTrigger>
          </React.Fragment>
        })}
       </div>
   </Sheet>
  )
}

export default QaPage