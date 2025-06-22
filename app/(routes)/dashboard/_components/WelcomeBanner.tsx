import { Button } from '@/components/ui/button'
import React from 'react'

function WelcomeBanner() {
  return (
    <div className='p-5 bg-gradient-to-tr from-[#BE575F] via-[#A338E3] to-[#AC76D6] rounded-xl'>
        <h2 className='text-2xl font-bold text-white'>AI Career Coach Agent</h2>
        <p className='text-sm mt-2 text-white'>
            Smarter career decisions start here - get tailored advice, real time market insights, and a roadmap for you with the power of AI.
        </p>
        <Button className='mt-5' variant={'outline'}>Let's Get Started</Button>
    </div>
  )
}

export default WelcomeBanner