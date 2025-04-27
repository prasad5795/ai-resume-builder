import { ResumeCreationSelector } from "./ResumeCreationSelector";

export default function ResumePage() {
    const handleStartFromScratch = () => {
        // Logic to start a new resume from scratch
        // Perhaps navigate to a new page or open a resume builder form
    };

    const handleModifyExisting = () => {
        // Logic to modify an existing resume
        // Perhaps load existing resume data or open an edit interface
    };

    return (
        <div>
            <ResumeCreationSelector
            // onStartFromScratch={handleStartFromScratch}
            // onModifyExisting={handleModifyExisting}
            />
        </div>
    );
}