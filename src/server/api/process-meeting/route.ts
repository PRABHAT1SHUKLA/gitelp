import { processMeeting } from "@/lib/assembly";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


const bodyParser = z.object({
  meetingUrl : z.string(),
  projectId : z.string(),
  meetingId : z.string()
})

export async function POST(req: NextRequest){
  
  const {userId} = await auth();
  
  if(!userId){
    return NextResponse.json({error:'unuthorized'}, { status:401})
  }

  try{
    const body = await req.json()
    const {meetingUrl , projectId , meetingId} = bodyParser.parse(body)
    const {summaries} = await processMeeting(meetingUrl)
    await db.issue.createMany({
         data: summaries.map(summary =>({
          start : summary.start,
          end: summary.end,
          gist: summary.gist,
          headline:summary.headline,
          summary: summary.summary,
          meetingId: meetingId,
          projectId: projectId
         }))
    })

    return NextResponse.json({success:true},{status:200})
  }catch(error){
       return NextResponse.json({error:'Internal Server Error'} ,{status :500})
  }


}