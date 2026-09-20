/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, Sparkles, User, HelpCircle, Mail, Linkedin, Phone } from "lucide-react";

interface ChatMessage {
  sender: "user" | "ai";
  text: string;
}

const FAQ_REPLIES: Record<string, string> = {
  stack: `My primary technical engine runs on **TypeScript, React, and Next.js**. I specialize in constructing complex, scalable single-page and server-side applications, utilizing optimized State managers (Redux Saga, Context API) and structural design configurations (Module Federation, Headless UI).`,
  session: `At Vigyos, where I served as CTO & Co-Founder, I spearheaded client-side performance engineering. By implementing predictive pre-loading architectures, fine-tuning first-paint metrics under Lighthouse, and introducing responsive hydration states, we expanded customer retention metrics from **5 minutes to 19 minutes daily** (+280%).`,
  federation: `Inside Mindtickle (Recro), I designed and consolidated multiple front-end systems into a cohesive application shell using **Module Federation**. This allowed divergent engineering nodes to deploy their features independently without triggering whole-application re-builds, and cut render overhead by 35%.`,
  remote: `Yes! I have over **5+ years of remote-first experience**, facilitating agile sprint parameters on ClickUp/Notion, conducting thorough PR audits, and coordinating with back-end/UX coordinates securely. I am completely aligned with both remote and hybrid structures.`,
  prompts: `I am highly efficient in integrating AI modules into development workflows. I author and optimize customized prompts for code compilations and automated E2E test builders. This speeds up boilerplate generation and reduces standard code smells before production reviews.`
};

const SUGGESTIONS = [
  { id: "stack", label: "Core Tech Stack" },
  { id: "session", label: "Boost Session to 19m" },
  { id: "federation", label: "Module Federation" },
  { id: "remote", label: "Remote Availability" },
  { id: "prompts", label: "AI Prompt Optimization" }
];

const parseInlineStyling = (line: string): ReactNode[] | string => {
  const parts: ReactNode[] = [];
  let remaining = line;
  let keyIdx = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.*?)\*\*/);
    const linkMatch = remaining.match(/\[(.*?)\]\((.*?)\)/);

    let isBoldFirst = false;
    let isLinkFirst = false;

    if (boldMatch && linkMatch) {
      if (boldMatch.index! < linkMatch.index!) {
        isBoldFirst = true;
      } else {
        isLinkFirst = true;
      }
    } else if (boldMatch) {
      isBoldFirst = true;
    } else if (linkMatch) {
      isLinkFirst = true;
    }

    if (isBoldFirst && boldMatch) {
      const startIdx = boldMatch.index!;
      if (startIdx > 0) {
        parts.push(remaining.substring(0, startIdx));
      }
      parts.push(
        <strong key={`bold-${keyIdx++}`} className="font-bold text-white">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.substring(startIdx + boldMatch[0].length);
    } else if (isLinkFirst && linkMatch) {
      const startIdx = linkMatch.index!;
      if (startIdx > 0) {
        parts.push(remaining.substring(0, startIdx));
      }
      parts.push(
        <a
          key={`link-${keyIdx++}`}
          href={linkMatch[2]}
          target="_blank"
          rel="noreferrer noopener"
          className="text-apple-blue underline hover:text-blue-400 transition-colors"
        >
          {linkMatch[1]}
        </a>
      );
      remaining = remaining.substring(startIdx + linkMatch[0].length);
    } else {
      parts.push(remaining);
      break;
    }
  }

  return parts.length > 0 ? parts : line;
};

const renderFormattedText = (text: string) => {
  if (!text) return null;

  const lines = text.split("\n");
  let inList = false;
  const listItems: ReactNode[] = [];
  const result: ReactNode[] = [];
  let keyCounter = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      result.push(
        <ul key={`list-${keyCounter++}`} className="list-disc pl-5 my-2 space-y-1.5 text-left">
          {[...listItems]}
        </ul>
      );
      listItems.length = 0;
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      inList = false;
      return;
    }

    const isListItem = trimmed.startsWith("- ") || trimmed.startsWith("* ");
    if (isListItem) {
      inList = true;
      const content = trimmed.substring(2);
      listItems.push(
        <li key={`li-${keyCounter++}`} className="text-xs text-zinc-300 leading-relaxed font-sans">
          {parseInlineStyling(content)}
        </li>
      );
    } else {
      flushList();
      inList = false;
      result.push(
        <p key={`p-${keyCounter++}`} className="text-xs text-zinc-200 leading-relaxed font-sans my-2 select-text">
          {parseInlineStyling(line)}
        </p>
      );
    }
  });

  flushList();
  return result;
};

export function AiTwin() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "ai",
      text: "Hi there! I am Aviral's Digital Twin, preloaded with his complete engineering background. Ask me anything about his projects, experience, or skills!"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleQuery = async (queryId: string, customText?: string) => {
    let queryText = customText || "";
    if (!queryText && queryId) {
      if (queryId === "stack") queryText = "What is your core tech stack?";
      else if (queryId === "session") queryText = "How did you boost customer sessions to 19 minutes?";
      else if (queryId === "federation") queryText = "Explain your Module Federation experience.";
      else if (queryId === "remote") queryText = "Are you available for remote work?";
      else if (queryId === "prompts") queryText = "How do you optimize AI workflows and prompts?";
      else {
        queryText = SUGGESTIONS.find((s) => s.id === queryId)?.label || "";
      }
    }
    
    if (!queryText) return;

    // Add user question to the thread
    const newMessages = [...messages, { sender: "user", text: queryText } as ChatMessage];
    setMessages(newMessages);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: queryText,
          history: messages // pass existing conversation history for context awareness
        })
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with AI server");
      }

      const data = await response.json();
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
    } catch (error) {
      console.error("Chat communication API error:", error);
      
      // Smart offline / fallback handler
      let fallbackReply = `Though I had an issue connecting to the live neural engine, I am preloaded with Aviral's records! He has 5+ years of Senior Frontend experience. Ask me about: 'tech stack', 'boosting sessions to 19 minutes', 'Module Federation', or 'remote availability'!`;
      
      const lower = queryText.toLowerCase();
      if (lower.includes("stack") || lower.includes("tech") || lower.includes("skill") || lower.includes("language")) {
        fallbackReply = FAQ_REPLIES.stack;
      } else if (lower.includes("session") || lower.includes("vigyos") || lower.includes("19") || lower.includes("retention")) {
        fallbackReply = FAQ_REPLIES.session;
      } else if (lower.includes("federat") || lower.includes("micro") || lower.includes("mindtickle")) {
        fallbackReply = FAQ_REPLIES.federation;
      } else if (lower.includes("remote") || lower.includes("where") || lower.includes("gwalior") || lower.includes("location") || lower.includes("avail")) {
        fallbackReply = FAQ_REPLIES.remote;
      } else if (lower.includes("prompt") || lower.includes("ai") || lower.includes("copilot") || lower.includes("claude")) {
        fallbackReply = FAQ_REPLIES.prompts;
      }

      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { sender: "ai", text: fallbackReply }]);
      }, 600);
    }
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const typedText = inputText.trim();
    setInputText("");

    handleQuery("", typedText);
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-titanium-dark border-t border-white/5 relative">
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-apple-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Column A: Contact coordinates (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left space-y-8">
            <div>
              <span className="text-apple-blue font-mono font-medium tracking-wider uppercase text-xs">
                Direct Communication
              </span>
              <h2 className="text-4xl font-bold tracking-tight text-white mt-2">
                Let's Shape the Future Together
              </h2>
              <p className="text-titanium-silver text-md mt-4 leading-relaxed">
                Whether you need a senior architect to construct modular micro-frontends, a performance champion to boost user retention metrics, or an engineering leader, I am ready to sync.
              </p>
            </div>

            {/* Direct Contact links */}
            <div className="space-y-4">
              <a
                id="contact-email"
                href="mailto:aviralg989@gmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl bg-titanium-gray/30 border border-white/5 hover:border-apple-blue/40 hover:bg-titanium-gray/50 transition-all group"
              >
                <div className="p-3 bg-apple-blue/15 border border-apple-blue/20 rounded-xl text-apple-blue group-hover:bg-apple-blue group-hover:text-white transition-all">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 block uppercase font-bold">Email address</span>
                  <span className="text-sm text-white font-medium group-hover:text-apple-blue transition-colors">
                    aviralg989@gmail.com
                  </span>
                </div>
              </a>

              <a
                id="contact-linkedin"
                href="https://www.linkedin.com/in/aviral-gupta-24b568160"
                target="_blank"
                rel="noreferrer referrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-titanium-gray/30 border border-white/5 hover:border-apple-blue/40 hover:bg-titanium-gray/50 transition-all group"
              >
                <div className="p-3 bg-apple-blue/15 border border-apple-blue/20 rounded-xl text-apple-blue group-hover:bg-apple-blue group-hover:text-white transition-all">
                  <Linkedin size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 block uppercase font-bold">LinkedIn profile</span>
                  <span className="text-sm text-white font-medium group-hover:text-apple-blue transition-colors">
                    linkedin.com/in/aviral-gupta
                  </span>
                </div>
              </a>

              <a
                id="contact-phone"
                href="tel:+918319920695"
                className="flex items-center gap-4 p-4 rounded-2xl bg-titanium-gray/30 border border-white/5 hover:border-apple-blue/40 hover:bg-titanium-gray/50 transition-all group"
              >
                <div className="p-3 bg-apple-blue/15 border border-apple-blue/20 rounded-xl text-apple-blue group-hover:bg-apple-blue group-hover:text-white transition-all">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 block uppercase font-bold">Mobile contact</span>
                  <span className="text-sm text-white font-medium group-hover:text-apple-blue transition-colors">
                    (+91)-8319920695
                  </span>
                </div>
              </a>
            </div>

            <div className="text-zinc-600 text-[10px] font-mono">
              © {new Date().getFullYear()} Aviral Gupta. All rights secured. Hand-crafted using React.
            </div>
          </div>

          {/* Column B: AI recruiter chatbot representation (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col h-full min-h-[500px]">
            <div className="glass-panel rounded-[32px] p-5 flex flex-col justify-between overflow-hidden relative flex-1">
              
              {/* Chat Window Header */}
              <div className="flex justify-between items-center bg-[#07070a]/60 border border-white/5 p-3 rounded-2xl mb-4">
                <div className="flex items-center gap-3 text-left">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-apple-blue flex items-center justify-center font-bold font-sans text-white border border-white/10 shadow-lg">
                      AG
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-titanium-dark rounded-full" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-tight">Aviral Gupta</h4>
                    <span className="text-[10px] font-mono text-[#0071e3] font-bold uppercase tracking-wider flex items-center gap-1">
                      <Sparkles size={10} /> AI Digital Twin Active
                    </span>
                  </div>
                </div>

                <span className="text-[9px] font-mono text-zinc-500 uppercase">SYSTEM MATRIX</span>
              </div>

              {/* Chat Message Buffer */}
              <div className="flex-1 bg-[#030305]/60 border border-white/5 rounded-2xl p-4 overflow-y-auto h-72 space-y-4 mb-4 select-text">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"} text-left`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-4.5 text-xs tracking-wide leading-relaxed font-sans ${
                        m.sender === "user"
                          ? "bg-apple-blue text-white rounded-br-none"
                          : "bg-titanium-gray/80 border border-white/5 text-zinc-200 rounded-bl-none"
                      }`}
                    >
                      {m.sender === "user" ? (
                        <span className="whitespace-pre-wrap">{m.text}</span>
                      ) : (
                        <div className="space-y-1">{renderFormattedText(m.text)}</div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start text-left">
                    <div className="bg-titanium-gray/80 border border-white/5 text-zinc-400 rounded-2xl rounded-bl-none p-3 text-xs font-mono flex items-center gap-2">
                      <span className="block w-2 h-2 bg-apple-blue rounded-full animate-bounce" />
                      <span className="block w-2 h-2 bg-apple-blue rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="block w-2 h-2 bg-apple-blue rounded-full animate-bounce [animation-delay:0.4s]" />
                      <span>Syncing nodes...</span>
                    </div>
                  </div>
                )}
                
                <div ref={chatEndRef} />
              </div>

              {/* Quick Suggestion Tags */}
              <div className="mb-4 text-left">
                <span className="text-[9px] font-mono text-zinc-500 block mb-2">QUICK DIAGNOSTIC INQUIRIES</span>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTIONS.map((tag) => (
                    <button
                      key={tag.id}
                      id={`chat-tag-${tag.id}`}
                      onClick={() => handleQuery(tag.id)}
                      className="text-[10px] font-mono bg-white/5 border border-white/10 px-2.5 py-1.5 rounded-full text-zinc-400 hover:border-apple-blue hover:text-white hover:bg-apple-blue/5 transition-all"
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input Field Controls */}
              <div className="flex gap-2.5">
                <input
                  type="text"
                  id="chat-input-text"
                  placeholder="Type a custom query (e.g. 'What is your remote policy?')"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                  className="flex-1 bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-apple-blue transition-colors"
                />
                <button
                  id="chat-send-btn"
                  onClick={handleSend}
                  className="px-4 bg-apple-blue text-white rounded-xl hover:bg-apple-blue/90 transition-colors flex items-center justify-center"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
