"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
  } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2Icon, SparkleIcon, SparklesIcon } from 'lucide-react'
import axios from 'axios'
import { v4 } from 'uuid'
import { useRouter } from 'next/navigation'

const RoadmapGeneratorDialog = ({openRoadmapDialog,setOpenRoadmapDialog}:{openRoadmapDialog:boolean, setOpenRoadmapDialog:any}) => {
    const [loading,setLoading] = useState(false)
    const [userInput,setUserInput]=useState<string>('')
    const roadmapId = v4()
    const router = useRouter()
    const GenerateRoadmap = async()=>{
        try{
            setLoading(true)
            const result = await axios.post('/api/ai-roadmap-agent',{
                roadmapId:roadmapId,
                userInput:userInput
            })
            console.log(result.data)

            router.push('/ai-tools/ai-roadmap-agent/'+roadmapId)
            setOpenRoadmapDialog(false)

        }catch(e){
            console.log(e)
        }finally{
            setLoading(false)
            setUserInput('')
        }
    }


  return (
    <div>
        <Dialog open={openRoadmapDialog} onOpenChange={setOpenRoadmapDialog}>
            {/* <DialogTrigger>Open</DialogTrigger> */}
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Enter Position/Skills to Generate Roadmap</DialogTitle>
                <DialogDescription asChild>
                    <Input placeholder='e.g Full Stack Developer' onChange={(e)=>setUserInput(e?.target.value)}/>
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant={'outline'} onClick={()=>{setOpenRoadmapDialog(false); setUserInput('')}}> Cancel</Button>
                <Button disabled = {loading || !userInput} onClick={GenerateRoadmap} >{loading?<Loader2Icon className="animate-spin"/> : <SparklesIcon/>}Generate</Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
  </div>
  )
}

export default RoadmapGeneratorDialog