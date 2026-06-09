import { useEffect, useRef, useState } from "react";

interface ArtDecoSunburstProps {
  className?: string;
}

const DOTS = [
  { r: 200, angle: 40 },
  { r: 300, angle: 80 },
  { r: 150, angle: 130 },
  { r: 340, angle: 170 },
  { r: 220, angle: 210 },
  { r: 280, angle: 250 },
  { r: 120, angle: 300 },
  { r: 360, angle: 320 },
  { r: 190, angle: 355 },
  { r: 260, angle: 15 },
  { r: 310, angle: 105 },
  { r: 170, angle: 230 },
  { r: 240, angle: 275 },
  { r: 380, angle: 60 },
];

export function ArtDecoSunburst({ className = "" }: ArtDecoSunburstProps) {
  const [sweep, setSweep] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const PERIOD = 4000;
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = (ts - startRef.current) % PERIOD;
      setSweep((elapsed / PERIOD) * 360);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const cx = 400;
  const cy = 400;
  const maxR = 390;
  const sectors = 12;

  const toXY = (angleDeg: number, radius: number) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  };

  const sweepEndX = cx + maxR * Math.cos(((sweep - 90) * Math.PI) / 180);
  const sweepEndY = cy + maxR * Math.sin(((sweep - 90) * Math.PI) / 180);

  const trailAngle = (sweep - 60 + 360) % 360;
  const trailRad = ((trailAngle - 90) * Math.PI) / 180;
  const largeArc = 0;
  const trailX1 = cx + maxR * Math.cos(trailRad);
  const trailY1 = cy + maxR * Math.sin(trailRad);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} style={{ background: "radial-gradient(ellipse at center, #001a33 0%, #000c1a 60%, #000510 100%)" }}>
      <svg viewBox="0 0 800 800" className="absolute inset-0 w-full h-full">
        <defs>
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#003366" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#000510" stopOpacity="0" />
          </radialGradient>
          <clipPath id="radarClip">
            <circle cx={cx} cy={cy} r={maxR} />
          </clipPath>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="dotGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* фон радара */}
        <circle cx={cx} cy={cy} r={maxR} fill="url(#radarGlow)" />

        {/* концентрические кольца */}
        {[100, 180, 260, 340].map((r) => (
          <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.25" />
        ))}

        {/* 12 секторов */}
        {Array.from({ length: sectors }).map((_, i) => {
          const angle = (i * 360) / sectors;
          const end = toXY(angle, maxR);
          return (
            <line key={i} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="#ffffff" strokeWidth="0.5" opacity="0.25" />
          );
        })}

        {/* крестовина */}
        <line x1={cx} y1={cy - maxR} x2={cx} y2={cy + maxR} stroke="#ffffff" strokeWidth="0.8" opacity="0.35" />
        <line x1={cx - maxR} y1={cy} x2={cx + maxR} y2={cy} stroke="#ffffff" strokeWidth="0.8" opacity="0.35" />

        {/* внешний обод */}
        <circle cx={cx} cy={cy} r={maxR} fill="none" stroke="#4db8ff" strokeWidth="1.5" opacity="0.6" />

        {/* засечки по ободу */}
        {Array.from({ length: 72 }).map((_, i) => {
          const a = (i * 360) / 72;
          const inner = i % 6 === 0 ? maxR - 14 : maxR - 7;
          const p1 = toXY(a, maxR);
          const p2 = toXY(a, inner);
          return <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#4db8ff" strokeWidth="0.8" opacity="0.5" />;
        })}

        {/* след развёртки */}
        <path
          d={`M ${cx} ${cy} L ${trailX1} ${trailY1} A ${maxR} ${maxR} 0 ${largeArc} 1 ${sweepEndX} ${sweepEndY} Z`}
          fill="url(#sweepGrad)"
          clipPath="url(#radarClip)"
          opacity="0.18"
        />
        <defs>
          <radialGradient id="sweepGrad" cx={cx / 800} cy={cy / 800} r="0.5" gradientUnits="objectBoundingBox">
            <stop offset="0%" stopColor="#00ff88" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* линия развёртки */}
        <line
          x1={cx} y1={cy}
          x2={sweepEndX} y2={sweepEndY}
          stroke="#00ff88" strokeWidth="1.5"
          opacity="0.9"
          filter="url(#glow)"
          clipPath="url(#radarClip)"
        />

        {/* светящиеся точки */}
        {DOTS.map((d, i) => {
          const pos = toXY(d.angle, d.r);
          const diff = ((sweep - d.angle + 360) % 360);
          const brightness = diff < 60 ? 1 - diff / 60 : 0;
          if (brightness <= 0) return null;
          return (
            <g key={i} filter="url(#dotGlow)">
              <circle cx={pos.x} cy={pos.y} r={5} fill="#00ff88" opacity={brightness * 0.9} />
              <circle cx={pos.x} cy={pos.y} r={2.5} fill="#ffffff" opacity={brightness} />
            </g>
          );
        })}

        {/* центральная точка */}
        <circle cx={cx} cy={cy} r={4} fill="#4db8ff" opacity="0.9" filter="url(#glow)" />
        <circle cx={cx} cy={cy} r={1.5} fill="#ffffff" />
      </svg>
    </div>
  );
}