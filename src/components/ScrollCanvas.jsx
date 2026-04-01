import { useEffect, useRef } from 'react';

// Simple seeded random for deterministic layouts
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

// Ease function for smooth interpolation
function smoothstep(t) {
  return t * t * (3 - 2 * t);
}

// Generate scene layouts — each returns an array of {x, y} in 0..1 space
function generateScenes(count) {
  const scenes = [];

  // Scene 0 — Hero: scattered randomly with gentle clustering
  {
    const rng = seeded(42);
    const pts = [];
    for (let i = 0; i < count; i++) {
      pts.push({
        x: 0.05 + rng() * 0.9,
        y: 0.05 + rng() * 0.9,
      });
    }
    scenes.push(pts);
  }

  // Scene 1 — About: circular arrangement
  {
    const pts = [];
    const rings = [
      { r: 0.12, n: 8 },
      { r: 0.25, n: 16 },
      { r: 0.38, n: 24 },
    ];
    let idx = 0;
    for (const ring of rings) {
      for (let i = 0; i < ring.n && idx < count; i++, idx++) {
        const angle = (i / ring.n) * Math.PI * 2 - Math.PI / 2;
        pts.push({
          x: 0.5 + Math.cos(angle) * ring.r,
          y: 0.5 + Math.sin(angle) * ring.r,
        });
      }
    }
    // Fill remaining with center cluster
    const rng = seeded(99);
    while (pts.length < count) {
      const angle = rng() * Math.PI * 2;
      const r = rng() * 0.06;
      pts.push({ x: 0.5 + Math.cos(angle) * r, y: 0.5 + Math.sin(angle) * r });
    }
    scenes.push(pts);
  }

  // Scene 2 — Projects: structured grid
  {
    const pts = [];
    const cols = Math.ceil(Math.sqrt(count * 1.5));
    const rows = Math.ceil(count / cols);
    let idx = 0;
    for (let r = 0; r < rows && idx < count; r++) {
      for (let c = 0; c < cols && idx < count; c++, idx++) {
        pts.push({
          x: 0.1 + (c / (cols - 1)) * 0.8,
          y: 0.15 + (r / (rows - 1)) * 0.7,
        });
      }
    }
    while (pts.length < count) pts.push({ x: 0.5, y: 0.5 });
    scenes.push(pts);
  }

  // Scene 3 — Experience: flowing wave / timeline
  {
    const pts = [];
    for (let i = 0; i < count; i++) {
      const t = i / (count - 1);
      const x = 0.08 + t * 0.84;
      const wave = Math.sin(t * Math.PI * 3) * 0.15;
      const y = 0.5 + wave + (Math.sin(t * Math.PI * 7) * 0.04);
      pts.push({ x, y });
    }
    scenes.push(pts);
  }

  // Scene 4 — Skills: clustered groups
  {
    const pts = [];
    const centers = [
      { x: 0.25, y: 0.3 },
      { x: 0.75, y: 0.3 },
      { x: 0.5, y: 0.65 },
    ];
    const rng = seeded(77);
    const perGroup = Math.ceil(count / centers.length);
    for (let g = 0; g < centers.length; g++) {
      for (let i = 0; i < perGroup && pts.length < count; i++) {
        const angle = rng() * Math.PI * 2;
        const r = rng() * 0.12;
        pts.push({
          x: centers[g].x + Math.cos(angle) * r,
          y: centers[g].y + Math.sin(angle) * r,
        });
      }
    }
    while (pts.length < count) pts.push({ x: 0.5, y: 0.5 });
    scenes.push(pts);
  }

  // Scene 5 — Contact: spiral inward
  {
    const pts = [];
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 6;
      const r = 0.35 * (1 - t * 0.8);
      pts.push({
        x: 0.5 + Math.cos(angle) * r,
        y: 0.5 + Math.sin(angle) * r,
      });
    }
    scenes.push(pts);
  }

  return scenes;
}

const PARTICLE_COUNT = 80;
const CONNECTION_DIST = 0.1;
const SECTIONS = ['hero', 'about', 'projects', 'experience', 'skills', 'contact'];

export default function ScrollCanvas() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    scenes: generateScenes(PARTICLE_COUNT),
    scrollProgress: 0,
    animFrame: null,
    dpr: 1,
    time: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const state = stateRef.current;
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * state.dpr;
      canvas.height = h * state.dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
    }

    function getScrollProgress() {
      const sectionEls = SECTIONS.map(id => document.getElementById(id)).filter(Boolean);
      if (sectionEls.length === 0) return 0;

      const scrollY = window.scrollY;
      const viewH = window.innerHeight;

      // Find which section we're in and how far through it
      for (let i = sectionEls.length - 1; i >= 0; i--) {
        const rect = sectionEls[i].getBoundingClientRect();
        const top = rect.top + scrollY;
        if (scrollY >= top - viewH * 0.4) {
          const sectionH = rect.height || viewH;
          const progress = Math.min(1, Math.max(0, (scrollY - (top - viewH * 0.4)) / sectionH));
          return Math.min(SECTIONS.length - 1, i + progress);
        }
      }
      return 0;
    }

    function getThemeColors() {
      const style = getComputedStyle(document.documentElement);
      const accent = style.getPropertyValue('--accent').trim() || '#a06510';
      const muted = style.getPropertyValue('--text-muted').trim() || '#6b6b64';
      const border = style.getPropertyValue('--border').trim() || '#e0e0dc';
      return { accent, muted, border };
    }

    function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
        : { r: 160, g: 101, b: 16 };
    }

    function draw(timestamp) {
      state.time = timestamp || 0;
      const { scenes, dpr } = state;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const scrollProg = getScrollProgress();
      // Smooth the scroll progress
      state.scrollProgress += (scrollProg - state.scrollProgress) * 0.08;
      const sp = state.scrollProgress;

      const sceneIndex = Math.floor(sp);
      const sceneT = smoothstep(sp - sceneIndex);
      const fromScene = scenes[Math.min(sceneIndex, scenes.length - 1)];
      const toScene = scenes[Math.min(sceneIndex + 1, scenes.length - 1)];

      const colors = getThemeColors();
      const accentRgb = hexToRgb(colors.accent);
      const mutedRgb = hexToRgb(colors.muted);

      // Compute current particle positions
      const particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const from = fromScene[i];
        const to = toScene[i];
        // Add subtle floating motion
        const drift = Math.sin(state.time * 0.0008 + i * 0.7) * 0.008;
        const driftY = Math.cos(state.time * 0.0006 + i * 1.1) * 0.006;
        const x = (from.x + (to.x - from.x) * sceneT + drift) * w;
        const y = (from.y + (to.y - from.y) * sceneT + driftY) * h;
        particles.push({ x, y, i });
      }

      // Draw connections — kept very faint so they don't fight text
      const connDist = CONNECTION_DIST * Math.max(w, h);
      ctx.lineWidth = 0.4;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connDist) {
            const alpha = (1 - dist / connDist) * 0.08;
            ctx.strokeStyle = `rgba(${mutedRgb.r}, ${mutedRgb.g}, ${mutedRgb.b}, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles — subtle enough to sit behind content
      for (const p of particles) {
        const useAccent = p.i % 5 === 0;
        const rgb = useAccent ? accentRgb : mutedRgb;
        const baseAlpha = useAccent ? 0.35 : 0.18;
        const size = useAccent ? 2 : 1.5;

        const pulse = 1 + Math.sin(state.time * 0.002 + p.i) * 0.12;

        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${baseAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Soft glow for accent particles
        if (useAccent) {
          ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.04)`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, size * pulse * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      state.animFrame = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    state.animFrame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(state.animFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="scroll-canvas"
      aria-hidden="true"
    />
  );
}
