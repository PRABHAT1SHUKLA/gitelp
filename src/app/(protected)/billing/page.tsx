'use client'

import { api } from '@/trpc/react'
import React, { useState } from 'react'

const BillingPage = () => {
  
  const {data:credits} = api.project.getMyCredits.useQuery()
  const [creditsToBuy , setCreditsToBuy] = useState<number[]>([100])

  const creditsToBuyAmount = creditsToBuy[0]!
  

  return (
    <div>BillingPage</div>
  )
}

export default BillingPage