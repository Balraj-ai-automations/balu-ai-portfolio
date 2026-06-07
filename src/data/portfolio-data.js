// ============================================================
// BALU.AI — Portfolio Data
// Edit this single file to update all content on the site.
// ============================================================

export const siteConfig = {
  name: "BALRAJ S",
  tagline: "AI Engineer — Building Intelligent Systems That Ship",
  domain: "balraj.dev",
  version: "2.0",
  status: "ONLINE",
  modulesLoaded: 12,
};

export const aboutData = {
  terminalLines: [
    { command: 'core.origin = "EEE @ DSIT, Bengaluru"', delay: 0 },
    { command: 'ai_module.install("ML", "DL", "NLP", "GenAI")', delay: 400 },
    { command: 'framework.load("LangChain", "FastAPI", "React")', delay: 800 },
    { command: 'deployment.first = "Decoda"', delay: 1200 },
    { command: 'career.focus = "AI_AGENTS | AUTOMATION | RAG"', delay: 1600 },
    { command: 'status = "seeking_new_mission"', delay: 2000 },
  ],
  humanText: [
    "I'm an AI Developer passionate about building intelligent products that solve real-world problems.",
    "My focus is on AI agents, automation systems, Retrieval-Augmented Generation (RAG), and full-stack AI applications.",
    "I enjoy taking products from idea to production — combining software engineering, system design, AI engineering, and modern deployment practices.",
    "I don't just write code. I architect systems that think.",
  ],
  photo: "/assets/balraj-photo.jpg",
};

export const experienceData = [
  {
    id: "exp-001",
    period: "2026.04 — 2026.08",
    company: "Bharat Unnati AI Fellowship",
    role: "AI Fellow",
    isActive: false,
    mission:
      "Building AI-powered applications and autonomous workflows using modern AI technologies.",
    details: [
      "Selected for an intensive AI fellowship focused on Programming, Generative AI, and Agentic AI.",
      "Built AI-powered applications and autonomous workflows.",
      "Learned practical AI engineering, prompt engineering, and agent development.",
      "Collaborated on real-world AI projects and problem-solving initiatives.",
    ],
    systems: [
      "Generative AI",
      "Agentic AI",
      "Prompt Engineering",
      "AI Agent Development",
    ],
  },
  {
    id: "exp-002",
    period: "2025 — 2026",
    company: "SDLC with Zero Coding Program",
    role: "Product Development & SDLC Trainee",
    isActive: false,
    mission:
      "Learned the complete Software Development Life Cycle from concept to production deployment.",
    details: [
      "Practiced Requirement Gathering and Stakeholder Analysis.",
      "Created Business Requirement Specifications (BRS) and Software Requirement Specifications (SRS).",
      "Learned System Design, Architecture Design, and Database Design.",
      "Studied Testing, Quality Assurance, Deployment, and Product Maintenance.",
    ],
    systems: [
      "BRS",
      "SRS",
      "System Design",
      "Architecture",
      "Testing",
      "QA",
    ],
  },
];

export const projectsData = [
  {
    id: "mission-001",
    codename: "DECODA",
    title: "Decoda",
    subtitle: "AI-Powered Document Intelligence Platform",
    objective:
      "Enable users to upload documents and interact with them through natural language using RAG.",
    complexity: 85,
    status: "DEPLOYED",
    stack: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "ChromaDB",
      "SQLite",
      "Mistral AI",
      "LangSmith",
      "Render",
      "Vercel",
    ],
    highlights: [
      "Designed and implemented the complete system architecture.",
      "Built a RAG pipeline using embeddings and vector search.",
      "Developed scalable backend APIs using FastAPI.",
      "Built a responsive frontend using React and TypeScript.",
      "Integrated LLM-powered document understanding and retrieval.",
      "Deployed the full-stack application to production.",
    ],
    features: [
      "Document Upload & Processing",
      "Semantic Search",
      "AI-Powered Question Answering",
      "Retrieval-Augmented Generation (RAG)",
      "Vector-Based Knowledge Retrieval",
      "Production Deployment",
    ],
    links: {
      demo: "https://decoda-turo.vercel.app/dashboard",
      github: "https://github.com/Balraj-ai-automations/decoda",
    },
  },
  // ──────────────────────────────────────────────
  // ADD FUTURE PROJECTS BELOW — Copy the template:
  // ──────────────────────────────────────────────
  // {
  //   id: "mission-002",
  //   codename: "PROJECT_NAME",
  //   title: "Project Title",
  //   subtitle: "Short description",
  //   objective: "What problem it solves",
  //   complexity: 75,
  //   status: "DEPLOYED",
  //   stack: ["Tech1", "Tech2"],
  //   highlights: ["Highlight 1", "Highlight 2"],
  //   features: ["Feature 1", "Feature 2"],
  //   links: {
  //     demo: "https://...",
  //     github: "https://github.com/...",
  //   },
  // },
];

export const skillsData = [
  {
    module: "AI ENGINE",
    skills: [
      "Generative AI",
      "Agentic AI",
      "Prompt Engineering",
      "RAG",
      "Semantic Search",
      "Vector Databases",
      "AI Agent Development",
      "LLM Integration",
      "Multi-Model AI Workflows",
    ],
  },
  {
    module: "BACKEND CORE",
    skills: [
      "Python",
      "FastAPI",
      "REST APIs",
      "Authentication",
      "API Integration",
      "Backend Development",
    ],
  },
  {
    module: "FRONTEND DISPLAY",
    skills: ["React", "TypeScript", "HTML", "CSS"],
  },
  {
    module: "DATABASE",
    skills: ["SQLite", "ChromaDB", "Vector Databases"],
  },
  {
    module: "DEVOPS LAYER",
    skills: ["Git", "GitHub", "Render", "Vercel", "Production Deployment"],
  },
  {
    module: "ENGINEERING",
    skills: [
      "Requirement Gathering",
      "BRS",
      "SRS",
      "System Design",
      "Architecture Design",
      "Software Testing",
      "SDLC",
    ],
  },
];

export const credentialsData = {
  education: [
    {
      degree: "B.E. Electrical & Electronics Engineering",
      institution: "Dayananda Sagar Institute of Technology",
      year: "2026",
      university: "Visvesvaraya Technological University",
    },
  ],
  certifications: [
    {
      name: "Bharat Unnati AI Fellowship",
      issuer: "Learners Byte × ExpertPedia",
      year: "2026",
      image: "/assets/certificate-bharat-unnati.jpg",
    },
    // ADD FUTURE CERTIFICATIONS HERE:
    // {
    //   name: "Certificate Name",
    //   issuer: "Issuing Organization",
    //   year: "2026",
    //   image: "/assets/certificate-name.jpg",
    // },
  ],
};

export const contactData = {
  ports: [
    {
      id: "PORT_01",
      label: "GitHub",
      url: "https://github.com/Balraj-ai-automations",
      handle: "Balraj-ai-automations",
    },
    {
      id: "PORT_02",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/balraj-s-ai/",
      handle: "balraj-s-ai",
    },
    {
      id: "PORT_03",
      label: "Email",
      url: "mailto:balrajsrinivas03@gmail.com",
      handle: "balrajsrinivas03@gmail.com",
    },
    {
      id: "PORT_04",
      label: "Resume",
      url: "/assets/resume.pdf",
      handle: "DOWNLOAD .PDF",
      isDownload: true,
    },
  ],
};

export const interestsData = [
  "AI Agents",
  "Agentic Workflows",
  "Generative AI",
  "RAG",
  "Workflow Automation",
  "Intelligent Systems",
  "Full-Stack AI Applications",
  "AI Product Development",
];

export const careerGoal =
  "Aspiring AI Engineer focused on building AI agents, intelligent automation systems, and production-ready AI products. Interested in creating scalable solutions that combine software engineering with modern AI technologies.";
