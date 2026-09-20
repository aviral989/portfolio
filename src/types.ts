/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  skills: string[];
  stats?: {
    label: string;
    value: string;
  }[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  company: string;
  description: string;
  details: string[];
  tech: string[];
  metrics?: { label: string; value: string }[];
}

export interface SkillCategory {
  id: string;
  name: string;
  iconName: string;
  skills: { name: string; level: number; info?: string }[];
}

export const EXPERIENCES: Experience[] = [
  {
    id: "mindtickle",
    role: "Senior Developer (Mindtickle)",
    company: "Recro",
    location: "Remote",
    period: "May 2024 - Present",
    description: [
      "Developed and integrated micro-frontends using Module Federation and shell architecture for scalable, modular enterprise applications.",
      "Maintained and enhanced key components inside the shared design library, ensuring 100% visual consistency and deep reusability across platforms.",
      "Led full-scale website design refreshes, initiating layout restructure, strict typography updates, and high-fidelity micro-interactions.",
      "Engineered optimized stateless React components, headless UI modules, and customized state-driven hooks to deliver clean, maintainable logic.",
      "Spearheaded common core navigation modules (header and footer) utilizing unified routing and federated entry coordination.",
      "Collaborated extensively with GraphQL APIs and REST services across distinct decoupled micro-services for optimal data query resolution.",
      "Created and optimized advanced AI prompts and workflows for code generation, decreasing developer boilerplate creation to a minimum."
    ],
    skills: ["Module Federation", "Micro Frontends", "ReactJS", "GraphQL", "AI Prompts", "Docker", "Redux Saga", "TypeScript"],
    stats: [
      { label: "Render Overhead", value: "-35%" },
      { label: "Component Replay Ratio", value: "98%" }
    ]
  },
  {
    id: "vigyos",
    role: "CTO & Co-Founder",
    company: "Vigyos",
    location: "Gwalior, Madhya Pradesh, IN",
    period: "June 2023 - March 2024",
    description: [
      "Built the frontend application from scratch using Next.js with scalable, structured code patterns to sustain high real-time traffic volumes.",
      "Increased average customer session time dramatically from 5 minutes to 19 minutes per day (+280%) through dynamic content preloaders and responsive interactions.",
      "Drove front-end innovation by exploring, benchmarking, and introducing modern React server features and streaming components.",
      "Maintained high performance and technical standards, keeping Google Lighthouse performance and accessibility scores above 95/100.",
      "Established fully automated playbooks for agile sprint planning using ClickUp, aligning design goals directly with engineering targets.",
      "Fostered product-led feedback loops, speaking directly with active enterprise users to iteratively decrease client churn.",
      "Constructed comprehensive Cypress end-to-end testing routines, reducing production bug occurrence rates by 20% overall."
    ],
    skills: ["NextJS", "Product Led Growth", "Lighthouse Tuning", "Agile Leadership", "Cypress E2E", "Webpack", "Sprint Management"],
    stats: [
      { label: "Customer Sessions", value: "5m → 19m (+280%)" },
      { label: "Production Bugs", value: "-20%" }
    ]
  },
  {
    id: "procuzy",
    role: "Senior Software Developer (Frontend)",
    company: "Procuzy",
    location: "Bangalore, Karnataka, IN",
    period: "December 2021 - June 2023",
    description: [
      "Orchestrated overall platform front-end architecture using a consolidated Design System and styled elements with ReactJS and Redux Saga.",
      "Devised a rigorous engineering audit path to clear technical debt and code smells, successfully cutting debt by 50% and boosting paint speeds in one single quarter.",
      "Managed, coached, and mentored a team of 4 front-end developers, focusing on continuous code integration, collective ownership, and standard formatting.",
      "Engineered scalable CI/CD pipelines utilizing AWS CodeBuild, AWS Amplify, Cloudflare Pages, and Amazon Route 53.",
      "Enforced rigorous security and testing guidelines, ensuring fully optimized bundle sizes with Webpack and Vite bundle analyzers."
    ],
    skills: ["ReactJS", "Redux Saga", "AWS CodeBuild", "AWS Amplify", "Cloudflare Pages", "Team Mentoring", "Webpack Tuning"],
    stats: [
      { label: "Tech Debt Reduction", value: "50%" },
      { label: "Page Paint (FCP)", value: "1.2s faster" }
    ]
  },
  {
    id: "xenonstack",
    role: "Front-end Engineer",
    company: "XenonStack",
    location: "Mohali, Punjab, IN",
    period: "September 2020 - December 2021",
    description: [
      "Developed high-fidelity, polished, and custom web dashboards for massive big-data visualizations using specialized chart engines (ApexCharts, Highcharts).",
      "Wrote comprehensive unit and regression testing routines for all novel interactive nodes, securing stable delivery of secure assets.",
      "Integrated secure RESTful micro-services, managing complex authentication states, persistent browser queues, and JSON payloads."
    ],
    skills: ["REST APIs", "ApexCharts", "Highcharts", "Unit Testing", "Big Data Dashboards", "UI Optimization"],
    stats: [
      { label: "Data Refresh Lag", value: "<150ms" },
      { label: "Test Coverage Range", value: "85%" }
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "performance-core",
    name: "Architectural Engine",
    iconName: "Cpu",
    skills: [
      { name: "ReactJS & Nextjs", level: 95, info: "Expert in hook lifecycles, server rendering, hydration states, and performance monitoring." },
      { name: "TypeScript / ESNext", level: 92, info: "Deep type safety, utility generics, declaration compilation, and modular code patterns." },
      { name: "Module Federation", level: 90, info: "Pioneered micro-frontend shells, dynamic remote mounting, and asynchronous asset mapping." },
      { name: "Redux Saga / Context", level: 88, info: "Saga patterns, side-effect supervisors, global memoization, and complex state lifecycles." }
    ]
  },
  {
    id: "neural-ai-core",
    name: "Neural & Intelligent Automation",
    iconName: "Sparkles",
    skills: [
      { name: "AI Prompts & Orchestrator", level: 90, info: "Creating and calibrating custom agent scripts, prompting models for zero-shot components, and formatting schemas." },
      { name: "Copilot & Claude integration", level: 94, info: "Utilizing advanced code-compiling LLMs to speed up developer velocities by up to 3x." },
      { name: "Docker & Containerization", level: 80, info: "Containerizing microfrontends, multi-stage pipelines, and reproducible environment declarations." }
    ]
  },
  {
    id: "cloud-devops-node",
    name: "Cloud & Delivery Systems",
    iconName: "Cloud",
    skills: [
      { name: "AWS Cloud Stack", level: 85, info: "Deploying and managing web containers with CodeBuild, cloud hosting via Amplify, domain control with Route 53." },
      { name: "Cloudflare & CDN Edges", level: 90, info: "Configuring Pages, geo-distribution, edge redirects, custom SSL certificates, and asset compression." },
      { name: "CI / CD Pipelines", level: 82, info: "Constructing automated GitHub Actions workflows, lint triggers, regression checklists, and instant blue-green updates." }
    ]
  },
  {
    id: "ux-polish-node",
    name: "Visual Precision & Interface",
    iconName: "Palette",
    skills: [
      { name: "Tailwind CSS & Scss", level: 95, info: "Writing structured custom layouts, utilities, responsive grid variations, and seamless transition states." },
      { name: "Framer Motion", level: 90, info: "Creating cinematic custom scroll animations, dynamic transforms, overlay transitions, and spring animations." },
      { name: "Lighthouse Audit Tuning", level: 92, info: "Maximizing FCP, LCP, CLS, semantic accessibility compliance, and structural meta-indexing of components." },
      { name: "Cypress & E2E Testing", level: 85, info: "Assembling stable browser UI automation suites, simulated click vectors, and performance validations." }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "medux",
    title: "Medux State Orchestrator",
    subtitle: "Internal Redux-Saga Reducer & Side-Effect Engine",
    company: "Recro",
    description: "Built an internal developer acceleration library representing an abstraction over standard Redux-Saga models. Successfully reduced boilerplate requirements by over 80% and helped engineers implement features with zero overhead.",
    details: [
      "Exposed a streamlined API mapping async actions automatically to distinct loading, success, and error nodes of a target reducer.",
      "Eliminated 100+ lines of duplicate action types, creators, and reducers for every new state-driven API endpoint.",
      "Implemented a lightweight Saga worker pool dispatcher with automatic timeout triggers and request deduplication protocols.",
      "Widely adopted inside the core product team, reducing front-end file modifications during standard API integrations from 6 files down to a single configuration entry."
    ],
    tech: ["TypeScript", "Redux Saga", "NPM Packager", "State Patterns"],
    metrics: [
      { label: "Boilerplate Reduction", value: "80%" },
      { label: "Integration Velocity", value: "5x Faster" }
    ]
  },
  {
    id: "federation-shell",
    title: "Enterprise Federated Shell",
    subtitle: "Dynamic Microfrontend Assembly Platform",
    company: "Mindtickle",
    description: "Architected a secure, robust web container utilizing Module Federation to merge multiple independent product streams directly into a seamless single-page experience.",
    details: [
      "Configured a shell host that orchestrates sandboxed mounting, routing intercepts, and unified state streaming.",
      "Mitigated visual flashes during dynamic module hydration via predictive static route prefetching.",
      "Enabled independent deployment cycles for four separate cross-functional engineering teams without requiring shell-container rebuilds.",
      "Constructed shared dependency mappings, preventing standard duplicate downloads of mega packages (React, React-Router, etc.)."
    ],
    tech: ["Webpack", "Module Federation", "React", "GraphQL", "Docker"],
    metrics: [
      { label: "Deploy Autonomy", value: "100%" },
      { label: "Page Load Time (TBT)", value: "-45%" }
    ]
  },
  {
    id: "vigyos-engine",
    title: "Vigyos High-Retention Core",
    subtitle: "Next.js Core Architecture & Speed Optimization",
    company: "Vigyos",
    description: "Led the full-scale greenfield development of Vigyos web platform. Focused strictly on high performance, server-side caching topologies, and pixel-perfect design systems.",
    details: [
      "Scaled up average customer session metrics from 5 minutes to 19 minutes per day, proving a massive boost in active user satisfaction.",
      "Configured hybrid static generation with reactive hydration to offer near-instant page transitions (<100ms FCP on broadband).",
      "Achieved stellar performance ratings above 98 on Lighthouse, satisfying modern web accessibility and layout-shift constraints.",
      "Secured zero high-priority post-release defects using high-coverage auto-tests via Cypress and Github actions."
    ],
    tech: ["NextJS", "Cypress E2E", "Lighthouse Tools", "Cloudflare Pages"],
    metrics: [
      { label: "Session Duration", value: "+280%" },
      { label: "SLA Uptime Rating", value: "99.99%" }
    ]
  }
];
