'use server'

import { streamText } from 'ai'
import { createStreamableValue } from 'ai/rsc'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { generateEmbedding } from '@/lib/gemini'
import { db } from '@/server/db'

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY
})

export async function askQuestion(question: string, projectId: string) {

  const stream = createStreamableValue()

  const queryVector = await generateEmbedding(question)

  console.log("queryvector", queryVector)
  const vectorQuery = `[${queryVector.join(',')}]`
  console.log("vectorquery", vectorQuery)
  console.log("projectId of file ", projectId)

  const result = await db.$queryRaw`
    SELECT "fileName","sourceCode", "summary",
    1-("summaryEmbedding" <=> ${vectorQuery}::vector) AS similarity
    FROM "SourceCodeEmbedding"
    WHERE 1-("summaryEmbedding" <=> ${vectorQuery}::vector) > .5
    AND "projectId" = ${projectId}
    ORDER BY similarity DESC
       LIMIT 10
    ` as { fileName: string; sourceCode: string; summary: string }[]

  let context = ''

  console.log("result added",result)

  for (const doc of result) {
    context += `source: ${doc.fileName}\ncode content: ${doc.sourceCode}\n summary of file: ${doc.summary}\n\n`
  }

   console.log("context added or not",context);

  (async () => {
    const { textStream } = await streamText({
      model: google('gemini-1.5-flash'),
      prompt: `
      You are a ai code assistant who answers questions about the codebase. Your target audience is a technical intern who has very little technical knowledge.

      AI assistant is a brand new, powerful, human-like artificial intelligence.

      The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.

      Al is a well-behaved and well-mannered individual.

      Al is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user. 
      AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in the provided context.

     If the question is asking about code or a specific file, AI will provide the detailed answer, giving step by step instructions.

     START CONTEXT BLOCK
     ${context}
     END OF CONTEXT BLOCK

     START QUESTION
     ${question}
     END OF QUESTION

     AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.

     

     AI assistant will not apologize for previous responses, but instead will indicated new information was gained.

     AI assistant will not invent anything that is not drawn directly from the context.

     Answer in markdown syntax, with code snippets if needed. Be as detailed as possible when answering.Make sure to keep the error to minimum.

     AI assistant will try to answer all the relevant questions .
`
    })
      for await (const delta of textStream){
        stream.update(delta)
      }

      stream.done()
    })()
     
  return{
    output : stream.value,
    filesReferences: result
  }

}