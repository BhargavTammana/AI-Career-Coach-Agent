"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState } from 'react'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Router from 'next/router';
import { useRouter } from 'next/navigation';
import ResumeUploadDialog from './ResumeUploadDialog'
import RoadmapGeneratorDialog from './RoadmapGeneratorDialog'

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
  const [openResumeUpload, setOpenResumeUpload] = useState(false)
  const [openRoadmapDialog,setOpenRoadmapDialog] = useState(false);
  const onClickButton=async ()=>{

    if(tool.name == 'AI Resume Analyzer'){
      setOpenResumeUpload(true)
      return ;
    }

    if(tool.path =='/ai-tools/ai-roadmap-agent'){
      setOpenRoadmapDialog(true);
      return ;
    }
    const result = await axios.post('/api/history',{
      recordId:id,
      content:[],
      aiAgentType:tool.path
    })
    console.log(result)
    router.push(tool.path+'/'+id)
  }

  return (
    <div className='p-3 rounded-lg border'>
        <Image src={tool.icon} alt={tool.name} width={40} height={40} />
        <h2 className='font-bold'>{tool.name}</h2>
        <p className='text-gray-400'>{tool.desc}</p>
        <Button className='w-full mt-3' onClick={onClickButton}>{tool.button}</Button>
        <ResumeUploadDialog openResumeUpload={openResumeUpload} setOpenResumeUpload={setOpenResumeUpload}/>
        <RoadmapGeneratorDialog openRoadmapDialog={openRoadmapDialog} setOpenRoadmapDialog ={setOpenRoadmapDialog}/>
    </div>
  )
}

export default AiToolCard