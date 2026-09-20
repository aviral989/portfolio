/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion } from "motion/react";
import { Zap, ChevronRight, Code2, ShieldAlert, Sparkles } from "lucide-react";

export function MeduxLab() {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // 0 to 100
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - container.left;
    const percentage = Math.max(0, Math.min(100, (x / container.width) * 100));
    setSliderPosition(percentage);
  };

  const codeBefore = `// ❌ Legacy Redux-Saga Boilerplate (32 Lines)
// 1. Core Actions Definitions
export const FETCH_USER_REQ = 'USER_REQ';
export const FETCH_USER_SUCCESS = 'USER_SUCCESS';
export const FETCH_USER_ERROR = 'USER_ERROR';

// 2. Action Creators Setups
export const fetchUserAction = (id) => ({ 
  type: FETCH_USER_REQ, payload: id 
});
export const fetchUserSuccess = (data) => ({ 
  type: FETCH_USER_SUCCESS, payload: data 
});
export const fetchUserError = (err) => ({ 
  type: FETCH_USER_ERROR, error: err 
});

// 3. Dense Reducer Matrix
export function userReducer(state = {loading:false}, action) {
  switch (action.type) {
    case FETCH_USER_REQ:
      return { ...state, loading: true };
    case FETCH_USER_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_USER_ERROR:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

// 4. Heavy Generator Saga Worker
export function* fetchUserSaga(action) {
  try {
    const res = yield call(api.fetchUser, action.payload);
    yield put(fetchUserSuccess(res));
  } catch (err) {
    yield put(fetchUserError(err));
  }
}`;

  const codeAfter = `// ✅ Optimized Medux Architecture (5 Lines)
import { createMeduxSlice } from 'medux-saga';

// Instantly generates actions, reducers, sagas & dynamic values 
export const userModule = createMeduxSlice('user', {
  fetch: api.fetchUser, // auto-loading, dispatch, and catch keys!
});

// Streamlined modular instantiation, reduces codebase size by 80%!`;

  return (
    <section id="medux-lab" className="py-24 px-6 md:px-12 bg-titanium-black border-t border-white/5 relative">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-apple-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <span className="text-apple-blue font-mono font-medium tracking-wider uppercase text-xs">
            Core Project Highlight
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mt-2">
            The Medux Boilerplate Eliminator
          </h2>
          <p className="text-titanium-silver text-md mt-4 max-w-xl mx-auto">
            Aviral authored **Medux**, an internal orchestrator at Recro that abstracts Redux-Saga. Move your cursor horizontally across the editor window to observe the code reduction.
          </p>
        </div>

        {/* Interactive Slider Container */}
        <div className="glass-panel p-4 rounded-[32px] overflow-hidden max-w-5xl mx-auto shadow-2xl">
          
          {/* Header Controls Bar */}
          <div className="flex justify-between items-center bg-[#07070a] border border-white/5 p-3 rounded-2xl mb-4 text-xs font-mono text-zinc-500">
            <div className="flex items-center gap-2">
              <Code2 size={14} className="text-apple-blue" />
              <span className="text-white font-bold uppercase tracking-wider">Engine: medux-saga-compiler v1.2</span>
            </div>
            
            <div className="hidden sm:flex items-center gap-4 text-[10px]">
              <span className="flex items-center gap-1"><ShieldAlert size={12} className="text-rose-500" /> Legacy: 32 Lines</span>
              <span className="flex items-center gap-1"><Sparkles size={12} className="text-emerald-400" /> Medux: 5 Lines</span>
            </div>
          </div>

          {/* Core Interactive Compare Node */}
          <div
            id="medux-slider-workspace"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative h-[480px] md:h-[400px] w-full rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/5 bg-[#030305]"
          >
            {/* Before (Standard Boilerplate) Pane */}
            <div className="absolute inset-0 w-full h-full p-4 md:p-6 overflow-y-auto text-left font-mono text-[11px] md:text-xs text-red-300 bg-[#090508]/90">
              <pre className="align-left whitespace-pre-wrap leading-normal">{codeBefore}</pre>
            </div>

            {/* After (With Medux) Glowing Sliding Pane */}
            <div
              className="absolute inset-y-0 left-0 h-full p-4 md:p-6 overflow-y-auto text-left font-mono text-[11px] md:text-xs text-emerald-300 bg-[#050907] border-r-2 border-apple-blue overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="min-w-[800px] md:min-w-[650px]">
                <pre className="align-left whitespace-pre-wrap leading-normal">{codeAfter}</pre>
              </div>
            </div>

            {/* Visually descriptive tags */}
            <div className="absolute left-4 bottom-4 bg-rose-500/10 border border-rose-500/30 px-3 py-1.5 rounded-lg text-[10px] font-mono text-rose-400 font-bold z-10 select-nonepointer-events-none">
              STANDARD SAGA (32 lines)
            </div>
            <div className="absolute right-4 bottom-4 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-[10px] font-mono text-emerald-400 font-bold z-10 select-none pointer-events-none">
              MEDUX ORCHESTRATION (5 lines)
            </div>

            {/* Simulated Drag handle bar */}
            <div
              className="absolute inset-y-0 w-1 bg-apple-blue z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-apple-blue border border-white text-white flex items-center justify-center shadow-lg">
                <Zap size={14} className="text-white animate-pulse" />
              </div>
            </div>
          </div>

          {/* Interactive footer parameters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-xs font-mono">
            <div className="p-3 bg-[#0d0d12] border border-white/5 rounded-xl text-left">
              <span className="text-zinc-500 block">BOILERPLATE DECLINED</span>
              <span className="text-emerald-400 font-bold">-84% volume code</span>
            </div>
            <div className="p-3 bg-[#0d0d12] border border-white/5 rounded-xl text-left">
              <span className="text-zinc-500 block">DEVELOPER VELOCITY</span>
              <span className="text-emerald-400 font-bold">5x acceleration indexes</span>
            </div>
            <div className="p-3 bg-[#0d0d12] border border-white/5 rounded-xl text-left flex items-center justify-between">
              <div>
                <span className="text-zinc-500 block">ACTIVE SECTORS</span>
                <span className="text-zinc-300">Auth, User, Payments</span>
              </div>
              <ChevronRight size={14} className="text-zinc-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
