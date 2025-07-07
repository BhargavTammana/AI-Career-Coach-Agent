import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
  } from "@/components/ui/dialog"
import { File, FileIcon, Loader2Icon, Sparkles } from "lucide-react"
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react"
import axios from "axios";
import { useRouter } from "next/navigation";

function ResumeUploadDialog({openResumeUpload, setOpenResumeUpload}:{openResumeUpload:boolean, setOpenResumeUpload:any}) {
    
    const [file, setFile] = useState<any>()
    const [loading,setLoading] = useState<boolean>(false)
    const router = useRouter()
    const onFileChange = (e:any)=>{
        const file = e.target.files?.[0]
        if(file){
            setFile(file)
            console.log(file)
        }
    }

    const onUploadAndAnalyze = async()=>{
        setLoading(true)
        const recordId = uuidv4()
        const formData = new FormData()
        formData.append('recordId',recordId)
        formData.append('resumeFile',file)
        

        // send formdata to backend server
        const result = await axios.post('/api/ai-resume-agent',formData)
        console.log(result.data)
        setLoading(false)

        router.push('/ai-tools/ai-resume-analyzer/'+recordId)
        setOpenResumeUpload(false)
    }
  return (
    <div>
        <Dialog open={openResumeUpload} onOpenChange={setOpenResumeUpload}>
            {/* <DialogTrigger>Open</DialogTrigger> */}
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Upload Your Resume</DialogTitle>
                <DialogDescription asChild>
                    <div className="mt-2">
                        <input type="file" className="hidden" id="resume-upload" accept=".pdf" onChange={onFileChange}/>
                        <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-10 hover:bg-slate-100">
                            <File className="h-10 w-10"/>
                            {file ? <h2 className="mt-3 text-blue-600">{file.name}</h2> : <h2 className="mt-3">Click here to upload your pdf file</h2>}

                        </label>
                    </div>
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant={'outline'} onClick={()=>{setOpenResumeUpload(false); setFile('')}}> Cancel</Button>
                <Button disabled = {!file || loading} onClick={onUploadAndAnalyze}>{loading?<Loader2Icon className="animate-spin"/> : <Sparkles/>} Upload and Analyze</Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default ResumeUploadDialog