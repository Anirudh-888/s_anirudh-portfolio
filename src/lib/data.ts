export interface Profile {
  name: string;
  role: string;
  title: string;
  tagline: string;
  location: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  github: string;
  githubDisplay: string;
  linkedin: string;
  linkedinDisplay: string;
  portfolio: string;
  portfolioDisplay: string;
  studio: string;
  studioDisplay: string;
  resumePath: string;
  resumeSummary: string;
  aboutQuote: string;
  studentId: string;
  department: string;
  graduationYear: string;
}

export interface NavItem {
  name: string;
  href: string;
  index: string;
}

export interface SkillElement {
  atomicNumber: number;
  symbol: string;
  name: string;
  family: 'Languages' | 'Frontend' | 'Backend' | 'AI & Data' | 'Databases & Cloud' | 'Tools & Core';
  isBrand: boolean;
  logoSlug?: string;
  color?: string;
  projects: string[];
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  kicker: string;
  meta: string;
  description: string;
  features: string[];
  tech: string[];
  screenshot: string;
  github?: string;
  live?: string;
}

export interface CertificationItem {
  index: string;
  title: string;
  issuer: string;
  date: string;
  focus: string;
}

export interface ExperienceItem {
  index: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: 'experience' | 'education';
  bullets: string[];
  badge?: string;
}

export interface AchievementItem {
  index: string;
  title: string;
  metric: string;
  metricValue: number;
  metricSuffix: string;
  platform: string;
  description: string;
  date: string;
  logo: string;
}

export const PROFILE: Profile = {
  name: 'S Anirudh',
  role: 'Full-Stack Developer & AI Engineer',
  title: 'Founder, Cloud & Fire',
  tagline: 'Full-Stack Developer, AI Engineer, and Founder of Cloud & Fire',
  location: 'Bengaluru, Karnataka, India',
  phone: '+91 93807 07544',
  phoneHref: 'tel:+919380707544',
  email: 'anirudh@cloudandfire.tech',
  emailHref: 'mailto:anirudh@cloudandfire.tech',
  github: 'https://github.com/Anirudh-888',
  githubDisplay: 'github.com/Anirudh-888',
  linkedin: 'https://linkedin.com/sanipeidatech',
  linkedinDisplay: 'linkedin.com/sanipeidatech',
  portfolio: 'https://anirudh.cloudandfire.tech/',
  portfolioDisplay: 'anirudh.cloudandfire.tech',
  studio: 'https://cloudandfire.tech/',
  studioDisplay: 'cloudandfire.tech',
  resumePath: '/resume.pdf',
  resumeSummary:
    'Full-Stack Developer, AI Engineer, and Founder of Cloud & Fire with hands-on experience architecting production web applications, civic-tech platforms, and LLM-powered workflows. Pursuing a B.E. in Information Science and Engineering at MVJ College of Engineering (CGPA: 9.00) while leading technical delivery for student developer initiatives and mentoring students in Python programming and core sciences.',
  aboutQuote:
    'Architecting production web systems, practical AI workflows, and rapid MVPs while translating complex algorithmic logic into structured, resilient software.',
  studentId: '1MJ24IS077',
  department: 'Information Science & Engineering',
  graduationYear: '2028',
};

export const NAV: NavItem[] = [
  { name: 'About', href: '#about', index: '01' },
  { name: 'Skills', href: '#skills', index: '02' },
  { name: 'Work', href: '#work', index: '03' },
  { name: 'Certifications', href: '#certifications', index: '04' },
  { name: 'Experience', href: '#experience', index: '05' },
  { name: 'Achievements', href: '#achievements', index: '06' },
  { name: 'Contact', href: '#contact', index: '07' },
];

export const SKILL_GROUPS: SkillElement[] = [
  // Languages
  { atomicNumber: 1, symbol: 'Py', name: 'Python', family: 'Languages', isBrand: true, logoSlug: 'python', color: '#3776AB', projects: ['EvntPulse', 'Heliri Bengaluru', 'Science Educator'] },
  { atomicNumber: 2, symbol: 'Jv', name: 'Java', family: 'Languages', isBrand: true, logoSlug: 'java', color: '#EA2D42', projects: ['Backend & Servlets', 'DSA Practice'] },
  { atomicNumber: 3, symbol: 'C', name: 'C', family: 'Languages', isBrand: true, logoSlug: 'c', color: '#A8B9CC', projects: ['Systems Programming', 'Core DSA'] },
  { atomicNumber: 4, symbol: 'Cp', name: 'C++', family: 'Languages', isBrand: true, logoSlug: 'cplusplus', color: '#00599C', projects: ['Competitive Programming', 'DSA Sheet'] },
  { atomicNumber: 5, symbol: 'Js', name: 'JavaScript', family: 'Languages', isBrand: true, logoSlug: 'javascript', color: '#F7DF1E', projects: ['SuggestMVJCE', 'InAmigos Foundation'] },
  { atomicNumber: 6, symbol: 'Ts', name: 'TypeScript', family: 'Languages', isBrand: true, logoSlug: 'typescript', color: '#3178C6', projects: ['Cloud & Fire', 'Production Frontends'] },
  { atomicNumber: 7, symbol: 'Sq', name: 'SQL', family: 'Languages', isBrand: true, logoSlug: 'sqlite', color: '#003B57', projects: ['PostgreSQL', 'Oracle SQL', 'MySQL'] },
  { atomicNumber: 8, symbol: 'Pl', name: 'PL/SQL', family: 'Languages', isBrand: true, logoSlug: 'oracle', color: '#F80000', projects: ['Enterprise Database Queries'] },

  // Frontend
  { atomicNumber: 9, symbol: 'Re', name: 'React', family: 'Frontend', isBrand: true, logoSlug: 'react', color: '#61DAFB', projects: ['EvntPulse', 'Heliri Bengaluru', 'Cloud & Fire'] },
  { atomicNumber: 10, symbol: 'Nx', name: 'Next.js', family: 'Frontend', isBrand: true, logoSlug: 'nextdotjs', color: '#000000', projects: ['Production Portfolios', 'SSR Apps'] },
  { atomicNumber: 11, symbol: 'Tw', name: 'Tailwind CSS', family: 'Frontend', isBrand: true, logoSlug: 'tailwindcss', color: '#06B6D4', projects: ['EvntPulse', 'SuggestMVJCE', 'Cloud & Fire'] },
  { atomicNumber: 12, symbol: 'H5', name: 'HTML5', family: 'Frontend', isBrand: true, logoSlug: 'html5', color: '#E34F26', projects: ['InAmigos Outreach', 'Web Systems'] },
  { atomicNumber: 13, symbol: 'C3', name: 'CSS3', family: 'Frontend', isBrand: true, logoSlug: 'css3', color: '#1572B6', projects: ['Responsive Layouts', 'UI Modules'] },

  // Backend
  { atomicNumber: 14, symbol: 'Fa', name: 'FastAPI', family: 'Backend', isBrand: true, logoSlug: 'fastapi', color: '#009688', projects: ['Heliri Bengaluru', 'Cloud & Fire Backends'] },
  { atomicNumber: 15, symbol: 'No', name: 'Node.js', family: 'Backend', isBrand: true, logoSlug: 'nodedotjs', color: '#5FA04E', projects: ['SuggestMVJCE', 'API Services'] },
  { atomicNumber: 16, symbol: 'Ex', name: 'Express.js', family: 'Backend', isBrand: true, logoSlug: 'express', color: '#000000', projects: ['SuggestMVJCE', 'Microservices'] },
  { atomicNumber: 17, symbol: 'Sv', name: 'Java Servlets', family: 'Backend', isBrand: false, color: '#EA2D42', projects: ['JSP Development', 'JDBC Pipelines'] },
  { atomicNumber: 18, symbol: 'Ap', name: 'REST APIs', family: 'Backend', isBrand: false, color: '#3A3A3A', projects: ['EvntPulse', 'Heliri Bengaluru', 'SuggestMVJCE'] },

  // AI & Data Science
  { atomicNumber: 19, symbol: 'Pr', name: 'Prompt Eng.', family: 'AI & Data', isBrand: false, color: '#10A37F', projects: ['LLM Orchestration', 'Gemini AI Pipelines'] },
  { atomicNumber: 20, symbol: 'Ge', name: 'Gemini API', family: 'AI & Data', isBrand: true, logoSlug: 'googlegemini', color: '#8E75B2', projects: ['Heliri Bengaluru (Issue Triage)'] },
  { atomicNumber: 21, symbol: 'Lm', name: 'LLM Orchestration', family: 'AI & Data', isBrand: false, color: '#0D0D0D', projects: ['Cloud & Fire AI Workflows'] },
  { atomicNumber: 22, symbol: 'Np', name: 'NumPy', family: 'AI & Data', isBrand: true, logoSlug: 'numpy', color: '#013243', projects: ['Data Analysis', 'Mathematical Computing'] },
  { atomicNumber: 23, symbol: 'Pd', name: 'Pandas', family: 'AI & Data', isBrand: true, logoSlug: 'pandas', color: '#150458', projects: ['Dataset Cleansing', 'Statistical Models'] },
  { atomicNumber: 24, symbol: 'Mp', name: 'Matplotlib', family: 'AI & Data', isBrand: false, color: '#11557C', projects: ['Data Visualization'] },
  { atomicNumber: 25, symbol: 'Sb', name: 'Seaborn', family: 'AI & Data', isBrand: false, color: '#4C72B0', projects: ['Statistical Graphics'] },
  { atomicNumber: 26, symbol: 'Sk', name: 'scikit-learn', family: 'AI & Data', isBrand: true, logoSlug: 'scikitlearn', color: '#F7931E', projects: ['ML Algorithms', 'Predictive Analytics'] },
  { atomicNumber: 27, symbol: 'Nl', name: 'NLTK', family: 'AI & Data', isBrand: false, color: '#306998', projects: ['Natural Language Processing'] },

  // Databases & Cloud
  { atomicNumber: 28, symbol: 'Pg', name: 'PostgreSQL', family: 'Databases & Cloud', isBrand: true, logoSlug: 'postgresql', color: '#4169E1', projects: ['Heliri Bengaluru'] },
  { atomicNumber: 29, symbol: 'Gi', name: 'PostGIS', family: 'Databases & Cloud', isBrand: false, color: '#2B7489', projects: ['Heliri Bengaluru (BBMP Wards)'] },
  { atomicNumber: 30, symbol: 'Mg', name: 'MongoDB Atlas', family: 'Databases & Cloud', isBrand: true, logoSlug: 'mongodb', color: '#47A248', projects: ['SuggestMVJCE'] },
  { atomicNumber: 31, symbol: 'My', name: 'MySQL', family: 'Databases & Cloud', isBrand: true, logoSlug: 'mysql', color: '#4479A1', projects: ['Relational Data Modeling'] },
  { atomicNumber: 32, symbol: 'Or', name: 'Oracle SQL', family: 'Databases & Cloud', isBrand: true, logoSlug: 'oracle', color: '#F80000', projects: ['Enterprise DB Systems'] },
  { atomicNumber: 33, symbol: 'Fb', name: 'Firebase', family: 'Databases & Cloud', isBrand: true, logoSlug: 'firebase', color: '#FFCA28', projects: ['Realtime Storage & Auth'] },
  { atomicNumber: 34, symbol: 'Az', name: 'Microsoft Azure', family: 'Databases & Cloud', isBrand: true, logoSlug: 'microsoftazure', color: '#0078D4', projects: ['EvntPulse (App Service)', 'SuggestMVJCE'] },
  { atomicNumber: 35, symbol: 'Gh', name: 'GitHub Pages', family: 'Databases & Cloud', isBrand: true, logoSlug: 'githubpages', color: '#222222', projects: ['Client Portfolio Deployments'] },

  // Tools & Core Concepts
  { atomicNumber: 36, symbol: 'Gt', name: 'Git', family: 'Tools & Core', isBrand: true, logoSlug: 'git', color: '#F05032', projects: ['Version Control Across All Projects'] },
  { atomicNumber: 37, symbol: 'Ga', name: 'GitHub Actions', family: 'Tools & Core', isBrand: true, logoSlug: 'githubactions', color: '#2088FF', projects: ['EvntPulse CI/CD to Azure'] },
  { atomicNumber: 38, symbol: 'Dk', name: 'Docker', family: 'Tools & Core', isBrand: true, logoSlug: 'docker', color: '#2496ED', projects: ['Containerized Microservices'] },
  { atomicNumber: 39, symbol: 'Lx', name: 'Linux (WSL)', family: 'Tools & Core', isBrand: true, logoSlug: 'linux', color: '#FCC624', projects: ['Development & Deployment Environment'] },
  { atomicNumber: 40, symbol: 'Fi', name: 'Figma', family: 'Tools & Core', isBrand: true, logoSlug: 'figma', color: '#F24E1E', projects: ['InAmigos Outreach UI/UX Layouts'] },
  { atomicNumber: 41, symbol: 'Ds', name: 'DSA', family: 'Tools & Core', isBrand: false, color: '#3A3A3A', projects: ['LeetCode', 'Striver’s A2Z DSA Sheet', 'HackerRank'] },
  { atomicNumber: 42, symbol: 'Oo', name: 'OOP', family: 'Tools & Core', isBrand: false, color: '#3A3A3A', projects: ['Java & Python Modular Architectures'] },
  { atomicNumber: 43, symbol: 'Sd', name: 'System Design', family: 'Tools & Core', isBrand: false, color: '#3A3A3A', projects: ['EvntPulse', 'Heliri Bengaluru', 'Cloud & Fire'] },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'evntpulse',
    index: '01',
    title: 'EvntPulse',
    kicker: 'Campus OS & Verifiable Ticketing',
    meta: 'September 2026 • 1st Place Winner (out of 9 teams) — MVJCE SDC Intra-Club Startup Challenge',
    description:
      'Built an end-to-end campus event operations and participant engagement platform to streamline registration workflows and real-time coordination, with automated CI/CD deployment to Azure Web App via GitHub Actions.',
    features: [
      'End-to-end campus event operations & ticket verification',
      'Automated CI/CD deployment to Azure Web App via GitHub Actions',
      'Verifiable QR ticketing with instantaneous check-in validation',
      'Real-time club announcements and live participant synchronization',
    ],
    tech: ['Python', 'React', 'Tailwind CSS', 'Microsoft Azure', 'GitHub Actions'],
    screenshot: '/projects/evntpulse.webp',
    github: 'https://github.com/Anirudh-888',
    live: 'https://anirudh.cloudandfire.tech/',
  },
  {
    id: 'heliri-bengaluru',
    index: '02',
    title: 'Heliri Bengaluru',
    kicker: 'Bilingual Civic Grievance & BBMP Ward Mapping',
    meta: 'November 2026 • Submitted to IBM Bobathon & Google AI Startup Buildathon',
    description:
      'Engineered a bilingual civic grievance reporting, spatial BBMP ward-mapping, and civil-engineer gig-employment platform featuring geospatial boundary mapping and AI-assisted issue classification.',
    features: [
      'Bilingual Kannada/English civic grievance submission engine',
      'Spatial 2022 BBMP 243-ward boundary mapping with PostGIS & Leaflet',
      'AI-assisted automatic issue categorisation with Gemini AI',
      'Civil-engineer gig employment portal with real-time resolution telemetry',
    ],
    tech: ['React', 'Python (FastAPI)', 'PostgreSQL', 'PostGIS', 'Leaflet Maps', 'Gemini AI'],
    screenshot: '/projects/heliri-bengaluru.webp',
    github: 'https://github.com/Anirudh-888',
    live: 'https://anirudh.cloudandfire.tech/',
  },
  {
    id: 'suggestmvjce',
    index: '03',
    title: 'SuggestMVJCE',
    kicker: 'Live Anonymous Suggestion & Routing Portal',
    meta: 'June 2026 • Live Campus Portal for MVJ College of Engineering',
    description:
      'Developed and deployed a live anonymous student suggestion and grievance routing portal for MVJ College of Engineering, enabling secure submissions and administrative transparency.',
    features: [
      'Zero-knowledge anonymous submission pipeline for campus grievances',
      'Dynamic upvote ranking and department routing with live polling',
      'Administrative transparency dashboard with resolution progress bars',
      'Category distribution analytics across academics, infrastructure & hostels',
    ],
    tech: ['Node.js', 'Express.js', 'MongoDB Atlas', 'Tailwind CSS', 'Microsoft Azure App Service'],
    screenshot: '/projects/suggestmvjce.webp',
    github: 'https://github.com/Anirudh-888',
    live: 'https://anirudh.cloudandfire.tech/',
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    index: '01',
    title: 'Introduction to Generative AI & Introduction to Large Language Models',
    issuer: 'Google Cloud Skills Boost',
    date: 'Jul 2026',
    focus: 'Foundational concepts of Generative AI, Large Language Models (LLMs), prompt tuning, and responsible AI practices.',
  },
  {
    index: '02',
    title: 'Java Servlet and JSP Development',
    issuer: 'Simplilearn',
    date: 'Jun 2026',
    focus: 'Enterprise Java architecture, Servlet lifecycles, JSP scripting, JDBC connection pooling, and MVC request dispatching.',
  },
  {
    index: '03',
    title: 'AI Fundamentals, Machine Learning, Computer Vision & NLP with NLTK',
    issuer: 'GUVI & Kaggle',
    date: '2026',
    focus: 'Core machine learning algorithms, computer vision pipelines, text processing, tokenization, and linguistic sentiment analysis with NLTK.',
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    index: '01',
    role: 'Founder & Lead Developer',
    organization: 'Cloud & Fire',
    location: 'Bengaluru, India',
    period: '2026 – Present',
    type: 'experience',
    badge: 'Founder',
    bullets: [
      'Founded an independent software development studio building custom full-stack web platforms, practical AI workflows, and rapid MVPs for small businesses.',
      'Architected and deployed production web systems using React, TypeScript, Tailwind CSS, Python (FastAPI), Node.js, and cloud infrastructure.',
    ],
  },
  {
    index: '02',
    role: 'Web Development Intern',
    organization: 'InAmigos Foundation',
    location: 'Remote',
    period: 'August 2026',
    type: 'experience',
    badge: 'Internship',
    bullets: [
      'Developed responsive HTML5/CSS3 awareness webpages and designed UI/UX layouts in Figma for non-profit digital outreach campaigns.',
    ],
  },
  {
    index: '03',
    role: 'Tech Team Member',
    organization: 'Software Development Club (SDC), MVJ College of Engineering',
    location: 'Bengaluru, India',
    period: '2026 – Present',
    type: 'experience',
    badge: 'Campus Tech',
    bullets: [
      'Engineered campus-wide production web tools and led technical execution for student developer challenges and workshops.',
    ],
  },
  {
    index: '04',
    role: 'Science & Python Programming Educator',
    organization: 'Independent Mentorship',
    location: 'Bengaluru, India',
    period: 'September 2025 – Present',
    type: 'experience',
    badge: 'Educator',
    bullets: [
      'Instructed students across Classes 6–12 in Python programming fundamentals and core sciences, translating algorithmic logic and scientific concepts into structured visual mental models.',
    ],
  },
  {
    index: '05',
    role: 'B.E. in Information Science & Engineering',
    organization: 'MVJ College of Engineering',
    location: 'Bengaluru, Karnataka, India',
    period: '2024 – 2028',
    type: 'education',
    badge: 'CGPA 9.00',
    bullets: [
      'VTU 2022 Scheme • USN: 1MJ24IS077 • Cumulative GPA: 9.00 / 10.00 (4th Semester SGPA: 9.25).',
      'Core coursework: Data Structures, Operating Systems, Database Management Systems, Object-Oriented Programming, and Computer Networks.',
    ],
  },
];

export const EDUCATION = {
  degree: 'Bachelor of Engineering (B.E.) in Information Science & Engineering',
  institution: 'MVJ College of Engineering, Bengaluru',
  period: '2024 – 2028',
  scheme: 'VTU 2022 Scheme',
  usn: '1MJ24IS077',
  cgpa: '9.00 / 10.00',
  sgpa4: '9.25',
};

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    index: '01',
    title: '1st Place Winner — Startup Challenge',
    metric: '9 Teams Competed',
    metricValue: 1,
    metricSuffix: 'st Place',
    platform: 'MVJCE SDC',
    description: 'Secured 1st place out of 9 competing teams at the MVJCE Software Development Club Intra-Club Startup Challenge with EvntPulse.',
    date: '2026',
    logo: 'mvjce',
  },
  {
    index: '02',
    title: 'Academic Cumulative GPA',
    metric: 'Out of 10.00 CGPA',
    metricValue: 9,
    metricSuffix: '.00 CGPA',
    platform: 'VTU / MVJCE',
    description: 'Maintained 9.00 cumulative GPA with a 9.25 SGPA in the 4th semester across Information Science & Engineering curriculum.',
    date: '2024 – 2028',
    logo: 'education',
  },
  {
    index: '03',
    title: 'Google Cloud Arcade Facilitator',
    metric: 'Cohort 2026',
    metricValue: 2026,
    metricSuffix: '',
    platform: 'Google Cloud',
    description: 'Selected and active in the Google Cloud Arcade Facilitator Program, facilitating cloud labs and GenAI skill badges.',
    date: '2026',
    logo: 'googlecloud',
  },
  {
    index: '04',
    title: 'Microsoft AI Skills Fest',
    metric: 'Participant',
    metricValue: 100,
    metricSuffix: '% Complete',
    platform: 'Microsoft',
    description: 'Completed hands-on Microsoft AI Skills Fest tracks focused on responsible AI, model orchestration, and cognitive services.',
    date: '2026',
    logo: 'microsoft',
  },
  {
    index: '05',
    title: 'Active DSA Practitioner',
    metric: 'Algorithmic Problem Solving',
    metricValue: 300,
    metricSuffix: '+ Problems',
    platform: 'LeetCode & Striver A2Z',
    description: 'Active problem solver across LeetCode, Striver’s A2Z DSA Sheet, and HackerRank solving problems in Python, Java, and C++.',
    date: 'Continuous',
    logo: 'leetcode',
  },
];
