import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
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
  return (
    <div className='p-3 rounded-lg border'>
        <Image src={tool.icon} alt={tool.name} width={40} height={40} />
        <h2 className='font-bold'>{tool.name}</h2>
        <p className='text-gray-400'>{tool.desc}</p>
        <Link href={tool.path}>
        <Button className='w-full mt-3'>{tool.button}</Button>
        </Link>
    </div>
  )
}

export default AiToolCard