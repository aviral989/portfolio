/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SKILL_CATEGORIES, SkillCategory } from "../types";
import { Cpu, Sparkles, Cloud, Palette, Terminal, Zap } from "lucide-react";

export function SiliconChip() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("performance-core");

  const selectedCategory =
    SKILL_CATEGORIES.find((cat) => cat.id === selectedCategoryId) || SKILL_CATEGORIES[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Cpu":
        return Cpu;
      case "Sparkles":
        return Sparkles;
      case "Cloud":
        return Cloud;
      case "Palette":
        return Palette;
      default:
        return Terminal;
    }
  };

  return (
    <section id="skills" className="py-24 px-6 md:px-12 bg-titanium-black border-t border-white/5 relative">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-80 bg-gradient-to-r from-apple-blue/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <span className="text-apple-blue font-mono font-medium tracking-wider uppercase text-xs">
            Architectural Blueprint
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mt-2">
            The AV-5 Engineering Core
          </h2>
          <p className="text-titanium-silver text-md mt-4 max-w-xl mx-auto">
            Visualizing technical competencies structured as physical silicon cores. Click on a dedicated node block to inspect its specialized logic and metrics.
          </p>
        </div>

        {/* Chip grid + details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Column A: Futuristic Silicon Chip Diagram (5 Columns) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-80 h-80 rounded-[40px] bg-[#111116] border-[10px] border-[#22222a] shadow-[0_0_50px_rgba(0,0,0,0.8)] p-4 flex flex-col justify-between overflow-hidden group">
              
              {/* Circuit tracer highlights */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-40" />

              {/* Glowing core traces */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-apple-blue/10 rounded-full blur-2xl group-hover:bg-apple-blue/15 transition-all duration-700 pointer-events-none" />

              {/* Grid block layouts representing CPU sectors */}
              <div className="grid grid-cols-2 gap-3 flex-1">
                {SKILL_CATEGORIES.map((cat, idx) => {
                  const IconComp = getIcon(cat.iconName);
                  const isSelected = cat.id === selectedCategoryId;

                  return (
                    <button
                      key={cat.id}
                      id={`chip-core-${cat.id}`}
                      onClick={() => setSelectedCategoryId(cat.id)}
                      className={`relative rounded-2xl p-3 text-left transition-all duration-300 flex flex-col justify-between border ${
                        isSelected
                          ? "bg-apple-blue/15 border-apple-blue shadow-[0_0_20px_rgba(0,113,227,0.3)]"
                          : "bg-black/40 border-white/5 hover:border-white/20 hover:bg-black/60"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div
                          className={`p-1.5 rounded-lg ${
                            isSelected ? "bg-apple-blue text-white" : "bg-titanium-gray/80 text-titanium-silver"
                          }`}
                        >
                          <IconComp size={16} />
                        </div>
                        <span className="text-[8px] font-mono text-zinc-500">Node 0{idx + 1}</span>
                      </div>

                      <div className="mt-3">
                        <span className={`text-[10px] font-mono tracking-wider block leading-tight ${
                          isSelected ? "text-apple-blue font-bold" : "text-zinc-400 font-medium"
                        }`}>
                          {cat.name.split(" ")[0]}
                        </span>
                        <span className="text-[8px] text-zinc-500 font-mono italic">
                          {cat.skills.length} core structures
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Center Die representing ALU */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-titanium-dark border-[4px] border-apple-blue rounded-2xl flex flex-col items-center justify-center glow-blue pointer-events-none z-10 select-none">
                <Zap size={18} className="text-apple-blue animate-pulse mb-0.5" />
                <span className="text-[9px] font-mono font-black text-white tracking-widest text-center">
                  AV-5 CORES
                </span>
                <span className="text-[6px] font-mono text-apple-blue">5.0 GHz BASE</span>
              </div>
            </div>
          </div>

          {/* Column B: Selected Core specs & detailed metrics (7 Columns) */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-6 md:p-8 relative min-h-[400px] flex flex-col justification-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6 flex-1 flex flex-col justify-between"
                >
                  <div>
                    {/* Header Spec */}
                    <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-6">
                      <div className="p-2 py-2.5 bg-apple-blue/15 border border-apple-blue/30 rounded-xl text-apple-blue">
                        {(() => {
                          const IconComp = getIcon(selectedCategory.iconName);
                          return <IconComp size={20} />;
                        })()}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-apple-blue font-bold uppercase tracking-widest">
                          Active Processor Segment
                        </span>
                        <h3 className="text-xl font-bold text-white leading-tight">
                          {selectedCategory.name}
                        </h3>
                      </div>
                    </div>

                    {/* Skill progress bars list */}
                    <div className="space-y-5">
                      {selectedCategory.skills.map((skill) => (
                        <div key={skill.name} className="space-y-1.5 text-left group">
                          <div className="flex justify-between text-xs">
                            <span className="text-white font-medium group-hover:text-apple-blue transition-colors">
                              {skill.name}
                            </span>
                            <span className="font-mono text-zinc-500">{skill.level}% Capacity</span>
                          </div>

                          {/* Progress Track */}
                          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.level}%` }}
                              transition={{ duration: 0.5, delay: 0.1 }}
                              className="h-full bg-apple-blue"
                            />
                          </div>

                          {/* Detail contextual explanation */}
                          {skill.info && (
                            <p className="text-[11px] text-titanium-silver leading-relaxed font-sans">{skill.info}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Operational parameters footnote */}
                  <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-[10px] font-mono text-zinc-500">
                    <span>Precision: High Performance Hydration</span>
                    <span>Clock Sync: Automatic</span>
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
