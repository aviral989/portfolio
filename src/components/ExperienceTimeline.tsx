/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { EXPERIENCES } from "../types";
import { Briefcase, Calendar, MapPin, ChevronRight, BarChart2, Star } from "lucide-react";

export function ExperienceTimeline() {
  const [activeExpId, setActiveExpId] = useState<string>("mindtickle");

  const activeExp = EXPERIENCES.find((e) => e.id === activeExpId) || EXPERIENCES[0];

  return (
    <section id="experience" className="py-24 px-6 md:px-12 bg-titanium-dark border-t border-white/5 relative">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-apple-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center lg:text-left">
          <span className="text-apple-blue font-mono font-medium tracking-wider uppercase text-xs">
            Professional Chronicle
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mt-2 max-w-2xl">
            A Story-Driven Journey of Impact
          </h2>
          <p className="text-titanium-silver text-md mt-4 max-w-xl">
            A granular walkthrough of my key professional roles. Click on any chronology segment to reveal detailed case notes, metrics, and technical contributions.
          </p>
        </div>

        {/* Story Teller Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Side: Chronological Track (5 Columns) */}
          <div className="lg:col-span-5 relative flex flex-col justify-between">
            {/* Thread line backplane */}
            <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-white/5 pointer-events-none" />

            <div className="space-y-4 relative z-10 text-left">
              {EXPERIENCES.map((exp) => {
                const isActive = exp.id === activeExpId;

                return (
                  <button
                    key={exp.id}
                    id={`exp-tab-${exp.id}`}
                    onClick={() => setActiveExpId(exp.id)}
                    className="w-full flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 relative group text-left"
                  >
                    {/* Floating active outline */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTimelineGlow"
                        className="absolute inset-0 rounded-2xl bg-white/[0.015] border border-white/10 glow-blue z-0 pointer-events-none"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Timeline Node Point */}
                    <div
                      className={`relative z-10 w-4 h-4 rounded-full mt-1.5 border-4 transition-all duration-350 shrink-0 ${
                        isActive
                          ? "bg-apple-blue border-apple-blue-glow scale-125"
                          : "bg-[#060608] border-white/20 group-hover:border-white/50"
                      }`}
                    />

                    <div className="relative z-10 flex-1">
                      <div className="flex justify-between items-baseline">
                        <span className="text-[10px] font-mono text-zinc-500">{exp.period}</span>
                        {isActive && <span className="text-[9px] font-mono bg-apple-blue/15 text-apple-blue px-2 py-0.5 rounded-full font-bold">ACTIVE INSIGHT</span>}
                      </div>
                      <h4
                        className={`text-sm font-bold tracking-tight transition-colors ${
                          isActive ? "text-apple-blue" : "text-white group-hover:text-apple-blue"
                        }`}
                      >
                        {exp.company}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-0.5">{exp.role.split(" (")[0]}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Summary Banner */}
            <div className="glass-panel p-5 rounded-2xl text-left bg-white/[0.01] border-white/5 mt-8 lg:mt-0">
              <div className="flex items-center gap-2 mb-2">
                <Star className="text-apple-blue" size={16} />
                <span className="text-xs font-mono text-white font-bold uppercase tracking-wide">Summary statistics</span>
              </div>
              <p className="text-xs text-titanium-silver leading-relaxed">
                5+ years of production experience scaling React/Next infrastructures. Consistently drove customer acquisition indexes and halved render bottle-necks.
              </p>
            </div>
          </div>

          {/* Right Side: Immersive Case Folder Specs (7 Columns) */}
          <div className="lg:col-span-7 h-full">
            <div className="glass-panel rounded-3xl p-6 md:p-8 relative min-h-[500px] flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-apple-blue/5 rounded-full blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeExp.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="flex-1 flex flex-col justify-between"
                >
                  <div className="text-left">
                    {/* Meta Top Header */}
                    <div className="border-b border-white/5 pb-5 mb-6">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                          {activeExp.role}
                        </h3>
                        <span className="text-xs font-mono text-apple-blue font-bold tracking-wider">
                          {activeExp.period}
                        </span>
                      </div>

                      <div className="flex gap-4 items-center mt-3 text-xs text-titanium-silver font-mono">
                        <span className="flex items-center gap-1.5 text-zinc-400">
                          <Briefcase size={12} className="text-apple-blue" />
                          {activeExp.company}
                        </span>
                        <span className="font-zinc-600">•</span>
                        <span className="flex items-center gap-1.5 text-zinc-400">
                          <MapPin size={12} className="text-apple-blue" />
                          {activeExp.location}
                        </span>
                      </div>
                    </div>

                    {/* Bullet Chronicles list */}
                    <ul className="space-y-4">
                      {activeExp.description.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-titanium-silver leading-relaxed">
                          <span className="w-1.5 h-1.5 bg-apple-blue rounded-full mt-2 shrink-0 shadow-[0_0_6px_#0071e3]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills badges and quantified indexes footer */}
                  <div className="border-t border-white/5 pt-6 mt-8">
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                      {/* Left: skills tags */}
                      <div className="flex-1">
                        <span className="text-[10px] font-mono text-zinc-500 block mb-2.5">Key Core Enforcers</span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeExp.skills.map((skill) => (
                            <span
                              key={skill}
                              className="text-[10px] font-mono bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-zinc-300 hover:border-apple-blue/50 hover:text-apple-blue transition-colors cursor-default"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right: Quantified micro index stats */}
                      {activeExp.stats && activeExp.stats.length > 0 && (
                        <div className="flex gap-4 shrink-0 pl-4 border-l border-white/5 mt-4 sm:mt-0">
                          {activeExp.stats.map((stat) => (
                            <div key={stat.label} className="text-right">
                              <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider block">{stat.label}</span>
                              <span className="text-md font-bold font-mono text-apple-blue">{stat.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
