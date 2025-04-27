import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ATSResumeProps {
    resumeContent: string;
}

const ATSResumeShowcase: React.FC<ATSResumeProps> = ({ resumeContent }) => {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
        >
            {resumeContent}
        </ReactMarkdown>
    );
};

export default ATSResumeShowcase;