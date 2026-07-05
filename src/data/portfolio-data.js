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
    { command: 'dev.mode = "VIBE_CODER"', delay: 2000 },
    { command: 'status = "seeking_new_mission"', delay: 2400 },
  ],
  humanText: [
    "I'm an AI Developer passionate about building intelligent products that solve real-world problems.",
    "My focus is on AI agents, automation systems, Retrieval-Augmented Generation (RAG), and full-stack AI applications.",
    "I enjoy taking products from idea to production — combining software engineering, system design, AI engineering, and modern deployment practices.",
    "I don't just write code. I vibe with it — and architect systems that think.",
  ],
  photo: "/assets/balraj-photo.jpg",
};

export const experienceData = [
  {
    id: "exp-001",
    period: "2026.02 — 2026.05",
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
    company: "SDLC + AI",
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
    {
      name: "SDLC + AI",
      issuer: "ExpertPedia",
      year: "2026",
      image: "/assets/certificate-sdlc-ai.pdf",
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

export const heroTerminalsData = [
  {
    id: 1,
    title: "01. Project Init",
    commands: [
      { text: "mkdir ai-portfolio", type: "cmd" },
      { text: "cd ai-portfolio", type: "cmd" },
      { text: "code .", type: "cmd" },
      { text: "✓ Project initialized", type: "success" }
    ]
  },
  {
    id: 2,
    title: "02. Create Structure",
    commands: [
      { text: "tree -L 2", type: "cmd" },
      { text: "ai-portfolio/", type: "output" },
      { text: "├── app/", type: "output" },
      { text: "├── tests/", type: "output" },
      { text: "├── config/", type: "output" },
      { text: "├── .env", type: "output" },
      { text: "├── requirements.txt", type: "output" },
      { text: "└── README.md", type: "output" },
      { text: "✓ Folder structure created", type: "success" }
    ]
  },
  {
    id: 3,
    title: "03. Virtual Environment",
    commands: [
      { text: "python3 -m venv venv", type: "cmd" },
      { text: "source venv/bin/activate", type: "cmd" },
      { text: "python --version", type: "cmd", env: "(venv)" },
      { text: "Python 3.11.7", type: "output" },
      { text: "✓ Virtual environment ready", type: "success" }
    ]
  },
  {
    id: 4,
    title: "04. Install Dependencies",
    commands: [
      { text: "pip install -r requirements.txt", type: "cmd", env: "(venv)" },
      { text: "Collecting fastapi==0.104.1", type: "output" },
      { text: "Collecting uvicorn==0.24.0", type: "output" },
      { text: "Collecting langchain==0.1.16", type: "output" },
      { text: "Collecting langgraph==0.2.34", type: "output" },
      { text: "Collecting mistralai==2.5.0", type: "output" },
      { text: "Collecting supabase==2.4.1", type: "output" },
      { text: "Collecting python-dotenv==1.0.0", type: "output" },
      { text: "Collecting pydantic==2.5.3", type: "output" },
      { text: "✓ All dependencies installed", type: "success" }
    ]
  },
  {
    id: 5,
    title: "05. Environment Config",
    commands: [
      { text: "cat .env", type: "cmd", env: "(venv)" },
      { text: "SUPABASE_URL=****************", type: "output" },
      { text: "SUPABASE_KEY=****************", type: "output" },
      { text: "MISTRAL_API_KEY=*************", type: "output" },
      { text: "HUGGINGFACE_TOKEN=***********", type: "output" },
      { text: "✓ Environment variables loaded", type: "success" }
    ]
  },
  {
    id: 6,
    title: "06. Run Backend",
    commands: [
      { text: "uvicorn app.main:app --reload", type: "cmd", env: "(venv)" },
      { text: "INFO: Uvicorn running on http://127.0.0.1:8000", type: "output" },
      { text: "INFO: Started reloader process", type: "output" },
      { text: "INFO: Application startup complete.", type: "output" },
      { text: "✓ Backend is running", type: "success" }
    ]
  },
  {
    id: 7,
    title: "07. Run Tests",
    commands: [
      { text: "pytest", type: "cmd", env: "(venv)" },
      { text: "================ test session starts ================", type: "output" },
      { text: "collected 24 items", type: "output" },
      { text: "........................ [100%]", type: "output" },
      { text: "================ 24 passed in 1.28s =================", type: "output" },
      { text: "✓ All tests passed", type: "success" }
    ]
  },
  {
    id: 8,
    title: "08. Git Init & Commit",
    commands: [
      { text: "git init", type: "cmd" },
      { text: "git add .", type: "cmd" },
      { text: 'git commit -m "Initial commit"', type: "cmd" },
      { text: "[main (root-commit) ab12c3d] Initial commit", type: "output" },
      { text: "27 files changed, 1024 insertions(+)", type: "output" },
      { text: "✓ Code committed", type: "success" }
    ]
  },
  {
    id: 9,
    title: "09. Push to GitHub",
    commands: [
      { text: "git branch -M main", type: "cmd" },
      { text: "git remote add origin github.com/balraj/ai-portfolio.git", type: "cmd" },
      { text: "git push -u origin main", type: "cmd" },
      { text: "Enumerating objects: 27, done.", type: "output" },
      { text: "Counting objects: 100% (27/27), done.", type: "output" },
      { text: "Writing objects: 100%", type: "output" },
      { text: "✓ Pushed to GitHub", type: "success" }
    ]
  },
  {
    id: 10,
    title: "10. Build Project",
    commands: [
      { text: "npm run build", type: "cmd" },
      { text: "> build", type: "output" },
      { text: "> vite build", type: "output" },
      { text: "vite v5.0.0 building for production...", type: "output" },
      { text: "✓ 132 modules transformed.", type: "output" },
      { text: "dist/index.html", type: "output" },
      { text: "dist/assets/index-8f3d.js", type: "output" },
      { text: "✓ Build completed", type: "success" }
    ]
  },
  {
    id: 11,
    title: "11. Deploy to Production",
    commands: [
      { text: "vercel --prod", type: "cmd" },
      { text: "Vercel CLI", type: "output" },
      { text: "Deploying to production...", type: "output" },
      { text: "Uploading [==========] 100%", type: "output" },
      { text: "Production: balu-ai-portfolio.vercel.app", type: "link", url: "https://balu-ai-portfolio.vercel.app" },
      { text: "✓ Deployment successful", type: "success" },
      { text: "✓ Project is LIVE", type: "success" }
    ]
  },
  {
    id: 12,
    title: "12. Final Status",
    commands: [
      { text: "SUCCESS", type: "ascii" },
      { text: "✓ Build completed", type: "success" },
      { text: "✓ Tests passed", type: "success" },
      { text: "✓ Pushed to main", type: "success" },
      { text: "✓ Production deployed", type: "success" },
      { text: "STATUS: ONLINE", type: "status" }
    ]
  }
];
