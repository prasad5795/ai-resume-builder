'use client';

import { useState } from 'react';
import { PDFUpload } from '@/components/PDFUpload';
import { Resume } from '../../types/resume';
import { ATSResumeBuilder } from '@/components/ATSResumeBuilder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ATSResumeShowcase from '@/components/ATSResumeShowcase';
import { Button } from '@/components/ui/button';

export default function ResumeUploadPage() {
    const [resume, setResume] = useState<Resume | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [parsedPDF, setparsedPDF] = useState(null)
    const [fileName, setfileName] = useState<string | null>(null)
    const [atsResume, setatsResume] = useState()

    const handleFileSelect = async (file: File) => {
        if (file) {
            setIsProcessing(true);
            setError(null);

            setfileName(file?.name)

            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('/api/parse-resume', {
                    method: 'POST',
                    body: formData,
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to parse resume');
                }
                const res1 = await response.json()
                setparsedPDF(res1)

            } catch (error) {
                console.error('Error uploading resume:', error);
                setError(error instanceof Error ? error.message : 'Failed to upload resume');
            } finally {
                setIsProcessing(false);
            }
        }
    };

    return (
        <div className="px-4 py-8 max-h-full">
            <div className="w-full mx-auto flex gap-x-4">
                <div
                    className={`
                        ${atsResume ? 'w-1/4' : 'w-1/2 mx-auto'} 
                        transition-all duration-300 ease-in-out 
                        gap-y-2 flex flex-col justify-center
                    `}
                    id="1"
                >
                    <PDFUpload
                        onFileSelect={handleFileSelect}
                        isProcessing={isProcessing}
                        setatsResume={setatsResume}
                    />

                    {error && (
                        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-red-600">{error}</p>
                        </div>
                    )}

                    <ATSResumeBuilder parsedPDF={parsedPDF} setatsResume={setatsResume} />
                </div>

                {atsResume && (
                    <div
                        className='w-3/4 max-h-full transition-all duration-300 ease-in-out flex flex-col items-center'
                        id="2"
                    >
                        <Card className='w-full h-[550px] overflow-auto'>
                            <CardHeader><h2></h2></CardHeader>
                            <CardContent className='overflow-y-auto'>
                                <div className="prose max-w-full max-h-full">
                                    <ATSResumeShowcase resumeContent={atsResume?.atsResume} />
                                </div>
                            </CardContent>
                        </Card>
                        <Button
                            onClick={() => {
                                const blob = new Blob([atsResume?.atsResume], { type: 'text/markdown' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = 'ats-resume.md';
                                a.click();
                            }}
                            className="mt-4"
                        >
                            Download Markdown
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}