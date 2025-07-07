"use client"
import { Button } from '@/components/ui/button';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { aiToolsList } from './AiToolsList';
import Link from 'next/link';
import { Skeleton } from "@/components/ui/skeleton"
function PreviousHistory() {
    const [userHistory, setUserHistory] = useState<any>([]);
    const [loading,setLoading]= useState(false);

    useEffect(()=>{
      GetHistory()
    },[])

    const GetHistory = async()=>{
      setLoading(true)
      const result = await axios.get('/api/history');
      setUserHistory(result.data)
      console.log(result.data)
      setLoading(false)
    }

    const GetAgentName = (path:string)=>{
      const result = aiToolsList.find(item=>item.path == path)

      return result
    }
  return (
    <div className='border bg-white rounded-xl mt-5 p-5'>
        <h2 className='font-bold text-lg'>Previous History</h2>
        <p className='text-gray-400'>What you previously work on, You can find here</p>


        {
          loading && 
          <div>
            {[1,2,3,4,5].map((item,index)=>(
              <div>
                <Skeleton className="h-[50px] w-full rounded-md mt-4" />
              </div>
            ))}
          </div>
        }
        {
            userHistory.length==0 && !loading ?
                <div className='flex items-center justify-center mt-4 flex-col'>
                    <Image src='/idea.png' width={50} height={50} alt='History'></Image>
                    <h2 className='mt-5'>You do not have history</h2>
                    <Button className='mt-3'>Get Started</Button>
                </div>:
                <div>
                {
                  userHistory?.map((history:any,index:any)=>(
                    <Link key={index} href={history?.aiAgentType+'/'+history?.recordId} className="flex justify-between items-center my-3 border p-3 rounded-lg">
                      <div key={index} className='flex gap-5'>
                        {/* @ts-ignore */}
                        <Image src={GetAgentName(history?.aiAgentType)?.icon} alt='image' height={20} width={20}></Image>
                        <h2>{GetAgentName(history?.aiAgentType)?.name}</h2>
                      </div>
                      <p>{history.createdAt}</p>
                    </Link>
                  ))
                }
                </div>
            
        }

    </div>
  )
}

export default PreviousHistory