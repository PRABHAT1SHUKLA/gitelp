'use server'

import { streamText} from 'ai'
import {createStreamableValue} from 'ai/rsc'
import  {createGoogleGenerativeAI} from '@ai-sdk/google'

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY
})

