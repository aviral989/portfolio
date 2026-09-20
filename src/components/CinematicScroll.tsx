/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Cpu, Layers, Sparkles, Zap, Flame } from "lucide-react";

export function CinematicScroll() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress across a 300vh scroll height
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Zoom-in scale effect for the inner wafer / lens circle
  const lensScale = useTransform(scrollYProgress, [0, 0.45, 0.85, 1], [1, 2.5, 9, 20]);
  
  // Blur effect representing lens adjustment
  const lensBlur = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.9], ["blur(0px)", "blur(1px)", "blur(4px)", "blur(10px)"]);

  // Opacity transitions for different subtitle text tracks
  const text1Opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.2], [0, -30]);

  const text2Opacity = useTransform(scrollYProgress, [0.25, 0.45, 0.6], [0, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.25, 0.45, 0.6], [30, 0, -30]);

  const text3Opacity = useTransform(scrollYProgress, [0.65, 0.85, 0.98], [0, 1, 0]);
  const text3Y = useTransform(scrollYProgress, [0.65, 0.85, 0.98], [30, 0, -30]);

  // Rotations for interactive circular rings
  const ringRotation = useTransform(scrollYProgress, [0, 1], [0, 240]);
  const counterRingRotation = useTransform(scrollYProgress, [0, 1], [0, -180]);

  // Backlighting color transition
  const glowColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "rgba(59, 130, 246, 0.15)", // Blue glow
      "rgba(45, 212, 191, 0.18)", // Teal glow
      "rgba(168, 85, 247, 0.15)"  // Purple glow
    ]
  );

  return (
    <div ref={targetRef} className="relative h-[300vh] bg-titanium-black">
      {/* Sticky screen content container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden">
        
        {/* Sky/Atmosphere Layer */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-all duration-300 z-0"
          style={{ backgroundColor: glowColor }}
        />

        {/* Top brand header bar */}
        <div className="relative z-10 text-center pt-24">
          <span className="text-[10px] font-mono tracking-[0.4em] text-apple-blue font-bold uppercase block mb-1">
            CINEMATIC NARRATIVE
          </span>
          <h3 className="text-sm font-semibold tracking-wide text-zinc-400">
            Scroll to zoom into the core architecture
          </h3>
        </div>

        {/* Centerpiece: Sliding scale visual deck */}
        <div className="relative flex-1 flex items-center justify-center z-10 p-6">
          
          {/* Scrolling text tracks layered over camera lens */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            
            {/* Slide 1 Text */}
            <motion.div
              style={{ opacity: text1Opacity, y: text1Y }}
              className="text-center max-w-xl px-4 absolute"
            >
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-tight">
                Solid Titanium.<br />
                Extreme Precision.
              </h2>
              <p className="text-xs md:text-sm text-titanium-silver mt-4 font-mono">
                Crafting polished codebases built with unbreakable front-end patterns.
              </p>
            </motion.div>

            {/* Slide 2 Text */}
            <motion.div
              style={{ opacity: text2Opacity, y: text2Y }}
              className="text-center max-w-xl px-4 absolute"
            >
              <span className="p-2 py-1 bg-teal-500/10 border border-teal-500/30 rounded-full text-[9px] font-mono text-teal-400 font-bold uppercase tracking-wider">
                IMPACT DEMONSTRATION
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mt-4 leading-tight">
                Next-Gen<br />Hydration Speeds
              </h2>
              <p className="text-xs md:text-sm text-titanium-silver mt-4 font-mono">
                Optimizing Vigyos core mechanics to yield +280% user session durations.
              </p>
            </motion.div>

            {/* Slide 3 Text */}
            <motion.div
              style={{ opacity: text3Opacity, y: text3Y }}
              className="text-center max-w-xl px-4 absolute"
            >
              <span className="p-2 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-[9px] font-mono text-purple-400 font-bold uppercase tracking-wider">
                DECOUPLED SYSTEMS
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mt-4 leading-tight">
                Seamless Dynamic<br />Federated Shells
              </h2>
              <p className="text-xs md:text-sm text-titanium-silver mt-4 font-mono">
                Asynchronous micro-remote resolution at enterprise scale with Mindtickle.
              </p>
            </motion.div>
          </div>

          {/* Interactive Cinematic Camera / Wafer Artwork */}
          <motion.div
            style={{ 
              scale: lensScale,
              filter: lensBlur
            }}
            className="w-56 h-56 rounded-full bg-zinc-900 border-[8px] border-zinc-800/80 shadow-[0_0_60px_rgba(0,0,0,0.9)] flex items-center justify-center relative select-none pointer-events-none"
          >
            {/* Spinning outer control track ring */}
            <motion.div 
              style={{ rotate: ringRotation }}
              className="absolute inset-[4px] border-2 border-dashed border-zinc-700/60 rounded-full"
            />

            {/* Inner counter-rotating calibrated ring */}
            <motion.div 
              style={{ rotate: counterRingRotation }}
              className="absolute inset-[16px] border border-zinc-600/40 rounded-full flex items-center justify-between p-2"
            >
              <div className="w-1.5 h-1.5 bg-apple-blue rounded-full" />
              <div className="w-1.5 h-1.5 bg-teal-400 rounded-full" />
            </motion.div>

            {/* Inner Dark Lens Glass containing the silicon die */}
            <div className="w-[85%] h-[85%] rounded-full bg-black/85 border border-zinc-800 flex flex-col items-center justify-center p-4 relative overflow-hidden">
              {/* Refraction effect overlay */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/0 via-white/[0.03] to-white/0 pointer-events-none rotate-45" />

              {/* Central Silicon Wafer graphic */}
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-zinc-800 to-black border border-white/10 flex flex-col items-center justify-center shadow-lg relative z-10">
                <Cpu size={24} className="text-apple-blue" />
                <span className="text-[6px] font-mono text-zinc-400 mt-1">AV-5 Core</span>
              </div>

              {/* Micro specs that expand out on absolute positions */}
              <div className="absolute top-3 text-[5px] font-mono text-teal-400">REACT 19</div>
              <div className="absolute bottom-3 text-[5px] font-mono text-purple-400">FEDERATION</div>
              <div className="absolute left-3 text-[5px] font-mono text-amber-400">NEXT.JS</div>
              <div className="absolute right-3 text-[5px] font-mono text-blue-400">TS</div>
            </div>
          </motion.div>

        </div>

        {/* Dynamic scroll status footer indicator */}
        <div className="relative z-10 px-10 py-6 flex justify-between items-center border-t border-white/5 opacity-55 text-[9px] font-mono tracking-widest text-zinc-500">
          <span>PROGRESS DIAGNOSTIC</span>
          <div className="flex gap-2 items-center">
            <span className="uppercase text-white">Status:</span>
            <span className="text-apple-blue">
              {scrollYProgress.get() < 0.33 ? "FOCUS RANGE 1" : scrollYProgress.get() < 0.66 ? "FOCUS RANGE 2" : "DEPLOY STATE"}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
