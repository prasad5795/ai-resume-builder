import { NextRequest, NextResponse } from 'next/server';
import { ATSResumeGenerator } from '@/lib/resume-parser';

export async function POST(req: NextRequest) {
    try {
        // const { parsedPDF, jobDescription } = await req.json();

        // if (!parsedPDF || !jobDescription) {
        //     return NextResponse.json(
        //         { error: 'Missing required data' },
        //         { status: 400 }
        //     );
        // }

        // const generator = new ATSResumeGenerator(process.env.OPENAI_API_KEY!);

        // // Extract structured data from parsed PDF
        // const resumeData = generator.extractResumeData(parsedPDF);

        // // Generate ATS-friendly resume
        // const atsResume = await generator.generateATSResume(resumeData, jobDescription);

        // // Analyze keyword match
        // // const keywordAnalysis = await generator.analyzeKeywordMatch(resumeData, jobDescription);

        // return NextResponse.json({
        //     resumeData,
        //     atsResume,
        //     // keywordAnalysis,
        // });

        return NextResponse.json({
            "resumeData": {
                "personal": {
                    "fullName": "Prasad Kulkarni",
                    "email": "kulkarniprasad57@gmail.com",
                    "phone": "+917875336615",
                    "linkedin": "prasad-kulkarni-674a3a121",
                    "website": "https://prasad5795.github.io/personal-portfolio/"
                },
                "summary": "Experienced Senior UI Developer with 9+ years in building scalable, user-focused web applications using React.js, Next.js, TypeScript, and modern JavaScript frameworks. Proven expertise in Web3, AI integration, and backend connectivity. Adept at delivering high-performance solutions and collaborating across teams to drive product excellence.",
                "experience": [
                    {
                        "company": "VDX.tv",
                        "role": "Senior Frontend Developer",
                        "dateBegin": "October 2023",
                        "dateEnd": "",
                        "isCurrent": true,
                        "location": "Remote",
                        "description": [
                            "Designed and implemented the user interface (UI) based on UX provided by designers, ensuring an intuitive and user-friendly experience for creative tools, resulting in a 25% increase in user engagement.",
                            "Developed and integrated APIs for various features, enhancing functionality and performance of the application, reducing response times by 40%.",
                            "Implemented the simple edit and advanced edit functionality, enabling users to easily modify creatives and ads through a variety of forms, leading to a 15% reduction in user task completion time.",
                            "Created and integrated widgets and editing tools for real-time manipulation of creatives directly on the canvas, improving productivity by 30%.",
                            "Developed an asset management system for efficient handling and organization of creative project assets, reducing asset retrieval time by 50%.",
                            "Built and maintained templates for admins, ensuring easy management of templates and streamlining content creation, cutting template setup time by 20%.",
                            "Integrated user authentication functionality to ensure secure access and management of user data, improving security and reducing unauthorized access incidents by 35%.",
                            "Assisted in containerizing the application using Docker for easier deployment and environment consistency, reducing deployment time by 60%.",
                            "Wrote comprehensive unit tests and end-to-end tests, ensuring the reliability and stability of features, resulting in 95% code coverage and reducing bug reports by 40%.",
                            "Developed a WYSIWYG editor for seamless text editing on creatives and ads, increasing user satisfaction with editing tools by 30%."
                        ]
                    },
                    {
                        "company": "LogicMonitor",
                        "role": "Senior Frontend Developer",
                        "dateBegin": "January 2020",
                        "dateEnd": "September 2023",
                        "isCurrent": false,
                        "location": "Pune, Maharashtra, India · Remote",
                        "description": [
                            "Collaborated on the development of core features such as alerts, tracing, and alert grouping using React and supporting libraries, improving feature efficiency by 30%.",
                            "Implemented the Timeline View Feature for application tracing, including a Gantt Chart implementation using Highcharts, reducing loading time by 40% for large data sets.",
                            "Engineered a customized charting library, integrated across the entire project, boosting data visualization capabilities and enhancing user interaction across 100+ features.",
                            "Implemented Topology/Mappings Feature using the yFiles for HTML library, supporting graphs with up to 10,000 nodes, improving system scalability and performance.",
                            "Created and maintained component documentation using Storybook, ensuring seamless development and testing of 50+ reusable UI components, resulting in 20% faster development cycles."
                        ]
                    },
                    {
                        "company": "TomTom",
                        "role": "Associate Software Engineer",
                        "dateBegin": "October 2018",
                        "dateEnd": "January 2020",
                        "isCurrent": false,
                        "location": "Pune, Maharashtra, India · On-site",
                        "description": [
                            "Successfully migrated an existing website from Vanilla JS to a React platform, improving website load time by 50% and scalability by 30%.",
                            "Collaborated with UX designers to create visually impressive and responsive websites, ensuring seamless compatibility across mobile and desktop devices, resulting in a 20% increase in user retention.",
                            "Utilized Mapbox GL and Leaflet libraries to seamlessly integrate maps, enhancing user interaction and improving map loading speed by 40%.",
                            "Developed a user-friendly correction form, similar to Google Maps, enabling users to suggest edits to existing maps, leading to a 15% increase in user contributions.",
                            "Implemented session management using cookies and session storage, ensuring secure and efficient user authentication, reducing login issues by 25%.",
                            "Engineered a sophisticated React platform for map adjustments, utilizing probe datasets to provide real-time updates, enhancing cartographic detail and application usability, which led to a 35% improvement in user satisfaction."
                        ]
                    },
                    {
                        "company": "Persistent Systems",
                        "role": "Senior UI Developer",
                        "dateBegin": "September 2016",
                        "dateEnd": "October 2018",
                        "isCurrent": false,
                        "location": "Pune, Maharashtra, India · On-site",
                        "description": [
                            "Developed Angular and React single-page applications with React Router for navigation and protected routes, reducing page load time by 40% and improving user navigation speed.",
                            "Transformed non-responsive websites into mobile, tablet, and desktop-friendly designs using Sass, media queries, and Bootstrap, increasing mobile user engagement by 25%.",
                            "Enhanced table components with advanced functionalities such as searching, sorting, and exporting, which streamlined data processing and improved data handling efficiency by 35%.",
                            "Added new UI features, such as a calendar widget for selecting date and price ranges, improving user interaction and increasing feature adoption by 20%.",
                            "Created state management solutions using React Context API and Redux for multiple web applications, reducing state-related bugs by 30% and improving application performance.",
                            "Improved frontend performance of React applications by configuring webpack, resulting in 50% faster load times and reducing bundle size by 20%.",
                            "Implemented Restful APIs in Node.js for consumption by frontend applications, enhancing data retrieval efficiency and improving response times by 30%.",
                            "Designed MongoDB database schemas for optimized performance, reducing query execution times by 40% and increasing data retrieval efficiency.",
                            "Developed a data entry web application to automate the process of adding new data to MongoDB within the application's domain, reducing manual entry time by 60%."
                        ]
                    },
                    {
                        "company": "",
                        "role": "",
                        "dateBegin": "",
                        "dateEnd": "",
                        "isCurrent": false,
                        "location": "",
                        "description": []
                    }
                ],
                "education": [
                    {
                        "qualification": "Bachelor of Engineering - Computer Science",
                        "date": "June 2016"
                    }
                ],
                "skills": [
                    {
                        "category": "Technical Skills",
                        "keywords": [
                            "React.js",
                            "Next.js",
                            "TypeScript",
                            "JavaScript (ES6+)",
                            "HTML5/CSS3",
                            "Tailwind CSS",
                            "Shadcn UI",
                            "Material UI",
                            "Web3/Crypto: Ethers.js",
                            "Web3.js",
                            "Smart Contract integration",
                            "NFT marketplaces",
                            "Wallet connectivity",
                            "Backend Integration: Node.js",
                            "Nest.js",
                            "RESTful APIs",
                            "GraphQL",
                            "WebSockets",
                            "Database & Storage: MongoDB",
                            "PostgreSQL",
                            "Supabase",
                            "IPFS",
                            "Pinecone vector database",
                            "AI-Powered Development: GitHub Copilot",
                            "Cursor AI",
                            "Cline for automated code generation and optimization",
                            "AI Technologies: OpenAI API",
                            "LangChain.js",
                            "vector embeddings",
                            "prompt engineering",
                            "Tools & Services: Git",
                            "Docker",
                            "CI/CD pipelines",
                            "Vercel",
                            "AWS",
                            "OpenAI API",
                            "Framer Motion",
                            "Testing: Jest",
                            "Playwright",
                            "Cypress",
                            "TDD methodologies"
                        ]
                    }
                ],
                "certifications": [
                    {
                        "name": "AI Pair Programming with GitHub Copilot",
                        "date": "2025",
                        "department": "LinkedIn"
                    },
                    {
                        "name": "AI Workshop: Building AI Applications with Hugging Face Models",
                        "date": "2025",
                        "department": "LinkedIn"
                    },
                    {
                        "name": "AI-Driven Software Development with OpenAI’s Canvas",
                        "date": "2025",
                        "department": "LinkedIn"
                    },
                    {
                        "name": "Agentic AI: Building Data-First AI Agents",
                        "date": "2025",
                        "department": "LinkedIn"
                    },
                    {
                        "name": "How to Boost Your Productivity with AI Tools",
                        "date": "2025",
                        "department": "LinkedIn"
                    },
                    {
                        "name": "Introduction to Prompt Engineering for Generative AI",
                        "date": "2025",
                        "department": "LinkedIn"
                    },
                    {
                        "name": "Micro Front-End Architecture with React",
                        "date": "2025",
                        "department": "LinkedIn"
                    },
                    {
                        "name": "Prompt Engineering with ChatGPT",
                        "date": "2025",
                        "department": "LinkedIn"
                    },
                    {
                        "name": "Prompt Engineering with Gemini",
                        "date": "2025",
                        "department": "LinkedIn"
                    },
                    {
                        "name": "Using AI Tools for UX Design",
                        "date": "2025",
                        "department": "LinkedIn"
                    },
                    {
                        "name": "Blockchain and Smart Contracts Security",
                        "date": "2023",
                        "department": "LinkedIn"
                    },
                    {
                        "name": "Blockchain: Beyond the Basics",
                        "date": "2023",
                        "department": "LinkedIn"
                    },
                    {
                        "name": "Building Web3 Decentralized Apps in Ethereum",
                        "date": "2023",
                        "department": "LinkedIn"
                    },
                    {
                        "name": "Hands-On Introduction: React",
                        "date": "2023",
                        "department": "LinkedIn"
                    },
                    {
                        "name": "React Native Essential Training",
                        "date": "2023",
                        "department": "LinkedIn"
                    },
                    {
                        "name": "React.js Essential Training",
                        "date": "2023",
                        "department": "LinkedIn"
                    },
                    {
                        "name": "",
                        "date": "",
                        "department": ""
                    },
                    {
                        "name": "",
                        "date": "",
                        "department": ""
                    },
                    {
                        "name": "",
                        "date": "",
                        "department": ""
                    }
                ],
                "projects": [
                    {
                        "title": "AI Content Studio",
                        "description": [
                            "Built and deployed an end-to-end AI content generation platform leveraging OpenAI and OpenRouter APIs, orchestrating multiple LLM models (ChatGPT, Claude) that achieved 97% positive user satisfaction ratings.",
                            "Engineered a cutting-edge vector-based recommendation engine using Pinecone vector database and embedding technology, driving a 43% improvement in content relevance metrics over traditional keyword approaches.",
                            "Architected and integrated a PCI-compliant payment infrastructure with Stripe API, processing over $50K in subscription revenue in Q1.",
                            "Developed enterprise-grade authentication infrastructure with OAuth 2.0 and SSO functionality using Supabase, maintaining 99.9% uptime SLA.",
                            "Crafted a pixel-perfect responsive UI with shadcn component library and Tailwind CSS utility-first framework, decreasing user onboarding friction by 35%.",
                            "Implemented advanced SEO optimization strategies with next-seo, resulting in 62% increase in organic traffic acquisition within three months.",
                            "Deployed full-stack monitoring and observability pipeline with Sentry and PostHog analytics, reducing critical bug MTTR by 47%.",
                            "Designed automated email workflows with Mailchimp for user onboarding, resulting in 28% higher user activation rates."
                        ]
                    },
                    {
                        "title": "NFT Marketplace",
                        "description": [
                            "Architected a cutting-edge front-end ecosystem using Next.js with TypeScript, implementing SSR and Edge Runtime for lightning-fast SEO performance and Core Web Vitals optimization, achieving 98% Lighthouse performance score and reducing page load time by 67%.",
                            "Engineered a robust Web3 integration layer utilizing Web3.js and Ethers.js libraries, establishing real-time bidirectional communication between the UI and multi-chain blockchain networks.",
                            "Crafted immersive, pixel-perfect UI components for NFT galleries, auction interfaces, and collection displays leveraging Tailwind CSS utility-first framework and Framer Motion animations for micro-interactions, increasing user engagement by 42% and reducing bounce rate by 35%.",
                            "Developed a minting workflow with IPFS distributed storage integration, enabling seamless asset tokenization through an intuitive drag-and-drop interface, resulting in 5,000+ NFTs minted within the first month and 89% completion rate for first-time users.",
                            "Implemented enterprise-grade wallet connectivity infrastructure supporting MetaMask, WalletConnect, and Coinbase Wallet with JWT authentication persistence and deep-linking capabilities, increasing successful wallet connections by 78% compared to industry standard.",
                            "Designed and deployed an advanced filtration engine for NFT discovery with Elasticsearch-powered faceted search based on collection metadata, price range parameters, and rarity attribute scoring, leading to 53% increase in marketplace conversion rate and 2.7x longer session duration.",
                            "Optimized UX with skeleton loaders, progressive transaction confirmations, and blockchain event listeners to provide real-time feedback during cross-chain interactions, reducing perceived loading time by 62% and decreasing transaction abandonment by 41%.",
                            "Engineered a custom analytics dashboard with Recharts and Highchatrts, data visualizations for tracking comprehensive NFT performance metrics, market trends, and whale wallet activities, enabling data-driven decisions that increased platform trading volume by 127% quarter-over-quarter."
                        ]
                    }
                ]
            },
            "atsResume": "# Prasad Kulkarni\n\n**Email:** kulkarniprasad57@gmail.com  \n**Phone:** +917875336615  \n**LinkedIn:** [prasad-kulkarni-674a3a121](https://www.linkedin.com/in/prasad-kulkarni-674a3a121)  \n**Website:** [Personal Portfolio](https://prasad5795.github.io/personal-portfolio/)\n\n---\n\n## Professional Summary\n\nExperienced Senior Full Stack Developer with over 9 years of expertise in designing and implementing scalable, user-focused web applications. Proficient in both front-end and back-end technologies, including React.js, Next.js, TypeScript, Node.js, and Nest.js. Proven track record in developing robust software solutions, enhancing system performance, and collaborating across teams to deliver high-quality projects. Adept at leveraging emerging technologies to drive innovation and improve product offerings.\n\n---\n\n## Experience\n\n### VDX.tv  \n**Senior Frontend Developer**  \n_Remote_  \n**October 2023 - Present**  \n- Designed and implemented user interfaces, resulting in a 25% increase in user engagement.\n- Developed APIs to enhance application functionality, reducing response times by 40%.\n- Integrated user authentication, improving security and reducing unauthorized access incidents by 35%.\n- Assisted in containerizing applications using Docker, reducing deployment time by 60%.\n\n### LogicMonitor  \n**Senior Frontend Developer**  \n_Pune, Maharashtra, India · Remote_  \n**January 2020 - September 2023**  \n- Improved feature efficiency by 30% through development of core features using React.\n- Reduced loading time by 40% for large data sets with Timeline View Feature implementation.\n- Boosted data visualization capabilities with a customized charting library.\n\n### TomTom  \n**Associate Software Engineer**  \n_Pune, Maharashtra, India · On-site_  \n**October 2018 - January 2020**  \n- Migrated website to React, improving load time by 50% and scalability by 30%.\n- Enhanced map loading speed by 40% using Mapbox GL and Leaflet libraries.\n\n### Persistent Systems  \n**Senior UI Developer**  \n_Pune, Maharashtra, India · On-site_  \n**September 2016 - October 2018**  \n- Developed single-page applications, reducing page load time by 40%.\n- Improved data handling efficiency by 35% with advanced table functionalities.\n\n---\n\n## Education\n\n**Bachelor of Engineering - Computer Science**  \nJune 2016\n\n---\n\n## Skills\n\n- **Front-End:** React.js, Next.js, TypeScript, JavaScript (ES6+), HTML5/CSS3, Tailwind CSS\n- **Back-End:** Node.js, Nest.js, RESTful APIs, GraphQL\n- **Databases:** MongoDB, PostgreSQL\n- **Cloud Services:** AWS, Vercel\n- **Tools & Services:** Docker, Git, CI/CD pipelines\n- **Testing:** Jest, Playwright, Cypress\n- **Other:** Web3.js, Ethers.js, Smart Contract integration\n\n---\n\n## Certifications\n\n- AI Pair Programming with GitHub Copilot, LinkedIn, 2025\n- AI Workshop: Building AI Applications with Hugging Face Models, LinkedIn, 2025\n- Blockchain and Smart Contracts Security, LinkedIn, 2023\n\n---\n\n## Projects\n\n### AI Content Studio\n- Built an AI content generation platform, achieving 97% positive user satisfaction.\n- Developed a vector-based recommendation engine, improving content relevance by 43%.\n\n### NFT Marketplace\n- Architected a front-end ecosystem using Next.js, achieving a 98% Lighthouse performance score.\n- Developed a minting workflow, resulting in 5,000+ NFTs minted within the first month.\n\n",
            "keywordAnalysis": {
                "matchPercentage": 0,
                "matchedKeywords": [],
                "missingKeywords": [],
                "suggestions": [
                    "Unable to complete ATS keyword analysis.",
                    "Please review resume and job description manually.",
                    "Potential issues with JSON parsing or LLM response."
                ]
            }
        })
    } catch (error) {
        console.error('Error generating ATS resume:', error);
        return NextResponse.json(
            { error: 'Failed to generate ATS resume' },
            { status: 500 }
        );
    }
}