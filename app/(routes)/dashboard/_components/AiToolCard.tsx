"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Router from 'next/router';
import { useRouter } from 'next/navigation';

interface TOOL{
    name:string,
    desc:string,
    icon:string,
    button:string,
    path:string   
}

type AIToolProps={
    tool : TOOL
}
function AiToolCard({tool}:AIToolProps) {

  const id = uuidv4()
  const router = useRouter()

  const onClickButton=async ()=>{
    const result = await axios.post('/api/history',{
      recordId:id,
      content:[]
    })
    console.log(result)
    router.push(tool.path+'/'+id)
  }

  return (
    <div className='p-3 rounded-lg border'>
        <Image src={tool.icon} alt={tool.name} width={40} height={40} />
        <h2 className='font-bold'>{tool.name}</h2>
        <p className='text-gray-400'>{tool.desc}</p>
        <Link href={tool.path+'/'+id}>
        <Button className='w-full mt-3' onClick={onClickButton}>{tool.button}</Button>
        </Link>
    </div>
  )
}

export default AiToolCard