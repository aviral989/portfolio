/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Activity, BarChart, ShieldCheck, Users, RefreshCw } from "lucide-react";

interface MetricItem {
  id: string;
  title: string;
  roleContext: string;
  icon: any;
  startValue: number;
  endValue: number;
  unit: string;
  prefixUrl?: string; // e.g. Vigyos
  label: string;
  description: string;
  details: string[];
}

const METRICS_DATA: MetricItem[] = [
  {
    id: "session-time",
    title: "Vigyos User Growth Engine",
    roleContext: "As CTO & Co-Founder",
    icon: Activity,
    startValue: 5,
    endValue: 19,
    unit: "m",
    label: "Customer Active Sessions",
    description: "Re-engineered Next.js pre-loaders & interaction layers resulting in +280% user engagement time.",
    details: [
      "Designed instant-click response handlers to preempt page hydration delays.",
      "Optimized client caching which reduced layout jumps to zero, extending user retention.",
      "Introduced responsive modular loading for third-party media chunks."
    ]
  },
  {
    id: "tech-debt",
    title: "Procuzy System Refactor",
    roleContext: "As Senior Software Developer",
    icon: BarChart,
    startValue: 100,
    endValue: 50,
    unit: "%",
    label: "Total Technical Debt Cleared",
    description: "Conducted strict code auditing and phased saga refactoring, unlocking immediate system speeds.",
    details: [
      "Decreased modular duplication by merging disparate component configurations.",
      "Decoupled dense Saga files into unified state pipelines with clean state managers.",
      "Halved first-paint loading speeds by streamlining Webpack bundle trees."
    ]
  },
  {
    id: "production-bugs",
    title: "Quality Assurance Overhaul",
    roleContext: "As CTO & Product Lead",
    icon: ShieldCheck,
    startValue: 100,
    endValue: 80,
    unit: "%",
    label: "Post-Production User Defects",
    description: "Implemented high-fidelity Cypress end-to-end regression workflows directly linked to CI deployment.",
    details: [
      "Restricted build progression to fully validated test routines.",
      "Ensured form submissions and user checkout streams were tested against all viewports.",
      "Empowered developers with custom local testing playgrounds."
    ]
  },
  {
    id: "team-led",
    title: "Collaborative Agile Delivery",
    roleContext: "As Senior Engineering Leader",
    icon: Users,
    startValue: 1,
    endValue: 5,
    unit: "x",
    label: "Engineering Team Cohesion",
    description: "Directly led a team of 4 front-end developers, establishing high-standard linting and code uniformity.",
    details: [
      "Instituted systematic PR reviews to cultivate shared technical responsibility.",
      "Developed an internal saga boilerplate package decreasing start-up friction.",
      "Promoted standard ESLint scripts and cross-team knowledge transfers."
    ]
  }
];

export function MetricsShowcase() {
  const [activeMetricId, setActiveMetricId] = useState<string>("session-time");
  // Simulated sliders state, key is metric id, progress is 0 to 100
  const [sliderStates, setSliderStates] = useState<Record<string, number>>({
    "session-time": 100,
    "tech-debt": 100,
    "production-bugs": 100,
    "team-led": 100,
  });

  const activeMetric = METRICS_DATA.find((m) => m.id === activeMetricId) || METRICS_DATA[0];
  const activeSliderVal = sliderStates[activeMetric.id] ?? 100;

  // Map progress to current simulated metrics
  const getSimulatedValue = (metric: MetricItem, progress: number) => {
    const fraction = progress / 100;
    if (metric.id === "tech-debt") {
      // starts at 100%, descends to 50%
      return Math.round(100 - (100 - 50) * fraction);
    }
    if (metric.id === "production-bugs") {
      // starts at 100%, descends to 80% (i.e. -20% bugs)
      return Math.round(100 - (100 - 80) * fraction);
    }
    // standard linear interpolation
    const valueRange = metric.endValue - metric.startValue;
    return (metric.startValue + valueRange * fraction).toFixed(metric.id === "team-led" ? 1 : 0);
  };

  const currentValStr = getSimulatedValue(activeMetric, activeSliderVal);

  const resetAllMetrics = () => {
    setSliderStates({
      "session-time": 0,
      "tech-debt": 0,
      "production-bugs": 0,
      "team-led": 0,
    });
    // animate back to 100 incrementally
    setTimeout(() => {
      setSliderStates({
        "session-time": 100,
        "tech-debt": 100,
        "production-bugs": 100,
        "team-led": 100,
      });
    }, 200);
  };

  return (
    <section id="metrics" className="relative py-24 px-6 md:px-12 bg-titanium-black overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center md:text-left">
          <span className="text-apple-blue font-mono font-medium tracking-wider uppercase text-xs">
            Performance Index
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mt-2 max-w-2xl">
            Engineered for Extreme Velocity & Growth
          </h2>
          <p className="text-titanium-silver text-md mt-4 max-w-xl">
            Dragging the performance slider on the cards below lets you simulate how my front-end solutions directly impact crucial business metrics.
          </p>
        </div>

        {/* Outer Bento Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column A: Left Toggles (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {METRICS_DATA.map((metric) => {
              const IconComp = metric.icon;
              const isActive = metric.id === activeMetricId;
              const currentSimVal = getSimulatedValue(metric, sliderStates[metric.id] ?? 100);

              return (
                <div
                  key={metric.id}
                  id={`metric-${metric.id}`}
                  onClick={() => setActiveMetricId(metric.id)}
                  className={`relative p-5 rounded-2xl cursor-pointer text-left transition-all duration-300 group ${
                    isActive
                      ? "glass-panel bg-white/5 border-apple-blue/50 glow-blue scale-[1.01]"
                      : "bg-titanium-gray/40 border border-white/5 hover:bg-titanium-gray/60 hover:border-white/12"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-xl transition-colors ${
                        isActive ? "bg-apple-blue text-white" : "bg-titanium-light text-titanium-silver group-hover:text-white"
                      }`}
                    >
                      <IconComp size={22} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-titanium-silver font-mono">{metric.roleContext}</span>
                        <motion.span
                          layout
                          className={`text-xl font-bold font-mono ${isActive ? "text-apple-blue" : "text-white"}`}
                        >
                          {currentSimVal}
                          {metric.id === "tech-debt" && "% Tech Debt"}
                          {metric.id === "production-bugs" && "% Defective"}
                          {metric.id === "session-time" && metric.unit}
                          {metric.id === "team-led" && " Devs"}
                        </motion.span>
                      </div>
                      <h4 className="text-base font-semibold text-white mt-1 group-hover:text-apple-blue transition-colors">
                        {metric.title}
                      </h4>
                      <p className="text-xs text-titanium-silver mt-1.5 leading-relaxed line-clamp-2">
                        {metric.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              id="reset-metrics-btn"
              onClick={resetAllMetrics}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 hover:border-white/20 bg-titanium-gray/20 hover:bg-titanium-gray/40 text-xs font-mono text-white transition-all w-full justify-center"
            >
              <RefreshCw size={14} className="animate-spin-slow" />
              Reset Benchmark Simulation
            </button>
          </div>

          {/* Column B: Right Immersive Workbench Spec (7 Cols) */}
          <div className="lg:col-span-7 h-full">
            <div className="glass-panel rounded-3xl p-6 md:p-8 relative min-h-[500px] flex flex-col justify-between overflow-hidden">
              {/* Radial ambiance back glow */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-apple-blue/10 rounded-full blur-3xl pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMetric.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col justify-between"
                >
                  <div>
                    {/* Top title bar */}
                    <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                      <div>
                        <span className="text-xs text-apple-blue font-mono font-bold tracking-wider uppercase">
                          System Diagnostic
                        </span>
                        <h3 className="text-xl font-bold text-white leading-tight mt-0.5">
                          {activeMetric.label}
                        </h3>
                      </div>
                      <span className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full font-mono text-titanium-silver">
                        ONLINE STATUS
                      </span>
                    </div>

                    {/* Gauge Display & Spec Dial */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center my-6">
                      <div className="md:col-span-5 flex flex-col items-center justify-center">
                        {/* Circular Gauge */}
                        <div className="relative w-36 h-36 flex items-center justify-center">
                          <svg className="w-full h-full -rotate-90">
                            {/* Base track */}
                            <circle
                              cx="72"
                              cy="72"
                              r="60"
                              stroke="rgba(255, 255, 255, 0.05)"
                              strokeWidth="8"
                              fill="none"
                            />
                            {/* Glow track */}
                            <motion.circle
                              cx="72"
                              cy="72"
                              r="60"
                              stroke="#0071e3"
                              strokeWidth="8"
                              fill="none"
                              strokeDasharray="377"
                              strokeDashoffset={377 - (377 * activeSliderVal) / 100}
                              className="drop-shadow-[0_0_8px_#0071e3]"
                              transition={{ type: "spring", stiffness: 60, damping: 15 }}
                            />
                          </svg>

                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold font-mono text-white tracking-tighter">
                              {currentValStr}
                            </span>
                            <span className="text-[10px] text-titanium-silver font-mono uppercase tracking-wide">
                              {activeMetric.id === "session-time" && "minutes / day"}
                              {activeMetric.id === "tech-debt" && "debt score"}
                              {activeMetric.id === "production-bugs" && "functional status"}
                              {activeMetric.id === "team-led" && "active developers"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Diagnostic Bullets */}
                      <div className="md:col-span-7 space-y-4">
                        <div className="text-xs text-titanium-silver italic leading-relaxed border-l-2 border-apple-blue pl-3 py-1 bg-white/5 pr-3 rounded-r-lg">
                          &ldquo;{activeMetric.description}&rdquo;
                        </div>
                        <ul className="space-y-2">
                          {activeMetric.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs text-titanium-silver">
                              <span className="text-apple-blue font-mono mt-0.5">•</span>
                              <span className="leading-relaxed">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Manual Friction Slider */}
                  <div className="border-t border-white/5 pt-6 mt-6">
                    <div className="flex justify-between items-center mb-2.5">
                      <span className="text-xs font-mono text-titanium-silver">
                        Slide to Simulate Optimization Range
                      </span>
                      <span className="text-xs font-mono text-apple-blue font-bold">
                        {activeSliderVal}% Load Capacity
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-mono text-titanium-silver uppercase">
                        {activeMetric.id === "tech-debt" || activeMetric.id === "production-bugs" ? "High Risk" : "Legacy"}
                      </span>
                      <input
                        type="range"
                        id="metric-slider-input"
                        min="0"
                        max="100"
                        value={activeSliderVal}
                        onChange={(e) => {
                          const val = Math.min(Math.max(parseInt(e.target.value), 0), 100);
                          setSliderStates((prev) => ({
                            ...prev,
                            [activeMetric.id]: val,
                          }));
                        }}
                        className="flex-1 h-1.5 rounded-lg bg-titanium-light accent-apple-blue cursor-pointer outline-none"
                      />
                      <span className="text-[10px] font-mono text-apple-blue font-bold uppercase">
                        {activeMetric.id === "tech-debt" || activeMetric.id === "production-bugs" ? "Optimized" : "Max Tuning"}
                      </span>
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
