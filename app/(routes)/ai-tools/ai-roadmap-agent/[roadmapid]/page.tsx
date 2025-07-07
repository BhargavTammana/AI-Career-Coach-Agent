"use client"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import RoadmapCanvas from '../_components/RoadmapCanvas'
import RoadmapGeneratorDialog from '@/app/(routes)/dashboard/_components/RoadmapGeneratorDialog'

const RoadMapGeneratorAgent = () => {

    const {roadmapid} = useParams()
    const [roadMapDetails, setRoadMapDetails] = useState<any>()
    const [openRoadmapDialog,setOpenRoadmapDialog] = useState(false);
    useEffect(()=>{
        roadmapid && GetRoadmapDetails()
    },[roadmapid])

    const GetRoadmapDetails = async () =>{
        const result = await axios.get('/api/history?recordId='+roadmapid)
        setRoadMapDetails(result.data?.content)
        console.log(result.data)
    }
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        <div className="border rounded-xl p-5">
            <h2 className='font-bold text-2xl'>{roadMapDetails?.roadmapTitle}</h2>
            <p className='mt-3 text-gray-500'><strong>Description:</strong> <br/>{roadMapDetails?.description}</p>
            <h2 className='mt-5 text-blue-600 font-medium'>Duration : {roadMapDetails?.duration}</h2>
            <Button className='mt-5 w-full ' onClick={()=>setOpenRoadmapDialog(true)}> Create Another Roadmap</Button>
        </div>
        <div className="md:col-span-2 w-full h-[80vh]">
             <RoadmapCanvas initialEdges={roadMapDetails?.initialEdges} initialNodes={roadMapDetails?.initialNodes}/>
        </div>
        <RoadmapGeneratorDialog openRoadmapDialog={openRoadmapDialog} setOpenRoadmapDialog ={setOpenRoadmapDialog}/>
    </div>
  )
}

export default RoadMapGeneratorAgent