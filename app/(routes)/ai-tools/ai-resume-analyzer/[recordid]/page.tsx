"use client"
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { record } from 'zod'

const AiResumeAnalyzer = () => {
    const {recordId} = useParams()
    const [pdfUrl, setPdfUrl] = useState()
    const [aiReport,setAiReport] = useState()

    useEffect(()=>{
        recordId && GetResumeAnalyzerRecord()
    },[recordId])


    const GetResumeAnalyzerRecord = async()=>{
        const result = await axios.get('/api/history?recordId='+recordId)
        console.log(result.data)
        setAiReport(result.data?.content)
        setPdfUrl(result.data?.metaData)
    }
  return (
    <div>AiResumeAnalyzer</div>
  )
}

export default AiResumeAnalyzer