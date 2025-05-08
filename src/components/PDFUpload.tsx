'use client';

import { AlertCircle } from 'lucide-react';
import { Dispatch, useState } from 'react';
// Import React FilePond
import { FilePond } from 'react-filepond';

// Import FilePond styles
import { FilePondFile, FilePondInitialFile } from 'filepond';
import 'filepond/dist/filepond.min.css';

interface PDFUploadProps {
    onFileSelect: (file: FilePondFile | null) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setatsResume: Dispatch<any>
}

export function PDFUpload({ onFileSelect, setatsResume }: PDFUploadProps) {
    // const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [files, setFiles] = useState<FilePondFile[] | null>([])

    const handleFileSelect = (file: FilePondFile) => {
        if (file.fileType === "application/pdf") {
            setFiles([file]);
            setError(null);
            onFileSelect(file);
        } else {
            setError("Please upload a PDF file");
            onFileSelect(null);
        }
    };

    const handleChange = (files: FilePondFile[]) => {
        if (files && files?.[0]) {
            const file = files?.[0];
            handleFileSelect(file as unknown as FilePondFile);
        }
    };

    const handleRemoveFile = () => {
        setFiles(null)
        setError(null);
        onFileSelect(null);
        setatsResume(null)
    };


    return (
        <div className="w-full">
            <FilePond
                files={files as unknown as FilePondInitialFile[]}
                onupdatefiles={handleChange}
                onremovefile={handleRemoveFile}
                acceptedFileTypes={[".pdf"]}
                allowMultiple={false}
                maxFiles={1}
                // server="/api"
                name="files" /* sets the file input name, it's filepond by default */
                labelIdle='Drag & Drop your resume.pdf or <span class="filepond--label-action">Browse</span>'
            />

            {error && (
                <div className="mt-2 flex items-center gap-2 text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
}