import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ATSResumeProps {
    resumeContent: string;
}

const ATSResumeShowcase: React.FC<ATSResumeProps> = ({ resumeContent }) => {
    console.log("🚀 ~ resumeContent:", resumeContent)
    return (
        // <div className="prose w-full p-6 bg-white shadow-lg rounded-lg">
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
        >
            {resumeContent}
        </ReactMarkdown>
        // </div>
    );
};

export default ATSResumeShowcase;