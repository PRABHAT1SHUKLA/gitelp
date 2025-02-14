"use client"

import useProject from "@/hooks/use-project"
import { useUser } from "@clerk/nextjs"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import CommitLog from "./commit-log"
import AskQuestionCArd from "./ask-question-card"


const DashboardPage = () => {

  const { project } = useProject()

  return (
    
    <div>
      {project?.id}
      <div className="flex items-center justify-between flex-wrap gap-y-4">

        {/* github link */}
        <div className="w-fit rounded-md bg-gray-950 px-4 py-3">
          <div className="flex items-center">
            <Github className="size-5 text-white " />
            <div className="ml-2">
              <p className="text-sm font-medium text-white">

                This project is linked to {' '}
                <Link href={project?.githubUrl ?? ""} className="inline-flex items-center text-white/80 hover:underline">
                  {project?.githubUrl}
                  <ExternalLink className="ml-1 size-4" />
                </Link>

              </p>

            </div>

          </div>

        </div>

        <div className="h-4 "></div>

        <div className="flex items-center gap-4">
          TeamMembers
          inviteButton
          ArchiveButon
        </div>


      </div>

      <div className="mt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
               <AskQuestionCArd/>
               MeetingCard
          </div>
      </div>

       <div className="mt-8"></div>
       <CommitLog/>
    </div>
  )
}

export default DashboardPage