'use client'

import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { uploadFile } from '@/lib/cloudinary'
import { Presentation, Upload } from 'lucide-react'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import 'react-circular-progressbar/dist/styles.css'

const MeetingCard = () => {
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a']
    },
    multiple: false,
    maxSize: 50_000_000,
    onDrop: async (acceptedFiles) => {
      try {
        if (acceptedFiles.length === 0) return

        setIsUploading(true)
        setProgress(0)
        
        const file = acceptedFiles[0]
        console.log("Uploading file:", file?.name)
        
        // Simulate progress since we can't track it with fetch
        const progressInterval = setInterval(() => {
          setProgress(prev => Math.min(prev + 10, 90))
        }, 500)
        
        const downloadURL = await uploadFile(file!)
        
        clearInterval(progressInterval)
        setProgress(100)
        
        console.log("Upload completed:", downloadURL)
        window.alert(`File uploaded successfully! ${downloadURL}`)
      } catch (error) {
        console.error("Upload failed:", error)
        window.alert("Failed to upload file. Please try again.")
      } finally {
        setIsUploading(false)
      }
    }
  })

  return (
    <Card 
      className="col-span-2 flex flex-col items-center justify-center p-10" 
      {...getRootProps()}
    >
      {!isUploading && (
        <>
          <Presentation className="h-10 w-10 animate-pulse" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">
            Create a new meeting
          </h3>
          <p className="mt-1 text-center text-sm text-gray-500">
            Analyse your meeting with gitelp.
            <br />
            Powered by AI.
          </p>
          <div className="mt-6">
            <Button disabled={isUploading}>
              <Upload className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              Upload Meeting
              <input className="hidden" {...getInputProps()} />
            </Button>
          </div>
        </>
      )}

      {isUploading && (
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-20">
            <CircularProgressbar
              value={progress}
              text={`${Math.round(progress)}%`}
              className='size-20'
              styles={buildStyles({
                pathColor: '#000',
                textColor:'#000'
              })}
            />
          </div>
          <p className="text-sm text-gray-500 text-center">
            Uploading your meeting...
          </p>
        </div>
      )}
    </Card>
  )
}

export default MeetingCard