// hooks/usePDFParser.ts
import { Resume } from '@/app/types/resume';
import { useState } from 'react';

interface PDFParserState {
    resume: Resume | null;
    isLoading: boolean;
    error: string | null;
    progress: number;
}

export function usePDFParser() {
    const [state, setState] = useState<PDFParserState>({
        resume: null,
        isLoading: false,
        error: null,
        progress: 0,
    });

    const parseResume = async (file: File) => {
        setState(prev => ({ ...prev, isLoading: true, error: null, progress: 0 }));

        try {
            // Update progress: file reading
            setState(prev => ({ ...prev, progress: 20 }));

            const formData = new FormData();
            formData.append('file', file);

            // Update progress: sending to server
            setState(prev => ({ ...prev, progress: 40 }));

            const response = await fetch('/api/parse-resume', {
                method: 'POST',
                body: formData,
            });

            // Update progress: processing response
            setState(prev => ({ ...prev, progress: 70 }));

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to parse resume');
            }

            const parsedResume = await response.json();

            // Update progress: complete
            setState(prev => ({ ...prev, progress: 100 }));

            // Set final state
            setState({
                resume: parsedResume,
                isLoading: false,
                error: null,
                progress: 100,
            });

            return parsedResume;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to parse resume';
            setState({
                resume: null,
                isLoading: false,
                error: errorMessage,
                progress: 0,
            });
            throw error;
        }
    };

    const reset = () => {
        setState({
            resume: null,
            isLoading: false,
            error: null,
            progress: 0,
        });
    };

    return {
        ...state,
        parseResume,
        reset,
    };
}