"use client"
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ChevronDown, ChevronRight, CheckCircle, AlertCircle, Star, TrendingUp, User, Briefcase, GraduationCap, Code, Lightbulb, ThumbsUp, AlertTriangle, LucideIcon, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Report from '../_components/Report'
import ResumeUploadDialog from '@/app/(routes)/dashboard/_components/ResumeUploadDialog'

interface SectionData {
    score: number
    comment?: string
    tips_for_improvement?: string[]
    whats_good?: string[]
    needs_improvement?: string[]
}

interface AiReport {
    overall_score: number
    overall_feedback: string
    summary_comment?: string
    sections?: {
        contact_info?: SectionData
        experience?: SectionData
        education?: SectionData
        skills?: SectionData
    }
    tips_for_improvement?: string[]
    whats_good?: string[]
    needs_improvement?: string[]
}

interface SectionCardProps {
    title: string
    icon: LucideIcon
    score: number
    comment?: string
    tips?: string[]
    whatsGood?: string[]
    needsImprovement?: string[]
}

const AiResumeAnalyzer = () => {
    const {recordid} = useParams()
    const [pdfUrl, setPdfUrl] = useState<string>()
    const [aiReport, setAiReport] = useState<any>()
    const [loading, setLoading] = useState(false)
    const [openResumeUpload, setOpenResumeUpload] = useState(false)
    useEffect(() => {
        recordid && GetResumeAnalyzerRecord()
    }, [recordid])

    const GetResumeAnalyzerRecord = async () => {
        setLoading(true)
        const result = await axios.get('/api/history?recordId=' + recordid)
        setAiReport(result.data?.content)
        setPdfUrl(result.data?.metaData)
        setLoading(false)
    }
    
    const onClickButton=async ()=>{
          setOpenResumeUpload(true)
          return ;
    }
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                {/* LEFT SIDE – AI Analysis Panel */}
                <div className="lg:col-span-2 bg-white overflow-y-auto h-screen scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <Report aiReport={aiReport} loading={loading} onReanalyze={onClickButton} />
                    <ResumeUploadDialog openResumeUpload={openResumeUpload} setOpenResumeUpload={setOpenResumeUpload}/>
                </div>
                {/* RIGHT SIDE – Resume Preview */}
                <div className="lg:col-span-3 bg-gray-50">
                    <div className="p-4 md:p-8">
                        <div className="rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col transition-all hover:shadow-2xl hover:border-primary bg-white">
                            <h2 className='font-bold text-2xl mb-5 text-gray-900'>Resume Preview</h2>
                            <div className="overflow-auto">
                            {pdfUrl ? (
                                <iframe 
                                    src={pdfUrl + '#toolbar=0&navpanes=0&scrollbar=0'} 
                                    width={'100%'} 
                                    height={600} 
                                    className='min-w-full rounded-lg border border-gray-200' 
                                    style={{ border: 'none', minHeight: 400, maxHeight: 1200 }}
                                />
                            ) : (
                                <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400 mx-auto mb-4"></div>
                                        <p className="text-gray-500">Loading resume preview...</p>
                                    </div>
                                </div>
                            )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AiResumeAnalyzer