/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

interface ATSResumeBuilderProps {
    parsedPDF: any;
    setatsResume: any;
}

export function ATSResumeBuilder({ parsedPDF, setatsResume }: ATSResumeBuilderProps) {
    const [jobDescription, setJobDescription] = useState<string>();
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        setatsResume(undefined)
        try {
            const response = await fetch('/api/generate-ats-resume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    parsedPDF: parsedPDF?.parsedData,
                    jobDescription,
                }),
            });

            const reader = response.body?.getReader()
            if (!reader) return

            const decoder = new TextDecoder('utf-8')

            while (true) {
                const { done, value } = await reader.read()
                if (done) break

                // Update answer incrementally
                const chunk = decoder.decode(value)
                setatsResume((prev: string) => {
                    if (chunk) {
                        if (prev) {
                            prev += chunk
                            return prev;
                        }
                        else {
                            return chunk;
                        }
                    }
                })

            }

        } catch (error) {
            console.error('Error generating ATS resume:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder="Paste the job description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        rows={10}
                    />
                    <Button
                        onClick={handleGenerate}
                        disabled={loading || !jobDescription}
                        className="mt-4"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            'Generate ATS Resume'
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div >
    );
}