import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import ATSResumeShowcase from './ATSResumeShowcase';

interface ATSResumeBuilderProps {
    parsedPDF: any;
}

export function ATSResumeBuilder({ parsedPDF, setatsResume }: ATSResumeBuilderProps) {
    const [jobDescription, setJobDescription] = useState(`About the job
Sora Union a globally distributed professional services company that specializes in Design, Software Engineering, and QA services. Our experienced talent comes from communities where there is displacement or risk of displacement due to conflict or climate change. We provide services to global companies and start-ups across various industries, including healthcare, financial services, technology, and education.


We are looking for a Senior Full Stack Developer with 5+ years of experience to join our distributed team of creative professionals. Your technical skills, passion for programming, and ability to navigate both front-end and back-end technologies will greatly enhance our team's ability to deliver innovative solutions. We look forward to having you on board!


YOU’LL BE RESPONSIBLE FOR:

Design, develop, and implement front-end interfaces and backend solutions.
Work closely with project managers and other team members to meet project requirements, deadlines, and schedules.
Develop robust, scalable software that can handle high volumes of traffic.
Collaborate in cross-functional teams to define, design, and implement new features.
Participate in code reviews to uphold high-quality code and design standards.
Troubleshoot, debug and enhance existing systems.
Stay abreast of emerging technologies and propose how to utilize them to improve our products.


IDEALLY, YOU’LL HAVE:

Bachelor's degree in Computer Science, Information Systems, or related field.
5+ years of experience as a Full Stack Developer.
Familiarity with both front-end and back-end languages such as Python, HTML/CSS, JavaScript and Typescript.
Strong knowledge of web frameworks like React/Nextjs, Vue.js/Nuxt or Svelte/Svelte Kit and server-side frameworks like Node.js or Nestjs.
WordPress.
Experience with REST, Graphql or TRPC.
Proficiency with databases (SQL and NoSQL).
Experience with cloud services like AWS, Google Cloud, or Azure is a plus.
Excellent problem-solving skills, attention to detail, and ability to work in a collaborative team environment.
Strong verbal and written communication skills.


Sora Union is committed to creating and fostering a diverse team. We encourage people from underrepresented backgrounds and all walks of life to apply. We are committed to providing reasonable accommodations to all applicants throughout the application process.`);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{
        resumeData: any;
        atsResume: string;
        keywordAnalysis: any;
    } | null>(null);
    console.log("🚀 ~ ATSResumeBuilder ~ result:", result)

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/generate-ats-resume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    parsedPDF,
                    jobDescription,
                }),
            });

            const data = await response.json();
            setResult(data);
            setatsResume(data)
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