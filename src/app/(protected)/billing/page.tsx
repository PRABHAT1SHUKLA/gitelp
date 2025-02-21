'use client'

import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { createCheckoutSession } from '@/lib/stripe'
import { api } from '@/trpc/react'
import { Info } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

const BillingPage = () => {
  const searchParams = useSearchParams()
  const paymentSuccess = searchParams.get('payment_success')
  
  // Get query client to enable manual refetching
  const { data: user, refetch } = api.project.getMyCredits.useQuery()
  const [creditsToBuy, setCreditsToBuy] = useState<number[]>([100])

  // Refetch when component mounts or when redirected back from successful payment
  useEffect(() => {
    refetch()
  }, [paymentSuccess, refetch])

  const creditsToBuyAmount = creditsToBuy[0]!
  const price = (creditsToBuyAmount/50).toFixed(2)

  return (
    <div>
      <h1 className='text-xl font-semibold'>
          Billing
      </h1>

      {paymentSuccess && (
        <div className="bg-green-50 px-4 py-2 my-2 rounded-md border border-green-200 text-green-700">
          Payment successful! Your credits have been updated.
        </div>
      )}

      <div className="h-2"></div>
      <p className='text-sm text-gray-500'>
        You currently have {user?.credits} credits.
      </p>

      <div className="h-2"></div>

      <div className="bg-blue-50 px-4 py-2 rounded-md border border-blue-200 text-blue-700">
        <div className="flex items-center gap-2">
          <Info className="size-4"/>

          <p className='text-sm'>Each credit allows to index 1 file in repository.</p>
        </div>
        <p className='text-sm'>E.g. if u have 10 files in your project, u will require 10 credits to index it.</p>
      </div>
      <div className="h-4"></div>
      <Slider defaultValue={[100]} max={1000} min={10} step={10} onValueChange={(value)=>{setCreditsToBuy(value)}} value={creditsToBuy}/>
        <div className="h-4"></div>
        <Button onClick={()=>{
          createCheckoutSession(creditsToBuyAmount)
        }}>
          Buy {creditsToBuyAmount} credits for ${price}
        </Button>
    </div>
  )
}

export default BillingPage