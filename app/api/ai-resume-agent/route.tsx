import { NextRequest, NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { inngest } from "@/inngest/client";
import axios from "axios";
import { currentUser } from "@clerk/nextjs/server";
export async function POST(req:NextRequest ){
    const FormData = await req.formData()
    const recordId = FormData.get('recordId')
    const resumeFile:any = FormData.get('resumeFile')

    const loader = new WebPDFLoader(resumeFile)
    const docs = await loader.load()
    console.log(docs[0].pageContent)
    const user = await currentUser()

    const arrayBuffer = await resumeFile.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')

    const resultIds = await inngest.send({
        name : 'AiResumeAgent',
        data:{
            recordId:recordId,
            base64resumeFile : base64,
            pdfText : docs[0]?.pageContent,
            aiAgentType:'/ai-tools/ai-resume-analyzer',
            userEmail: user?.primaryEmailAddress?.emailAddress
        }
    });
    const runId = resultIds?.ids[0]
    
    let runStatus;
    while(true){
        runStatus = await getRuns(runId);
        if(runStatus?.data[0]?.status==='Completed'){
            break;
        }

        await new Promise(resolve=>setTimeout(resolve,500))
    }
    return NextResponse.json(runStatus.data[0].output)
} 
    
 async function getRuns(runId: string) {
    const host = process.env.INNGEST_SERVER_HOST;
    if (!host) throw new Error("INNGEST_SERVER_HOST is not defined");

    const url = `${host}/v1/events/${runId}/runs`;
    const result = await axios.get(url, {
        headers: {
        Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`
        }
    });
    return result.data;
}