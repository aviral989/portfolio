/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { 
  Terminal, 
  Cpu, 
  Sparkles, 
  Layers, 
  Briefcase, 
  Download, 
  Play, 
  ArrowDownCircle, 
  Flame, 
  Compass,
  Code
} from "lucide-react";

import { HeroCanvas } from "./components/HeroCanvas";
import { CinematicScroll } from "./components/CinematicScroll";
import { MetricsShowcase } from "./components/MetricsShowcase";
import { FederationSandbox } from "./components/FederationSandbox";
import { SiliconChip } from "./components/SiliconChip";
import { ExperienceTimeline } from "./components/ExperienceTimeline";
import { MeduxLab } from "./components/MeduxLab";
import { AiTwin } from "./components/AiTwin";

export default function App() {
  const [activeTab, setActiveTab] = useState("hero");
  const [scrollY, setScrollY] = useState(0);

  // Tracks active navigation tabs based on user's scroll depth
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sections = ["hero", "metrics", "architecture", "skills", "experience", "medux-lab", "contact"];
      const current = sections.find((sect) => {
        const el = document.getElementById(sect);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) {
        setActiveTab(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-titanium-black text-[#f5f5f7] font-sans antialiased min-h-screen relative overflow-x-hidden selection:bg-apple-blue/30 selection:text-white">
      
      {/* Cinematic Perspective Scroll Indicator */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-apple-blue via-teal-400 to-amber-400 z-50 transition-all duration-300"
        style={{ width: `${Math.min(100, (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100)}%` }}
      />

      {/* Modern Translucent Navigation Header */}
      <header className="fixed top-4 inset-x-0 mx-auto w-[92%] max-w-5xl h-14 glass-panel rounded-full flex items-center justify-between px-6 z-40 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
        <a id="nav-logo" href="#hero" className="flex items-center gap-2 group">
          <span className="w-7 h-7 bg-white text-titanium-black rounded-full flex items-center justify-center font-extrabold text-[11px] font-sans shadow-md group-hover:bg-apple-blue group-hover:text-white transition-colors duration-300">
            AG
          </span>
          <div className="text-left leading-none">
            <span className="text-xs font-extrabold tracking-tight block text-white group-hover:text-apple-blue transition-colors">
              AVIRAL GUPTA
            </span>
            <span className="text-[8px] font-mono text-titanium-silver tracking-wider">
              SR. FE ARCHITECT
            </span>
          </div>
        </a>

        {/* Scroll link markers */}
        <nav className="hidden md:flex gap-0.5 text-[11px] font-mono font-medium">
          {[
            { id: "metrics", label: "BENCHMARK" },
            { id: "architecture", label: "ARCHITECTURE" },
            { id: "skills", label: "SILICON" },
            { id: "experience", label: "CHRONICLE" },
            { id: "medux-lab", label: "MEDUX" },
            { id: "contact", label: "CONSULT" }
          ].map((item) => (
            <a
              key={item.id}
              id={`nav-${item.id}`}
              href={`#${item.id}`}
              className={`px-3 py-1.5 rounded-full transition-all ${
                activeTab === item.id
                  ? "bg-white/5 border border-white/10 text-apple-blue font-bold tracking-tight shadow-sm"
                  : "text-titanium-silver hover:text-white border border-transparent"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA: Instant Compile / print resume */}
        <button
          id="cv-print-btn"
          onClick={handlePrint}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-mono font-bold bg-apple-blue text-white hover:bg-apple-blue/90 shadow transition-all scale-100 active:scale-95 cursor-pointer"
        >
          <Download size={12} />
          <span>PRINT CV</span>
        </button>
      </header>

      {/* Section 1: Immersive Intros & Cinematic Hero */}
      <section 
        id="hero" 
        className="relative min-h-screen flex flex-col justify-between items-center px-6 pt-32 pb-16 z-10 overflow-hidden"
      >
        <HeroCanvas />

        {/* Sub-header ticker representing his elite key descriptors */}
        <div className="relative z-10 p-0 text-center select-none pt-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.02] text-xs font-mono font-medium text-teal-400">
            <Flame size={12} className="text-amber-400 animate-pulse" />
            <span>EX-CTO & CO-FOUNDER</span>
            <span className="text-zinc-600">•</span>
            <span>Module Federation Specialist</span>
          </span>
        </div>

        {/* Main cinematic display titles */}
        <div className="relative z-10 text-center max-w-4xl px-2 my-auto select-text">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#0071e3] font-bold block mb-4">
            Apple Product Design Inspired Portfolio
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-none">
            Aviral Gupta
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-apple-blue to-purple-400 mt-3">
            Sr. Front-End Engineer
          </h2>
          
          <p className="text-sm md:text-base text-titanium-silver mt-6 max-w-xl mx-auto leading-relaxed font-sans">
            A seasoned front-end architect with 5+ years of remote capability. Expert in constructing micro-frontends with **Module Federation**, optimizing user active sessions (+280%), and reducing boilerplate engines.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <a
              id="hero-benchmarks"
              href="#metrics"
              className="px-6 py-3 bg-white text-black font-semibold text-xs font-sans rounded-full hover:bg-zinc-200 transition-all shadow-lg flex items-center gap-1.5"
            >
              <span>Inspect Benchmarks</span>
              <Compass size={14} />
            </a>
            <a
              id="hero-agent"
              href="#contact"
              className="px-6 py-3 border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04] text-white font-semibold text-xs font-sans rounded-full transition-all flex items-center gap-1.5"
            >
              <span>Sync with AI Twin</span>
              <Sparkles size={14} className="text-teal-400 animate-spin-slow" />
            </a>
          </div>
        </div>

        {/* Floating device grid previews under viewport */}
        <div className="relative z-10 w-full max-w-5xl mt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Active Session time", value: "x4.0 Growth", desc: "5m → 19m metrics", icon: Flame },
              { label: "Design Refresh Rating", value: "Fast Hydra", desc: "Modular state hooks", icon: Cpu },
              { label: "Technical Debt Reduction", value: "Cleared 50%", desc: "1 Quarter Turnaround", icon: Terminal },
              { label: "Fed Mount speed", value: "< 2.5ms", desc: "Dynamic Host Prefetches", icon: Layers }
            ].map((stat, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl border border-white/5 bg-[#0b0b0f]/60 backdrop-blur-md text-left"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wild">{stat.label}</span>
                  <stat.icon size={14} className="text-apple-blue" />
                </div>
                <h4 className="text-base font-bold text-white">{stat.value}</h4>
                <p className="text-[10px] text-zinc-400 mt-1">{stat.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12 animate-bounce">
            <ArrowDownCircle size={32} className="text-titanium-silver" />
          </div>
        </div>
      </section>

      {/* Cinematic Scroll transition based on iPhone landing page specs */}
      <CinematicScroll />

      {/* Section 2: Metrics Benchmark Speedometer */}
      <MetricsShowcase />

      {/* Section 3: Microfrontend Federation Sandbox Orchestrator */}
      <FederationSandbox />

      {/* Section 4: Silicon Chip Core Explorer */}
      <SiliconChip />

      {/* Section 5: Chronic Story Experience Path */}
      <ExperienceTimeline />

      {/* Section 6: Medux Code Optimizer Slider */}
      <MeduxLab />

      {/* Section 7: Final AI recruiter digital twin chat Contact form */}
      <AiTwin />

      {/* Printable Resume Formatter Viewport (Hidden unless printing) */}
      <div className="hidden print:block absolute inset-0 bg-white text-black p-10 font-serif text-left leading-normal text-sm select-text">
        <h1 className="text-3xl font-bold border-b-2 border-black pb-2">Aviral Gupta</h1>
        <p className="text-sm italic mt-1 font-sans">Sr. Front-end Engineer | aviralg989@gmail.com | (+91)-8319920695</p>

        <h2 className="text-xl font-bold mt-6 border-b border-black">Summary</h2>
        <p className="mt-2 text-justify">
          A proficient problem solver and seasoned Front-End Engineer, adept in analytical thinking and possessing strong interpersonal skills, with over 5+ years of hands-on experience in developing scalable and efficient front-end applications and effectively managing developers.
        </p>

        <h2 className="text-xl font-bold mt-6 border-b border-black">Skills</h2>
         <ul className="list-disc pl-5 mt-2 space-y-1 font-sans text-xs">
          <li><strong>Languages:</strong> JavaScript, TypeScript.</li>
          <li><strong>Libraries & Frameworks:</strong> ReactJS, Nextjs, Redux Saga, Context API.</li>
          <li><strong>Architecture:</strong> Module Federation, Micro-Frontends, Shell Architecture, design systems.</li>
          <li><strong>DevOps & Cloud:</strong> AWS CodeBuild, AWS Amplify, Route 53, Cloudflare Pages, Docker, Github Actions.</li>
          <li><strong>Testing:</strong> Cypress E2E, Unit tests.</li>
          <li><strong>APIs:</strong> GraphQL, RESTful APIs.</li>
        </ul>

        <h2 className="text-xl font-bold mt-6 border-b border-black">Experience</h2>
        <div className="mt-4">
          <h3 className="font-bold">Senior Developer (Mindtickle via Recro) | May 2024 - Present</h3>
          <ul className="list-disc pl-5 mt-1 space-y-1 text-xs">
            <li>Developed and integrated micro-frontends using Module Federation and shell architecture for scalable, modular applications.</li>
            <li>Maintained/enhanced shared design library components across platforms.</li>
            <li>Led major design refreshes, initiating UI/UX structural & typography updates.</li>
            <li>Built Medux, an internal wrapper over Redux-Saga decreasing boilerplate actions by 80%.</li>
          </ul>
        </div>

        <div className="mt-4">
          <h3 className="font-bold">CTO & Co-Founder (Vigyos) | June 2023 - March 2024</h3>
          <ul className="list-disc pl-5 mt-1 space-y-1 text-xs">
            <li>Constructed the Next.js frontend, increasing daily active user session metrics from 5 minutes to 19 minutes (+280%).</li>
            <li>Optimized Lighthouse ratings above 95/100 for all deployment streams.</li>
            <li>Deployed E2E testing using Cypress reducing production defects by 20%.</li>
          </ul>
        </div>

        <div className="mt-4">
          <h3 className="font-bold">Senior Software Developer (Procuzy) | Dec 2021 - June 2023</h3>
          <ul className="list-disc pl-5 mt-1 space-y-1 text-xs">
            <li>Cleared 50% technical debt and code smells inside a single quarter.</li>
            <li>Coached a team of 4 front-end engineers in code standards and CI/CD operations on AWS.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

