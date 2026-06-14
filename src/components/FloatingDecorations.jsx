import React, { useState, useEffect, useMemo } from 'react';

/* ─── Elegant SVG Illustrations ──────────────────────────────────────────── */

const CherryBlossom = ({ color = '#FF88AA' }) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* 5 petals arranged in a circle */}
    {[0, 72, 144, 216, 288].map((angle, i) => (
      <g key={i} transform={`rotate(${angle} 20 20)`}>
        <ellipse cx="20" cy="10" rx="4.5" ry="8" fill={color} opacity="0.85" />
      </g>
    ))}
    {/* Center */}
    <circle cx="20" cy="20" r="3.5" fill="#FFD6E0" />
    <circle cx="20" cy="20" r="2" fill="#FF6699" />
    {/* Stamens */}
    {[0, 60, 120, 180, 240, 300].map((a, i) => (
      <circle
        key={i}
        cx={20 + 5 * Math.cos((a * Math.PI) / 180)}
        cy={20 + 5 * Math.sin((a * Math.PI) / 180)}
        r="0.8"
        fill="#FFB347"
      />
    ))}
  </svg>
);

const RosePetal = ({ color = '#FF6B8A' }) => (
  <svg viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2 C6 8 4 16 6 26 C8 32 10 35 12 35 C14 35 16 32 18 26 C20 16 18 8 12 2 Z"
      fill={color}
      opacity="0.75"
    />
    {/* Vein */}
    <path
      d="M12 6 Q13 18 12 34"
      stroke="rgba(255,255,255,0.4)"
      strokeWidth="0.8"
      fill="none"
    />
  </svg>
);

const LeafSprig = ({ color = '#7DC87A' }) => (
  <svg viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Stem */}
    <path d="M18 46 Q17 32 18 8" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    {/* Left leaf */}
    <path
      d="M18 22 C10 16 4 10 8 4 C12 0 18 8 18 22 Z"
      fill={color}
      opacity="0.85"
    />
    {/* Right leaf */}
    <path
      d="M18 32 C26 26 32 20 28 14 C24 10 18 20 18 32 Z"
      fill={color}
      opacity="0.7"
    />
    {/* Tiny bud at top */}
    <ellipse cx="18" cy="8" rx="3" ry="4" fill={color} opacity="0.9" />
  </svg>
);

const FloralBud = ({ color = '#FFA0B8' }) => (
  <svg viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Stem */}
    <path d="M14 36 Q13 28 14 20" stroke="#8BBF72" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    {/* Sepals */}
    <path d="M14 22 C10 20 8 16 10 12 C12 10 14 18 14 22 Z" fill="#8BBF72" opacity="0.8" />
    <path d="M14 22 C18 20 20 16 18 12 C16 10 14 18 14 22 Z" fill="#6FA45B" opacity="0.8" />
    {/* Petals */}
    <ellipse cx="14" cy="14" rx="5" ry="7" fill={color} opacity="0.85" />
    <path d="M9 14 C8 8 10 4 14 4 C12 10 10 14 9 14 Z" fill={color} opacity="0.6" />
    <path d="M19 14 C20 8 18 4 14 4 C16 10 18 14 19 14 Z" fill={color} opacity="0.6" />
  </svg>
);

const Butterfly = ({ color = '#89B4FA' }) => (
  <svg viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Upper left wing */}
    <path
      d="M24 18 C18 10 6 6 4 14 C2 22 14 26 24 20 Z"
      fill={color}
      opacity="0.8"
    />
    {/* Upper right wing */}
    <path
      d="M24 18 C30 10 42 6 44 14 C46 22 34 26 24 20 Z"
      fill={color}
      opacity="0.8"
    />
    {/* Lower left wing */}
    <path
      d="M24 20 C16 22 8 30 12 34 C16 38 22 28 24 22 Z"
      fill={color}
      opacity="0.6"
    />
    {/* Lower right wing */}
    <path
      d="M24 20 C32 22 40 30 36 34 C32 38 26 28 24 22 Z"
      fill={color}
      opacity="0.6"
    />
    {/* Wing patterns */}
    <circle cx="16" cy="16" r="2.5" fill="rgba(255,255,255,0.3)" />
    <circle cx="32" cy="16" r="2.5" fill="rgba(255,255,255,0.3)" />
    {/* Body */}
    <ellipse cx="24" cy="19" rx="1.5" ry="6" fill="#2C3E50" opacity="0.7" />
    {/* Antennae */}
    <path d="M23 13 Q19 8 17 6" stroke="#2C3E50" strokeWidth="0.8" fill="none" strokeLinecap="round" />
    <path d="M25 13 Q29 8 31 6" stroke="#2C3E50" strokeWidth="0.8" fill="none" strokeLinecap="round" />
    <circle cx="17" cy="6" r="1.2" fill="#2C3E50" />
    <circle cx="31" cy="6" r="1.2" fill="#2C3E50" />
  </svg>
);

const GoldSparkle = ({ color = '#D4AF37' }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* 4-point star */}
    <path
      d="M12 2 L13.2 10.8 L22 12 L13.2 13.2 L12 22 L10.8 13.2 L2 12 L10.8 10.8 Z"
      fill={color}
      opacity="0.9"
    />
    {/* Tiny cross glints */}
    <path d="M12 6 L12 18" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
    <path d="M6 12 L18 12" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
  </svg>
);

/* ─── Element Generation ──────────────────────────────────────────────────── */

const BLOSSOM_COLORS = ['#FF88AA', '#FFB3C6', '#FFC8D8', '#FF7AA8', '#FAD6E0', '#FFD1DC'];
const PETAL_COLORS  = ['#FF6B8A', '#F4607B', '#FF8099', '#F97096'];
const LEAF_COLORS   = ['#7DC87A', '#8BBF72', '#6FA45B', '#96C875'];
const BUD_COLORS    = ['#FFA0B8', '#F9C0CC', '#FF88AA', '#FFB3C6'];
const BUTTERFLY_COLORS = ['#89B4FA', '#A5C8FF', '#B8D4FF'];
const SPARKLE_COLORS   = ['#D4AF37', '#C9A227', '#E2C060', '#F0D080'];

const generateElements = (count) => {
  const pool = [];

  // Fixed proportions: ~18 blossoms, ~12 leaves, ~6 buds, ~3 butterflies, ~12 sparkles + some petals
  const specs = [
    { type: 'blossom',   weight: 20, colors: BLOSSOM_COLORS,   sizeRange: [24, 32] },
    { type: 'petal',     weight: 8,  colors: PETAL_COLORS,      sizeRange: [14, 20] },
    { type: 'leaf',      weight: 12, colors: LEAF_COLORS,        sizeRange: [20, 28] },
    { type: 'bud',       weight: 6,  colors: BUD_COLORS,         sizeRange: [16, 22] },
    { type: 'butterfly', weight: 3,  colors: BUTTERFLY_COLORS,   sizeRange: [28, 36] },
    { type: 'sparkle',   weight: 12, colors: SPARKLE_COLORS,     sizeRange: [10, 16] },
  ];

  const totalWeight = specs.reduce((s, sp) => s + sp.weight, 0);

  for (let i = 0; i < count; i++) {
    let rand = Math.random() * totalWeight;
    let spec = specs[specs.length - 1];
    for (const s of specs) {
      if (rand < s.weight) { spec = s; break; }
      rand -= s.weight;
    }

    const size = Math.floor(spec.sizeRange[0] + Math.random() * (spec.sizeRange[1] - spec.sizeRange[0]));
    const color = spec.colors[Math.floor(Math.random() * spec.colors.length)];

    // 3-layer depth system
    const layerRand = Math.random();
    let opacity, blur, scale, zIndex;
    if (layerRand < 0.25) {
      // Background – soft, blurred, large
      opacity = 0.12 + Math.random() * 0.1;
      blur = 2 + Math.random() * 3;
      scale = 1.4 + Math.random() * 0.5;
      zIndex = 5;
    } else if (layerRand > 0.75) {
      // Foreground – crisp, small
      opacity = 0.75 + Math.random() * 0.25;
      blur = 0;
      scale = 0.75 + Math.random() * 0.2;
      zIndex = 25;
    } else {
      // Middle – balanced
      opacity = 0.45 + Math.random() * 0.3;
      blur = 0;
      scale = 0.9 + Math.random() * 0.3;
      zIndex = 15;
    }

    const top  = Math.random() * 100;
    const left = Math.random() * 100;
    const rotation = Math.random() * 360;
    const floatDuration = 4 + Math.random() * 5;
    const driftDuration = 6 + Math.random() * 6;
    const floatDelay = Math.random() * 6;
    const driftDelay  = Math.random() * 6;

    // Scatter direction: outward from center
    const angle = Math.atan2(top - 50, left - 50);
    const dist = 100 + Math.random() * 180;
    const scatterX = `${Math.cos(angle) * dist}px`;
    const scatterY = `${Math.sin(angle) * dist}px`;

    pool.push({ id: i, type: spec.type, color, size, opacity, blur, scale, zIndex, top, left, rotation, floatDuration, driftDuration, floatDelay, driftDelay, scatterX, scatterY });
  }

  return pool;
};

/* ─── Render SVG ──────────────────────────────────────────────────────────── */

const renderSvg = (type, color) => {
  switch (type) {
    case 'blossom':   return <CherryBlossom color={color} />;
    case 'petal':     return <RosePetal color={color} />;
    case 'leaf':      return <LeafSprig color={color} />;
    case 'bud':       return <FloralBud color={color} />;
    case 'butterfly': return <Butterfly color={color} />;
    case 'sparkle':   return <GoldSparkle color={color} />;
    default: return null;
  }
};

/* ─── Main Component ──────────────────────────────────────────────────────── */

const FloatingDecorations = ({ scatterActive = false }) => {
  const [count, setCount] = useState(50);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640)  setCount(22);
      else if (w < 1024) setCount(35);
      else setCount(50);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const elements = useMemo(() => generateElements(count), [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 20 }}>
      {elements.map((el) => (
        <div
          key={el.id}
          className={scatterActive ? 'decor-scatter' : ''}
          style={{
            position: 'absolute',
            top: `${el.top}%`,
            left: `${el.left}%`,
            zIndex: el.zIndex,
            '--scatter-x': el.scatterX,
            '--scatter-y': el.scatterY,
          }}
        >
          {/* Vertical float */}
          <div
            className="animate-floral-float"
            style={{
              '--float-duration': `${el.floatDuration}s`,
              '--float-delay': `${el.floatDelay}s`,
            }}
          >
            {/* Horizontal drift */}
            <div
              className="animate-floral-drift"
              style={{
                '--drift-duration': `${el.driftDuration}s`,
                '--drift-delay': `${el.driftDelay}s`,
              }}
            >
              <div
                style={{
                  width:  `${el.size}px`,
                  height: `${el.size}px`,
                  opacity: el.opacity,
                  transform: `scale(${el.scale}) rotate(${el.rotation}deg)`,
                  filter: el.blur > 0 ? `blur(${el.blur}px)` : 'none',
                  willChange: 'transform',
                }}
              >
                {renderSvg(el.type, el.color)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingDecorations;
