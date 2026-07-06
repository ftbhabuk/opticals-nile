import { useEffect, useRef } from "react";

export function AnimatedLensFocus() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars = " .:-=+*#%@";
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const RAY_COUNT = 11;
    const FOCAL_X = 0.55;

    const rayPath = (yOffset: number, t: number) => {
      // t in [0,1] along full ray: entry -> lens -> focal point -> exit
      const lensX = 0;
      const entryX = -1;
      const exitX = 1;

      if (t < 0.5) {
        const localT = t / 0.5;
        return { x: entryX + (lensX - entryX) * localT, y: yOffset };
      } else {
        const localT = (t - 0.5) / 0.5;
        const targetX = FOCAL_X + (exitX - FOCAL_X) * Math.max(0, (localT - 0.4) / 0.6);
        const x = lensX + (targetX - lensX) * localT;
        const y = yOffset * (1 - localT) * (localT < 0.4 ? 1 - localT / 0.4 : 0);
        const convergeY = yOffset * Math.max(0, 1 - localT / 0.4);
        return { x, y: convergeY };
      }
    };

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const scale = Math.min(rect.width, rect.height) * 0.42;

      ctx.font = "16px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // pulse position sweeps 0 -> 1 -> pause -> reset
      const cycle = (time % 3.2) / 3.2;
      const wavefront = cycle < 0.75 ? cycle / 0.75 : 1;
      const flashBoost = cycle > 0.72 && cycle < 0.85 ? 1 : 0;

      for (let i = 0; i < RAY_COUNT; i++) {
        const yOffset = ((i / (RAY_COUNT - 1)) - 0.5) * 0.9;
        const steps = 40;

        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          const { x, y } = rayPath(yOffset, t);

          const dist = Math.abs(t - wavefront);
          const brightness = Math.max(0, 1 - dist * 3.5);
          if (brightness < 0.03) continue;

          const charIndex = Math.floor(brightness * (chars.length - 1));
          const char = chars[Math.min(charIndex, chars.length - 1)];
          if (char === " ") continue;

          const alpha = 0.1 + brightness * 0.7;
          ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(alpha, 0.85)})`;
          ctx.fillText(char, centerX + x * scale, centerY - y * scale);
        }
      }

      // lens outline (two arcs forming a convex lens)
      ctx.strokeStyle = `rgba(0, 0, 0, ${0.25 + flashBoost * 0.3})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, scale * 0.08, scale * 0.55, 0, 0, Math.PI * 2);
      ctx.stroke();

      // focal point flash
      if (flashBoost > 0) {
        ctx.fillStyle = `rgba(0, 0, 0, ${0.5 * flashBoost})`;
        ctx.beginPath();
        ctx.arc(centerX + FOCAL_X * scale, centerY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      time += 0.012;
      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}