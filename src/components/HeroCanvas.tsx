/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Handle container dimensions dynamically
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width: boxWidth, height: boxHeight } = entries[0].contentRect;
      width = boxWidth;
      height = boxHeight;
      canvas.width = boxWidth * window.devicePixelRatio;
      canvas.height = boxHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Mouse interactive coordinates
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Particle nodes for background flow
    interface WaveLine {
      seed: number;
      amplitude: number;
      frequency: number;
      speed: number;
      color: string;
      lineWidth: number;
    }

    const waveLines: WaveLine[] = [
      { seed: 0, amplitude: 45, frequency: 0.003, speed: 0.0008, color: "rgba(0, 113, 227, 0.22)", lineWidth: 2.5 },   // Apple Blue
      { seed: 100, amplitude: 55, frequency: 0.002, speed: 0.0006, color: "rgba(45, 212, 191, 0.16)", lineWidth: 2 },  // Teal/Sage
      { seed: 200, amplitude: 35, frequency: 0.004, speed: 0.0011, color: "rgba(191, 178, 159, 0.14)", lineWidth: 1.5 }, // Gold/Titanium
      { seed: 300, amplitude: 65, frequency: 0.0015, speed: 0.0004, color: "rgba(0, 113, 227, 0.12)", lineWidth: 3.5 }  // Apple Blue
    ];

    let t = 0;

    const render = () => {
      ctx.fillStyle = "rgba(6, 6, 8, 0.12)"; // trailing black fade
      ctx.fillRect(0, 0, width, height);

      // Interpolate mouse coordinates smoothly
      if (mouse.targetX !== -1000) {
        if (mouse.x === -1000) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
        } else {
          mouse.x += (mouse.targetX - mouse.x) * 0.08;
          mouse.y += (mouse.targetY - mouse.y) * 0.08;
        }
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      t += 1;

      // Render flowing waves like abstract glass ribbon sheets
      waveLines.forEach((wave, idx) => {
        ctx.beginPath();
        ctx.lineWidth = wave.lineWidth;
        ctx.strokeStyle = wave.color;

        // Apply a glow filter
        ctx.shadowBlur = 10;
        ctx.shadowColor = wave.color;

        // Adjust parameters dynamic to scroll position (creates feeling of speed and perspective depth)
        const scrollFactor = 1 + scrollY * 0.0015;
        const speedMultiplier = 1 + scrollY * 0.002;
        const amplitudeMod = wave.amplitude * (1 + scrollY * 0.0005);

        for (let x = 0; x <= width; x += 3) {
          const waveT = t * wave.speed * speedMultiplier;
          // Sine combinations representing dynamic 3D-like curves
          let y = Math.sin(x * wave.frequency * scrollFactor + waveT + wave.seed) * amplitudeMod;
          y += Math.cos(x * 0.00085 * scrollFactor - waveT * 0.7) * (amplitudeMod * 0.6);

          // If mouse is close, distort the lines to draw them towards the cursor
          if (mouse.x !== -1000) {
            const dx = x - mouse.x;
            const dist = Math.abs(dx);
            if (dist < 280) {
              const pullFactor = (1 - dist / 280) * 45;
              const angle = Math.sin(t * 0.02 + idx * Math.PI / 2);
              const mouseOffsetY = (mouse.y - height / 2) * (1 - dist / 280) * 0.45;
              y += Math.sign(angle) * pullFactor + mouseOffsetY;
            }
          }

          // Align wave to the physical center
          const finalY = height / 2 + y;

          if (x === 0) {
            ctx.moveTo(x, finalY);
          } else {
            ctx.lineTo(x, finalY);
          }
        }
        ctx.stroke();
      });

      // Render premium tiny stardust particles drifting upwards under user perspective
      ctx.shadowBlur = 0;
      for (let i = 0; i < 28; i++) {
        const xSeed = Math.sin(i * 123.456 + t * 0.002) * 0.5 + 0.5;
        const ySeed = ((i * 789.012 + t * (0.4 + (i % 3) * 0.2)) % height);
        const sizeSeed = 0.5 + ((i * 23.4) % 1.5);
        
        ctx.fillStyle = `rgba(255, 255, 255, ${0.15 + (i % 3) * 0.1})`;
        ctx.beginPath();
        ctx.arc(xSeed * width, height - ySeed, sizeSeed, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [scrollY]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden bg-titanium-black pointer-events-none z-0"
    >
      <canvas ref={canvasRef} className="block w-full h-full opacity-70" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-titanium-black/60 to-titanium-black pointer-events-none" />
    </div>
  );
}
