"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoaderCircle, Send } from 'lucide-react'
import React, { useEffect } from 'react'
import EmptyState from '../_components/EmptyState'
import { useState } from 'react'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import { useParams, useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';

type messages = {
    content:string,
    role:string,
    type:string
}
function AiChat() {
    const [userInput, setUserInput] = useState<string>("")
    const [loading, setLoading] = useState(false)
    const [messageList, setMessageList] = useState<messages[]>([])
    const {chatid} = useParams()
    const router = useRouter()

    useEffect(()=>{
        chatid && GetMessageList()
    },[chatid])

    const GetMessageList=async()=>{
        const result = await axios.get('/api/history?recordId='+chatid)
        console.log(result.data)
        setMessageList(result.data.content)
    }   

    const onSend = async()=>{
        setLoading(true)
        setUserInput('')
        setMessageList(prev=>[...prev,{
            content:userInput || "",
            role:'user',
            type:'text'
        }])
        const result = await axios.post('/api/ai-career-chat-agent',{
            userInput:userInput
        })
        console.log(result.data)
        setMessageList(prev=>[...prev,result.data])
        setLoading(false)
    }

    // console.log(messageList)

    useEffect(()=>{
        //Save messageList to Database
        messageList.length>0 && updateMessageList()

    },[messageList])

    const updateMessageList=()=>{
        const result = axios.put('/api/history',{
            content:messageList,
            recordId:chatid
        })

        console.log(result)
    }

    const onNewChat=async ()=>{
        const id = uuidv4()
        const result = await axios.post('/api/history',{
          recordId:id,
          content:[]
        })
        console.log(result)
        router.replace('/ai-tools/ai-chat'+'/'+id)
      }

  return (
    <div className='px-10 md:px-24 lg:px-36 xl:px-48 h-[75vh] overflow-auto'>
      {/* Header */}
        <div className="w-full flex justify-between items-center gap-8">
            <div>
                <h1 className="font-bold text-lg">AI Career Q/A Chat</h1>
                <p className="text-gray-500 text-sm mt-1">
                    Smarter career decisions start here — get tailored advice, real-time insights.
                </p>
            </div>
            <Button onClick={onNewChat}>+ New Chat</Button>
        </div>

        <div className='flex flex-col h-[75vh]'>
            <div className="mt-6">
                {/* Empty State */}
                {messageList.length<=0 && 
                <EmptyState selectedQuestion={(question:string)=>setUserInput(question)}/>
                }
            </div>
    
            <div className="flex-1">
                {/* Message List */}
                {
                    messageList?.map((message,index)=>(
                        <div key={index}>
                            <div className={`flex mb-2 ${message.role=='user'?'justify-end':'justify-start'}`}>
                                <div className={`flex flex-col p-3 rounded-lg gap-2 ${message.role=='user'?'bg-gray-300 text-black ':'bg-gray-100 text-black'}`}>
                                    <ReactMarkdown>
                                        {message.content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                            {loading && messageList?.length-1==index && <div className="flex justify-start p-3 rounded-lg gap-2 bg-gray-100 text-black mb-2">
                                <LoaderCircle className='animate-spin'/>Thinking...
                            </div>}
                        </div>
                    ))
                }
            </div>

            <div className="flex justify-between items-center gap-6 absolute bottom-5 w-[50%]">
                {/* Input Field */}
                <Input placeholder='Type here' value={userInput} onChange={(event)=>{setUserInput(event.target.value)}}/>
                <Button onClick={onSend} disabled={loading}><Send/></Button>
            </div>
        </div> 

    </div>
  )
}

export default AiChat