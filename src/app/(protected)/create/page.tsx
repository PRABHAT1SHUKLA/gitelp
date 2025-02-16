"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useRefetch from '@/hooks/use-refetch'
import { api } from '@/trpc/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type FormInput = {
  repoUrl: string
  projectName: string
  githubToken?: string
}

const CreatePage = () => {

  const { register, handleSubmit, reset } = useForm<FormInput>()

  const createProject = api.project.createProject.useMutation()

  const refetch = useRefetch()

  async function onSubmit(data: FormInput) {
    try {
      await createProject.mutateAsync({
        githubUrl: data.repoUrl,
        name: data.projectName,
        githubToken: data.githubToken,
      });

      toast.success("Project created Successfully");
      await refetch();
      reset();
    } catch (error) {
      toast.error("Error creating project");
    }
  }
  return (
    <div className='flex items-center gap-12 h-full justify-center'>
      <img src='/git.svg' className='h-56 w-auto' />
      <div>
        <div>
          <h1 className='font-semibold text-2xl'>
            Link your github repository

          </h1>

          <p className='text-muted-foreground text-sm'>
            Enter the URL to your Repo to link it to Gitelp
          </p>

        </div>

        <div className='h-4'></div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>

            <Input
              {...register('projectName', { required: true })}
              placeholder="Project Name"
              required
            />

            <div className='h-2'></div>
            <Input
              {...register('repoUrl', { required: true })}
              placeholder="Github Url"
              type='url'
              required
            />

            <div className='h-2'></div>
            <Input
              {...register('githubToken')}
              placeholder="Github Token (optional)"
          
            />

            <div className='h-4'></div>
           
           <Button type="submit" disabled={createProject.isPending}>
             Create Project
           </Button>

          </form>
        </div>
      </div>

    </div>
  )
}

export default CreatePage