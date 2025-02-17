'use client'

import { Card } from '@/components/ui/card'
import { uploadFile } from '@/lib/firebase'
import { Presentation } from 'lucide-react'
import React, { useState } from 'react'
import {useDropzone} from 'react-dropzone'

const MeetingCard = () => {

 const [isUploading , setIsUploading] = useState(false)
 const [progress, setProgress] = useState(0)
 const {getRootProps , getInputProps} = useDropzone({
     accept:{
      'audio/*':['.mp3','.wav','.m4a']
     },
     multiple: false,
     maxSize: 50_000_000,
     onDrop: async acceptedFiles => {
      console.log(acceptedFiles)
      setIsUploading(true)
      const file = acceptedFiles[0]
      const downloadURL = await uploadFile(file as File, setProgress)
      setIsUploading(false)
     }
 })

  return (
    <Card className='col-span-2 flex flex-col items-center justify-center' {...getRootProps()}>

      {!isUploading && (
        <>
         <Presentation className='h-10 w-10 animate-pulse'/>

         <h3 className='mt-2 text-sm font-semibold text-gray-900'>
           Create a new meeting
         </h3>
         <p className='mt-1 text-center text-sm text-gray-500'>
           Analyse your meeting with gitelp.
           <br/>
           Powered by AI.          
         </p>
        </>
      )} 

    </Card>
  )
}

export default MeetingCard