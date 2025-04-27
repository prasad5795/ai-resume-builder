'use client';

import { Dispatch, useState } from 'react';
import { Upload, File, AlertCircle, X } from 'lucide-react';

interface PDFUploadProps {
    onFileSelect: (file: File | null) => void;
    isProcessing?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setatsResume: Dispatch<any>
}

export function PDFUpload({ onFileSelect, isProcessing = false, setatsResume }: PDFUploadProps) {
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleFileSelect = (file: File) => {
        if (file.type === "application/pdf") {
            setSelectedFile(file);
            setError(null);
            onFileSelect(file);
        } else {
            setError("Please upload a PDF file");
            onFileSelect(null);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            handleFileSelect(file);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            handleFileSelect(file);
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setError(null);
        onFileSelect(null);
        setatsResume(null)
    };

    if (selectedFile) {
        return (
            <div className="w-full">
                <div className="border-2 border-dashed rounded-lg p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <File className="h-6 w-6 text-blue-500" />
                        <span className="text-gray-700">{selectedFile.name}</span>
                    </div>
                    <button
                        onClick={handleRemoveFile}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-full"
                        disabled={isProcessing}
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
          ${error ? 'border-red-500' : ''}
          ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-blue-400'}
        `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isProcessing}
                />

                <div className="flex flex-col items-center gap-4">
                    {isProcessing ? (
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
                    ) : (
                        <Upload className="h-12 w-12 text-gray-400" />
                    )}

                    <div>
                        <p className="text-lg font-medium text-gray-700">
                            {isProcessing ? 'Processing...' : 'Drop your resume PDF here'}
                        </p>
                        <p className="text-sm text-gray-500">
                            or click to browse
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <File className="h-4 w-4" />
                        <span>PDF files only</span>
                    </div>
                </div>
            </div>

            {error && (
                <div className="mt-2 flex items-center gap-2 text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
}