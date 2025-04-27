"use client";

import React, { useState } from 'react';
import {
    FileEdit,
    PlusCircle,
    RefreshCcw,
    ArrowRight
} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from 'next/navigation';

interface ResumeCreationSelectorProps {
    onStartFromScratch: () => void;
    onModifyExisting: () => void;
}

export function ResumeCreationSelector() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const router = useRouter()

    const onStartFromScratch = () => {
        router.push('/resumes')
    }

    const onModifyExisting = () => {
        router.push('/resume-upload')
    }

    const options = [
        {
            icon: PlusCircle,
            title: "Start from Scratch",
            description: "Create a brand new resume from ground up",
            action: onStartFromScratch,
            color: "bg-green-50 hover:bg-green-100",
            iconColor: "text-green-600"
        },
        {
            icon: FileEdit,
            title: "Modify Existing Resume",
            description: "Enhance and update your current resume",
            action: onModifyExisting,
            color: "bg-blue-50 hover:bg-blue-100",
            iconColor: "text-blue-600"
        }
    ];

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                    Get started
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-gray-800">
                        Resume Creation Options
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                        Choose how you want to create or improve your resume
                    </DialogDescription>
                </DialogHeader>

                <div className="grid md:grid-cols-2 gap-6 py-6">
                    {options.map((option, index) => (
                        <Card
                            key={index}
                            className={`
                cursor-pointer 
                transition-all 
                duration-300 
                ease-in-out 
                transform 
                hover:-translate-y-2 
                hover:shadow-xl 
                ${option.color}
              `}
                            onClick={() => {
                                option.action();
                                setIsDialogOpen(false);
                            }}
                        >
                            <CardHeader className="pb-4">
                                <div className="flex items-center space-x-4">
                                    <div className={`
                    p-3 
                    rounded-full 
                    ${option.iconColor} 
                    bg-white 
                    shadow-md
                  `}>
                                        <option.icon className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-xl">{option.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">{option.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="flex justify-center mt-4">
                    <Button
                        variant="ghost"
                        onClick={() => setIsDialogOpen(false)}
                    >
                        Cancel
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}