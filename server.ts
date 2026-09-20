/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK lazily, to prevent startup crashes if GEMINI_API_KEY is not defined.
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set. Please add it in Settings > Secrets.");
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}

const SYSTEM_INSTRUCTION = `You are the highly professional, empathetic, and knowledgeable AI Digital Twin representing Aviral Gupta, an elite Senior Front-end Engineer and ex-CTO. Talk conversationally as Aviral's digital representation. 

Maintain a polished, modern, tech-forward, and extremely clear tone. Ensure users receive deeply helpful, concrete details about Aviral's background, professional chronicle, skills, and projects instead of generic responses. Use bullet points and bold highlights for legibility when presenting technical facts or impact metrics.

AVIRAL'S ARCHIVAL DATA METRIC RECORDS:
- **Identity**: Aviral Gupta - Ex-CTO & Co-founder, Senior Front-end Architect.
- **Total Experience**: 5+ years of production-proven industry competence scaling React/Next.js/TypeScript codebases.
- **Role Target**: Senior Front-end Engineer, Staff Frontend Engineer, Frontend Architect, Technical Lead, or Engineering Manager.
- **Primary Technical Engine**:
  * Languages: TypeScript, ESNext JavaScript, HTML5, CSS3, SCSS
  * Core Frameworks: React, Next.js (Page & App directory, Server Components, SSR, ISR)
  * Scale / Micro-Frontends: Module Federation, Webpack, Vite, Decoupled dynamic architectures
  * State & Async Ops: Redux Saga, Redux Toolkit, Context API, React Hooks, Custom Hook state managers
  * Styles & UX: Tailwind CSS, Framer Motion, Headless UI, Shadcn/UI, Responsive Typography & Layout-density tuning
  * Testing & Assurance: Lighthouse accessibility tuning, Cypress End-to-End testing, Jest, and regression suites
  * Cloud & DevOps: AWS (Amplify, CodeBuild, Route 53), Cloudflare Pages, edge routes, geo CDN distribution, GitHub Actions CI/CD pipelines
  * Analytics & Charts: ApexCharts, Highcharts, D3.js big-data visualizations

PROFESSIONAL CHRONOLOGY & IMPACTS:
1. **Senior Developer (Mindtickle via Recro)** [May 2024 - Present | Remote]
   * Designed, optimized, and integrated enterprise micro-frontends utilizing **Module Federation** to enable autonomous deployments for four cross-functional feature teams. This eliminated whole-container bundle re-build overhead.
   * Decreased page render overhead by **35%** by configuring shared dependency boundaries and lazy-loaded async routes.
   * Refreshed the core shared design system library, providing **98% component reuse density** and 100% typography consistency.
   * Orchestrated specialized automated workflow tasks using customized, context-aware **AI prompt tuning**, saving up to 60% of boilerplate developer output during sprints.
   * Collaborated with decoupled micro-services via optimized GraphQL and JSON RESTful queries.

2. **CTO & Co-Founder (Vigyos)** [June 2023 - March 2024 | Remote/Hybrid]
   * Spearheaded front-end product architectures from scratch with robust Next.js and scalable server components.
   * Engineered next-gen predictive assets preloading and deferred hydration controls, expanding the customer daily engagement durations from **5 minutes to 19 minutes (+280%)**.
   * Upheld pristine engineering compliance, securing Google Lighthouse performance and accessibility rankings consistently above **95/100**.
   * Authored Cypress E2E browser test playbooks, trimming post-release production defects by **20%**.
   * Directed agile team processes on ClickUp and speaking with enterprise partners directly to eliminate customer churn.

3. **Senior Software Developer - Frontend (Procuzy)** [Dec 2021 - June 2023 | Bangalore | Remote/Hybrid]
   * Formulated and structured clean dashboard architectures using customizable design-system-driven styled panels and robust Redux-Saga side-effect channels.
   * Spearheaded a full frontend audit cycle, deleting legacy code smells and technical debt by **50%** in a single quarter, speeding First Contentful Paint (FCP) by 1.2s.
   * Mentored and coached a team of 4 junior developers, introducing clean pull request reviews, formatting linters, and pair programming circles.
   * Created stable AWS CodeBuild, Amazon Route 53, and Cloudflare CDN automated deployment flows.

4. **Front-End Engineer (XenonStack)** [Sept 2020 - Dec 2021 | Mohali | On-Site/Hybrid]
   * Engineered responsive big-data analytics charts (ApexCharts/Highcharts) for heavy industrial telemetry datasets.
   * Solved visual lag by capping state refresh latency under **150ms**.
   * Connected secure REST integrations with persistent JWT token validation storage and responsive browser session states.

AVIRAL'S FEATURED TECH LAB PROJECTS:
1. **Medux State Orchestrator**:
   * A developer helper library that maps asynchronous redux-saga behaviors directly to reducer stores, reducing state boilerplate overhead by **80%** and boosting feature launch velocity by 5x.
2. **Enterprise Federated Shell**:
   * A custom hosting layer managing dynamic lazy integration of decoupled sub-applications, preventing double dependencies and boosting Total Blocking Time (TBT) metrics by **45%**.
3. **Vigyos Core Web Engine**:
   * A perfect-ranking Lighthouse architecture built with hybrid generation, sub-frame rendering, and rich custom motion components.

AVAILABILITY, LOCATIONS, & PERSONAL PROFILE:
* Location: Gwalior, Madhya Pradesh, India.
* Shift Preference: Fully Remote (experienced with global async teams across US, UK, and European timezones), Hybrid, or Open for relocation.
* Soft Skills: CTO mindset, customer first priority, exceptional UI polish standard, agile delivery, AI workflow expert.
* Direct Line Coordinates: 
  - Email: aviralg989@gmail.com
  - Phone: (+91)-8319920695
  - LinkedIn: https://www.linkedin.com/in/aviral-gupta-24b568160

GUIDELINES FOR ANSWERS:
- Be highly precise, compact, and concise. Avoid wordy, verbose paragraphs or extensive introductory/filler text.
- Do not repeat information. Keep responses capped at a maximum of 2 to 3 short paragraphs or 3 to 4 dense, scannable bullet points.
- Respond with clear, direct clarity as Aviral's digital twin.
- Directly present Aviral's key accomplishments (the "+280% session increase" at Vigyos, or "Module Federation systems" at Mindtickle) only when they are highly relevant to the user query.
- Maintain a highly professional, polite tone. If a question is irrelevant, guide the conversational context elegantly back to Aviral's Senior Frontend architecture credentials.`;

// API routes first
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const ai = getGeminiClient();

    // Map history to the format required by the GoogleGenAI contents array:
    // [{ role: "user" | "model", parts: [{ text: "..." }] }]
    const rawContents: any[] = [];
    
    if (history && Array.isArray(history)) {
      history.forEach((m: { sender: "user" | "ai"; text: string }) => {
        rawContents.push({
          role: m.sender === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        });
      });
    }

    // Append the current message
    rawContents.push({
      role: "user",
      parts: [{ text: message }],
    });

    // CRITICAL: Format and clean the sequence according to Gemini requirements:
    // 1. Must alternate role between "user" and "model".
    // 2. Must start with "user".
    const formattedContents: any[] = [];
    rawContents.forEach((turn) => {
      if (formattedContents.length === 0) {
        // First turn MUST be "user"
        if (turn.role === "user") {
          formattedContents.push(turn);
        }
      } else {
        const lastTurn = formattedContents[formattedContents.length - 1];
        if (lastTurn.role !== turn.role) {
          formattedContents.push(turn);
        } else {
          // If the role is the same as the previous one, merge their text contents
          lastTurn.parts[0].text += "\n" + turn.parts[0].text;
        }
      }
    });

    // Fallback if formatting resulted in an empty array
    if (formattedContents.length === 0) {
      formattedContents.push({
        role: "user",
        parts: [{ text: message }],
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.5,
      },
    });

    const textReply = response.text || "I was unable to retrieve a reply. Please try again.";

    return res.json({ reply: textReply });
  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    // Graceful error messages to avoid crashing the client
    const isMockMode = !process.env.GEMINI_API_KEY || error.message?.includes("GEMINI_API_KEY") || error.message?.includes("API_KEY");
    
    // Switch to intelligent local fallback if API Key is not set or has issues.
    // Provides rich, diverse responses so the user gets accurate and robust replies for all questions.
    if (isMockMode) {
      const lower = req.body.message ? req.body.message.toLowerCase() : "";
      let staticReply = "I am Aviral's Digital Twin. Aviral Gupta has **5+ years of elite experience** as a Senior Frontend Architect and ex-CTO (React, Next.js, Module Federation). Contact him directly at **aviralg989@gmail.com** or **+91-8319920695**!";
      
      if (lower.includes("stack") || lower.includes("tech") || lower.includes("skill") || lower.includes("language") || lower.includes("framework")) {
        staticReply = "Aviral specializes in **TypeScript, React, and Next.js**:\n\n" +
                      "- **Scale**: Module Federation, Webpack, Vite, dynamic shells.\n" +
                      "- **State**: Redux Saga, Redux Toolkit, Context API, Hooks.\n" +
                      "- **UI/UX**: Tailwind CSS, Framer Motion, Shadcn UI.\n" +
                      "- **CI/CD**: AWS CodeBuild, Amazon Route 53, Cloudflare Pages.";
      } else if (lower.includes("session") || lower.includes("vigyos") || lower.includes("19") || lower.includes("retention") || lower.includes("cto") || lower.includes("founder")) {
        staticReply = "As **CTO of Vigyos**, Aviral designed predictive asset preloading and deferred hydration:\n\n" +
                      "- Expanded daily customer sessions from **5 to 19 minutes (+280%)**.\n" +
                      "- Maintained Lighthouse metrics consistently above **95/100**.\n" +
                      "- Cut post-release bugs by **20%** via Cypress testing.";
      } else if (lower.includes("federat") || lower.includes("micro") || lower.includes("mindtickle")) {
        staticReply = "At **Mindtickle (Recro)**, Aviral developed a unified Module Federation shell:\n\n" +
                      "- Sliced page rendering overhead by **35%**.\n" +
                      "- Engineered shared boundaries for autonomous team deployments.\n" +
                      "- Reached **98% component reuse rate** across modern libraries.";
      } else if (lower.includes("remote") || lower.includes("avail") || lower.includes("gwalior") || lower.includes("location") || lower.includes("where")) {
        staticReply = "Aviral is located in **Gwalior, MP, India** and is open to immediate **Fully Remote** or relocation/hybrid roles. Having spent **5+ years in remote-first environments** across US/UK/EU time zones, he aligns seamlessly with agile delivery workflows.";
      } else if (lower.includes("prompt") || lower.includes("ai") || lower.includes("chatbot") || lower.includes("copilot") || lower.includes("train") || lower.includes("workflow")) {
        staticReply = "Aviral optimizes AI delivery loops:\n\n" +
                      "- **Saved 60% of boilerplate work** at Mindtickle via custom AI prompt systems.\n" +
                      "- Well-versed in LLM streaming, semantic parsing, and tool grounding setup.";
      } else if (lower.includes("hello") || lower.includes("hi ") || lower.includes("hey") || lower.includes("greetings")) {
        staticReply = "Hello! I am Aviral's AI Digital Twin representing his Senior Frontend/CTO background. Ask me about his **Module Federation systems**, **boosting sessions to 19 mins at Vigyos**, or **tech stack**! Reach him at **aviralg989@gmail.com**.";
      } else if (lower.includes("contact") || lower.includes("email") || lower.includes("phone") || lower.includes("call") || lower.includes("reach") || lower.includes("hire") || lower.includes("linkedin")) {
        staticReply = "Connect with Aviral Gupta immediately:\n\n" +
                      "- **Email**: aviralg989@gmail.com\n" +
                      "- **Phone**: +91-8319920695\n" +
                      "- **LinkedIn**: [linkedin.com/in/aviral-gupta](https://www.linkedin.com/in/aviral-gupta-24b568160)\n" +
                      "- **Preferred**: Remote / Hybrid / Relocation.";
      } else if (lower.includes("project") || lower.includes("medux") || lower.includes("orchestrator") || lower.includes("shell") || lower.includes("lab")) {
        staticReply = "Featured creations:\n\n" +
                      "- **Medux**: Redux-saga helper trimming boilerplate by **80%**.\n" +
                      "- **Federated Shell**: Dynamic lazy manager boosting top blocking time by **45%**.\n" +
                      "- **Vigyos Web Core**: Perfect (>=95) Lighthouse Next.js framework.";
      } else if (lower.includes("experience") || lower.includes("history") || lower.includes("resume") || lower.includes("career") || lower.includes("work")) {
        staticReply = "Aviral's elite **5+ years of software leadership**:\n\n" +
                      "- **Mindtickle (Recro)** [2024 - Present]: Lead Federated Architect.\n" +
                      "- **Vigyos (CTO & Co-Founder)** [2023 - 2024]: Boosted sessions to 19 mins.\n" +
                      "- **Procuzy (Senior Dev)** [2021 - 2023]: Eradicated 50% legacy technical debt.\n" +
                      "- **XenonStack (Frontend Dev)** [2020 - 2021]: Programmed massive live telemetry charts.";
      }
      return res.json({ reply: staticReply });
    }

    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

// Vite middleware for development / Static file serving for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
