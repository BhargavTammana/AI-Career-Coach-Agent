"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState } from 'react'
function PreviousHistory() {
    const [history, setHistory] = useState([]);
  return (
    <div className='border bg-white rounded-xl mt-5 p-5'>
        <h2 className='font-bold text-lg'>Previous History</h2>
        <p className='text-gray-400'>What you previously work on, You can find here</p>
        {
            history.length==0 &&
                <div className='flex items-center justify-center mt-4 flex-col'>
                    <Image src='/idea.png' width={50} height={50} alt='History'></Image>
                    <h2 className='mt-5'>You do not have history</h2>
                    <Button className='mt-3'>Get Started</Button>
                </div>
            
        }

    </div>
  )
}

export default PreviousHistory