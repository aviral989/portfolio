/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Layers, Play, Settings2, Trash2, Cpu, CheckCircle2, AlertTriangle, Radio } from "lucide-react";

interface MfaModule {
  id: string;
  name: string;
  route: string;
  size: string;
  speed: string;
  color: string;
  status: "available" | "loading" | "mounted" | "unplaced";
  apiStatus: string;
  metrics: { visits: string; conv: string; load: string };
}

const INITIAL_MODULES: MfaModule[] = [
  {
    id: "mfa-auth",
    name: "Auth Gatekeeper App",
    route: "/auth",
    size: "18.4 KB",
    speed: "2.1ms",
    color: "from-blue-500 to-indigo-600",
    status: "mounted",
    apiStatus: "OAuth Core / SSO Sync Active",
    metrics: { visits: "142K/day", conv: "99.9%", load: "1.4ms" }
  },
  {
    id: "mfa-reps",
    name: "Sales Coaching MFA",
    route: "/coaching/reps",
    size: "42.1 KB",
    speed: "4.8ms",
    color: "from-teal-500 to-emerald-600",
    status: "mounted",
    apiStatus: "GraphQL Query Pool: Syncing",
    metrics: { visits: "48K/day", conv: "94.5%", load: "3.2ms" }
  },
  {
    id: "mfa-gamify",
    name: "Gamified Training Panel",
    route: "/gamification",
    size: "32.8 KB",
    speed: "3.5ms",
    color: "from-amber-500 to-orange-600",
    status: "available",
    apiStatus: "WebSocket Live: Connected",
    metrics: { visits: "22K/day", conv: "88.2%", load: "2.1ms" }
  },
  {
    id: "mfa-admin",
    name: "Admin Schema Controller",
    route: "/admin/schema",
    size: "52.0 KB",
    speed: "6.2ms",
    color: "from-rose-500 to-purple-600",
    status: "available",
    apiStatus: "REST endpoint: v2 Schema Live",
    metrics: { visits: "4.1K/day", conv: "100%", load: "5.5ms" }
  }
];

export function FederationSandbox() {
  const [modules, setModules] = useState<MfaModule[]>(INITIAL_MODULES);
  const [logs, setLogs] = useState<string[]>([
    "[System Shell] Host container initialized successfully at port :3000",
    "[System Shell] Dynamic shared dependencies found: [react, react-dom, redux]",
    "[Module Federation] Ready to resolve remote entries asynchronously..."
  ]);
  const [simulatedLatency, setSimulatedLatency] = useState<number>(1); // slider: 1 (Instant), 2 (Normal), 3 (Slow)
  const [isAssembling, setIsAssembling] = useState<boolean>(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const addLog = (message: string) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, `[${time}] ${message}`]);
  };

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const toggleModule = (id: string) => {
    const targetModule = modules.find((m) => m.id === id);
    if (!targetModule) return;

    const isCurrentlyMounted = targetModule.status === "mounted";

    if (isCurrentlyMounted) {
      // Unmount Module
      addLog(`[Federated Engine] Request to unmount remote: ${targetModule.name}`);
      setModules((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: "available" } : m))
      );
      addLog(`[Federated Engine] Cleaned memory buffer, garbage collection completed for ${targetModule.route}`);
    } else {
      // Mount Module
      addLog(`[Federated Engine] Resolving remote coordinates for: ${targetModule.name}`);
      
      setModules((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: "loading" } : m))
      );

      // Loading duration dynamic to simulated latency slider
      const delay = simulatedLatency === 1 ? 250 : simulatedLatency === 2 ? 800 : 2200;

      addLog(`[Module Federation] Pulling index at http://${id}.mindtickle.com/remoteEntry.js (Simulating ${delay}ms edge latency)`);

      setTimeout(() => {
        setModules((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: "mounted" } : m))
        );
        addLog(`[Module Federation] Remote chunk loaded successfully. Intersecting with shell routing tree...`);
        addLog(`[System Shell] ${targetModule.name} successfully mounted as child view under path "${targetModule.route}"!`);
      }, delay);
    }
  };

  const reassembleShell = () => {
    setIsAssembling(true);
    addLog(`[System Shell] TRIGGER RE-ASSEMBLY OF CONTAINER SHELL STRUCTURE`);
    
    // Set all to loading
    setModules((prev) =>
      prev.map((m) => (m.status === "mounted" ? { ...m, status: "loading" } : m))
    );

    setTimeout(() => {
      setModules((prev) =>
        prev.map((m) => (m.status === "loading" ? { ...m, status: "mounted" } : m))
      );
      addLog(`[System Shell] Standard design refresh complete. Re-compiled typography & theme updates.`);
      setIsAssembling(false);
    }, 1200);
  };

  return (
    <section id="architecture" className="py-24 px-6 md:px-12 bg-titanium-dark border-t border-white/5 relative">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center lg:text-left">
          <span className="text-teal-400 font-mono font-medium tracking-wider uppercase text-xs">
            Interactive Architecture Playground
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mt-2 max-w-2xl">
            Surgical Microfrontends Orchestration
          </h2>
          <p className="text-titanium-silver text-md mt-4 max-w-xl">
            Aviral developed highly scalable, micro-frontend shells in Mindtickle utilizing Module Federation. Explore the actual hot-swapping container mechanism below.
          </p>
        </div>

        {/* Outer Dashboard layout / playground */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left panel: Orchestrator panel (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="glass-panel p-6 rounded-3xl space-y-6 flex-1">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <Layers className="text-teal-400" size={18} />
                  <span className="text-xs font-mono text-white font-bold uppercase tracking-wider">
                    Orchestration Hub
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                  <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Ready</span>
                </div>
              </div>

              {/* Slider for simulated latency */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xs font-mono text-titanium-silver">Network Grid Latency</span>
                  <span className="text-xs font-mono text-teal-400 font-bold">
                    {simulatedLatency === 1 ? "Localhost (Fast)" : simulatedLatency === 2 ? "CDN Edge (Active)" : "3G Connection (Slow)"}
                  </span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3].map((val) => (
                    <button
                      key={val}
                      onClick={() => {
                        setSimulatedLatency(val);
                        addLog(`[System Config] Network profile swapped to ${val === 1 ? "LAN Localhost" : val === 2 ? "CDN Edge Cache" : "Constrained Broadband"}`);
                      }}
                      className={`flex-1 py-1.5 rounded-lg text-[10px] font-mono border transition-all ${
                        simulatedLatency === val
                          ? "bg-teal-500/10 border-teal-500/50 text-teal-400 font-bold"
                          : "border-white/5 bg-titanium-gray/20 hover:bg-titanium-gray/40 text-titanium-silver"
                      }`}
                    >
                      {val === 1 ? "2.5ms" : val === 2 ? "250ms" : "1500+ms"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Modules selector widgets */}
              <div className="space-y-3">
                <span className="text-xs font-mono text-titanium-silver block mb-1">Select / Eject Federations</span>
                {modules.map((m) => {
                  const mId = m.id;
                  return (
                    <div
                      key={m.id}
                      onClick={() => toggleModule(m.id)}
                      className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                        m.status === "mounted"
                          ? "bg-teal-500/5 border-teal-500/40"
                          : m.status === "loading"
                          ? "bg-amber-500/5 border-amber-500/40 animate-pulse"
                          : "bg-titanium-gray/30 border-white/5 hover:bg-titanium-gray/50 hover:border-white/10"
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            m.status === "mounted" ? "bg-emerald-400" : m.status === "loading" ? "bg-amber-400 animate-spin" : "bg-zinc-600"
                          }`} />
                          <span className="text-xs text-white font-semibold group-hover:text-teal-300 transition-colors">
                            {m.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 font-mono text-[9px] text-titanium-silver">
                          <span>Size: <span className="text-white">{m.size}</span></span>
                          <span>•</span>
                          <span>Speed: <span className="text-white">{m.speed}</span></span>
                        </div>
                      </div>

                      <button
                        className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full border transition-all ${
                          m.status === "mounted"
                            ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10 hover:border-emerald-500"
                            : m.status === "loading"
                            ? "border-amber-500/30 text-amber-400 hover:border-amber-500"
                            : "border-white/10 text-titanium-silver hover:border-white/20"
                        }`}
                      >
                        {m.status === "mounted" ? "EJECT REMOTE" : m.status === "loading" ? "MOUNTING..." : "COMPILE & LOAD"}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Quick Action bar */}
              <div className="flex gap-3">
                <button
                  id="mfa-reassemble-btn"
                  onClick={reassembleShell}
                  disabled={isAssembling}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-teal-700 text-titanium-black text-xs font-mono font-bold rounded-xl transition-all"
                >
                  <Cpu size={14} className={isAssembling ? "animate-spin" : ""} />
                  {isAssembling ? "Orchestrating..." : "Hot Reload Core Shell"}
                </button>
              </div>
            </div>

            {/* Simulated Debug Console */}
            <div className="bg-[#030305] border border-white/10 rounded-2xl p-4 font-mono text-[10px] text-emerald-400 h-44 overflow-y-auto shadow-inner">
              <div className="flex justify-between items-center border-b border-white/5 pb-1.5 mb-2 text-[9px] text-zinc-500">
                <span>SYSTEM CORE LOGS</span>
                <span className="text-[8px] border border-zinc-700 px-1.5 rounded uppercase">live debugger</span>
              </div>
              <div className="space-y-1">
                {logs.map((log, idx) => (
                  <div key={idx} className="leading-relaxed">
                    <span className="text-zinc-600">&gt;</span> {log}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>
            </div>
          </div>

          {/* Right panel: Visual Dynamic Container Preview (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col h-full bg-titanium-gray/40 border border-white/5 rounded-3xl p-5 relative overflow-hidden">
            {/* Top Bar describing Shell container */}
            <div className="flex justify-between items-center px-2 py-2.5 bg-black/40 rounded-xl border border-white/5 mb-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 bg-rose-500 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                </div>
                <div className="bg-[#0e0e12] border border-white/10 px-3 py-1 rounded text-[10px] font-mono text-zinc-400">
                  https://shell-orchestrator.mindtickle.com/dashboard
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Radio size={14} className="text-emerald-400 animate-pulse" />
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Hydrated view</span>
              </div>
            </div>

            {/* Dynamic Dashboard Simulation */}
            <div className="flex-1 border border-dashed border-white/10 rounded-2xl p-4 flex flex-col justify-between relative bg-black/20 min-h-[400px]">
              
              {/* Core Global Header representing Shell code */}
              <div className="flex justify-between items-center bg-zinc-900/50 p-3 rounded-lg border border-white/5 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center font-bold text-xs text-black font-mono">
                    MT
                  </div>
                  <span className="text-xs font-semibold text-white font-sans">Mindtickle Hub</span>
                  <span className="text-[8px] border border-teal-500/20 text-teal-400 font-mono px-1.5 rounded">
                    Shell v5.2
                  </span>
                </div>
                {/* Embedded global metrics */}
                <div className="flex gap-4 text-[9px] font-mono text-zinc-400">
                  <div>Rps: <span className="text-emerald-400">22.4k</span></div>
                  <div>Cache hit: <span className="text-emerald-400">97.8%</span></div>
                </div>
              </div>

              {/* Dynamic Child Grid representing Federated Mountpoints */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch content-start">
                <AnimatePresence>
                  {modules.filter(m => m.status === "mounted" || m.status === "loading").map((mfa) => (
                    <motion.div
                      key={mfa.id}
                      id={`workspace-${mfa.id}`}
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-xl border border-white/10 bg-zinc-900/30 overflow-hidden flex flex-col justify-between"
                    >
                      {/* MFA Header bar */}
                      <div className={`bg-gradient-to-r ${mfa.color} p-2 flex justify-between items-center`}>
                        <span className="text-[10px] font-bold text-white font-mono uppercase tracking-wide">
                          {mfa.name}
                        </span>
                        <span className="text-[8px] bg-black/30 text-white px-2 py-0.5 rounded-full font-mono">
                          {mfa.speed}
                        </span>
                      </div>

                      {/* Micro content inside shell */}
                      <div className="p-3 bg-black/40 flex-1 flex flex-col justify-between min-h-[110px] text-left">
                        {mfa.status === "loading" ? (
                          <div className="flex-1 flex flex-col items-center justify-center space-y-2 py-6">
                            <span className="block w-5 h-5 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
                            <span className="text-[8px] font-mono text-amber-400">Resolving Federations...</span>
                          </div>
                        ) : (
                          <>
                            <div>
                              <div className="flex justify-between mb-1.5">
                                <span className="text-[9px] font-mono text-zinc-500">Route Node:</span>
                                <span className="text-[9px] font-mono text-teal-300 font-bold">{mfa.route}</span>
                              </div>
                              <div className="text-[9px] text-zinc-400 font-sans tracking-wide leading-normal">
                                {mfa.apiStatus}
                              </div>
                            </div>

                            {/* Multi state measurements */}
                            <div className="grid grid-cols-3 gap-1 grid-flow-row border-t border-white/5 pt-2 mt-2">
                              <div className="text-center">
                                <div className="text-[7px] text-zinc-500 font-mono">Sessions</div>
                                <div className="text-[9px] text-white font-mono font-bold">{mfa.metrics.visits}</div>
                              </div>
                              <div className="text-center">
                                <div className="text-[7px] text-zinc-500 font-mono">Accuracy</div>
                                <div className="text-[9px] text-emerald-400 font-mono font-bold">{mfa.metrics.conv}</div>
                              </div>
                              <div className="text-center">
                                <div className="text-[7px] text-zinc-500 font-mono">HFP Time</div>
                                <div className="text-[9px] text-teal-300 font-mono font-bold">{mfa.metrics.load}</div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Blank module placeholder representing unmounted state */}
                {modules.filter(m => m.status === "mounted").length < 4 && (
                  <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.01] flex flex-col items-center justify-center p-6 text-center text-zinc-600 min-h-[148px]">
                    <Layers size={22} className="text-zinc-600 mb-2 opacity-50" />
                    <span className="text-[9px] font-mono tracking-wider">Unallocated Host Core Block</span>
                    <span className="text-[8px] text-zinc-700 mt-1">Activate remote module in the left sidebar</span>
                  </div>
                )}
              </div>

              {/* Bottom bar of shell system */}
              <div className="flex justify-between items-center text-[8px] font-mono text-zinc-600 border-t border-white/5 pt-3 mt-4">
                <span>Active remotes: {modules.filter(m => m.status === "mounted").length}</span>
                <span>Container: OK (Memory leak diagnostic: <span className="text-emerald-400">Stable</span>)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
