// utils/pdf-parser-helpers.ts

export function cleanExtractedText(text: string): string {
    // Remove extra whitespace and normalize line breaks
    return text
        .replace(/\s+/g, ' ')
        .replace(/\n\s*\n/g, '\n\n')
        .trim();
}

export function extractSections(text: string): { [key: string]: string } {
    const sections: { [key: string]: string } = {};
    const sectionHeaders = [
        'EXPERIENCE',
        'EDUCATION',
        'SKILLS',
        'PROJECTS',
        'CERTIFICATIONS',
        'SUMMARY',
        'OBJECTIVE',
        'PROFESSIONAL SUMMARY',
        'WORK EXPERIENCE',
        'TECHNICAL SKILLS',
        'PROFESSIONAL EXPERIENCE'
    ];

    let currentSection = 'HEADER';
    let currentContent = '';

    const lines = text.split('\n');

    for (const line of lines) {
        const upperLine = line.toUpperCase().trim();

        // Check if line is a section header
        const matchedHeader = sectionHeaders.find(header =>
            upperLine.includes(header) || upperLine === header
        );

        if (matchedHeader) {
            // Save previous section
            if (currentContent.trim()) {
                sections[currentSection] = currentContent.trim();
            }
            currentSection = matchedHeader;
            currentContent = '';
        } else {
            currentContent += line + '\n';
        }
    }

    // Save the last section
    if (currentContent.trim()) {
        sections[currentSection] = currentContent.trim();
    }

    return sections;
}

export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function extractEmail(text: string): string | null {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const matches = text.match(emailRegex);
    return matches ? matches[0] : null;
}

export function extractPhone(text: string): string | null {
    const phoneRegex = /(?:\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
    const matches = text.match(phoneRegex);
    return matches ? matches[0] : null;
}

export function extractLinkedIn(text: string): string | null {
    const linkedInRegex = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?/gi;
    const matches = text.match(linkedInRegex);
    return matches ? matches[0] : null;
}

export function extractGitHub(text: string): string | null {
    const githubRegex = /(?:https?:\/\/)?(?:www\.)?github\.com\/[a-zA-Z0-9-]+\/?/gi;
    const matches = text.match(githubRegex);
    return matches ? matches[0] : null;
}

export function extractName(text: string): { firstName: string; lastName: string } {
    // Usually, the name is at the top of the resume
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length > 0) {
        const nameLine = lines[0].trim();
        const nameParts = nameLine.split(/\s+/);

        if (nameParts.length >= 2) {
            return {
                firstName: nameParts[0],
                lastName: nameParts.slice(1).join(' ')
            };
        }
    }

    return { firstName: '', lastName: '' };
}

export function normalizeDate(dateStr: string): string {
    // Convert various date formats to YYYY-MM
    const monthMap: { [key: string]: string } = {
        'january': '01', 'jan': '01',
        'february': '02', 'feb': '02',
        'march': '03', 'mar': '03',
        'april': '04', 'apr': '04',
        'may': '05',
        'june': '06', 'jun': '06',
        'july': '07', 'jul': '07',
        'august': '08', 'aug': '08',
        'september': '09', 'sep': '09', 'sept': '09',
        'october': '10', 'oct': '10',
        'november': '11', 'nov': '11',
        'december': '12', 'dec': '12'
    };

    const lowerDate = dateStr.toLowerCase();

    if (lowerDate.includes('present') || lowerDate.includes('current')) {
        return 'Present';
    }

    // Try to extract month and year
    for (const [monthName, monthNum] of Object.entries(monthMap)) {
        if (lowerDate.includes(monthName)) {
            const yearMatch = dateStr.match(/\d{4}/);
            if (yearMatch) {
                return `${yearMatch[0]}-${monthNum}`;
            }
        }
    }

    // Handle MM/YYYY or MM-YYYY formats
    const mmyyyyMatch = dateStr.match(/(\d{1,2})[-/](\d{4})/);
    if (mmyyyyMatch) {
        const month = mmyyyyMatch[1].padStart(2, '0');
        return `${mmyyyyMatch[2]}-${month}`;
    }

    // Handle YYYY only
    const yearOnlyMatch = dateStr.match(/\d{4}/);
    if (yearOnlyMatch) {
        return `${yearOnlyMatch[0]}-01`; // Default to January
    }

    return dateStr; // Return original if no pattern matches
}

export function extractSkills(text: string): string[] {
    // Common skill indicators
    const skillIndicators = [
        'proficient in',
        'experienced with',
        'skilled in',
        'expertise in',
        'knowledge of',
        'familiar with'
    ];

    const skills = new Set<string>();
    const lines = text.split('\n');

    for (const line of lines) {
        const lowerLine = line.toLowerCase();

        // Check for skill indicators
        for (const indicator of skillIndicators) {
            if (lowerLine.includes(indicator)) {
                const skillPart = line.split(indicator)[1];
                if (skillPart) {
                    // Extract skills from comma-separated list
                    const extractedSkills = skillPart
                        .split(/[,;]/)
                        .map(skill => skill.trim())
                        .filter(skill => skill.length > 0);

                    extractedSkills.forEach(skill => skills.add(skill));
                }
            }
        }

        // Check for bullet points or lists of skills
        if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
            const skill = line.replace(/^[•\-]\s*/, '').trim();
            if (skill.length > 0 && skill.length < 50) { // Avoid long sentences
                skills.add(skill);
            }
        }
    }

    return Array.from(skills);
}