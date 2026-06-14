import React, {
  useRef, useState, useEffect, useCallback, useMemo
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────────────────
   SVG DECORATIONS  (reuse elegant shapes from FloatingDecorations)
───────────────────────────────────────────────────────────────────────────── */
const CherryBlossom = ({ color = '#FF88AA' }) => (
  <svg viewBox="0 0 40 40" fill="none">
    {[0, 72, 144, 216, 288].map((a, i) => (
      <g key={i} transform={`rotate(${a} 20 20)`}>
        <ellipse cx="20" cy="10" rx="4.5" ry="8" fill={color} opacity="0.85" />
      </g>
    ))}
    <circle cx="20" cy="20" r="3.5" fill="#FFD6E0" />
    <circle cx="20" cy="20" r="2" fill="#FF6699" />
  </svg>
);

const LeafSprig = ({ color = '#7DC87A' }) => (
  <svg viewBox="0 0 36 48" fill="none">
    <path d="M18 46 Q17 32 18 8" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M18 22 C10 16 4 10 8 4 C12 0 18 8 18 22 Z" fill={color} opacity="0.85" />
    <path d="M18 32 C26 26 32 20 28 14 C24 10 18 20 18 32 Z" fill={color} opacity="0.7" />
    <ellipse cx="18" cy="8" rx="3" ry="4" fill={color} opacity="0.9" />
  </svg>
);

const FloralBud = ({ color = '#FFA0B8' }) => (
  <svg viewBox="0 0 28 36" fill="none">
    <path d="M14 36 Q13 28 14 20" stroke="#8BBF72" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M14 22 C10 20 8 16 10 12 C12 10 14 18 14 22 Z" fill="#8BBF72" opacity="0.8" />
    <path d="M14 22 C18 20 20 16 18 12 C16 10 14 18 14 22 Z" fill="#6FA45B" opacity="0.8" />
    <ellipse cx="14" cy="14" rx="5" ry="7" fill={color} opacity="0.85" />
  </svg>
);

const Butterfly = ({ color = '#89B4FA' }) => (
  <svg viewBox="0 0 48 36" fill="none">
    <path d="M24 18 C18 10 6 6 4 14 C2 22 14 26 24 20 Z" fill={color} opacity="0.8" />
    <path d="M24 18 C30 10 42 6 44 14 C46 22 34 26 24 20 Z" fill={color} opacity="0.8" />
    <path d="M24 20 C16 22 8 30 12 34 C16 38 22 28 24 22 Z" fill={color} opacity="0.6" />
    <path d="M24 20 C32 22 40 30 36 34 C32 38 26 28 24 22 Z" fill={color} opacity="0.6" />
    <ellipse cx="24" cy="19" rx="1.5" ry="6" fill="#2C3E50" opacity="0.7" />
    <path d="M23 13 Q19 8 17 6" stroke="#2C3E50" strokeWidth="0.8" fill="none" strokeLinecap="round" />
    <path d="M25 13 Q29 8 31 6" stroke="#2C3E50" strokeWidth="0.8" fill="none" strokeLinecap="round" />
    <circle cx="17" cy="6" r="1.2" fill="#2C3E50" />
    <circle cx="31" cy="6" r="1.2" fill="#2C3E50" />
  </svg>
);

const GoldSparkle = ({ color = '#D4AF37' }) => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2 L13.2 10.8 L22 12 L13.2 13.2 L12 22 L10.8 13.2 L2 12 L10.8 10.8 Z" fill={color} opacity="0.9" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────────────────────
   AMBIENT FLOATING DECORATIONS  (background layer around the section)
───────────────────────────────────────────────────────────────────────────── */
const AMBIENT = [
  { type: 'blossom', color: '#FF88AA', top: 5,  left: 4,  size: 28, rot: 15,  fd: 5.2, dd: 7.1, fd2: 0.3, dd2: 1.1 },
  { type: 'blossom', color: '#FFB3C6', top: 12, left: 88, size: 24, rot: 200, fd: 6.1, dd: 8.3, fd2: 1.2, dd2: 2.4 },
  { type: 'blossom', color: '#FF7AA8', top: 75, left: 6,  size: 26, rot: 80,  fd: 4.8, dd: 6.5, fd2: 2.1, dd2: 0.8 },
  { type: 'blossom', color: '#FFC8D8', top: 82, left: 91, size: 30, rot: 300, fd: 5.7, dd: 7.8, fd2: 0.8, dd2: 3.2 },
  { type: 'blossom', color: '#FF88AA', top: 45, left: 2,  size: 22, rot: 130, fd: 6.4, dd: 9.1, fd2: 3.5, dd2: 1.7 },
  { type: 'blossom', color: '#FFB3C6', top: 55, left: 95, size: 25, rot: 260, fd: 5.0, dd: 7.3, fd2: 1.8, dd2: 4.2 },
  { type: 'leaf',    color: '#7DC87A', top: 20, left: 7,  size: 22, rot: -30, fd: 7.2, dd: 9.5, fd2: 0.5, dd2: 2.9 },
  { type: 'leaf',    color: '#8BBF72', top: 65, left: 92, size: 20, rot: 45,  fd: 6.8, dd: 8.7, fd2: 2.7, dd2: 1.3 },
  { type: 'leaf',    color: '#96C875', top: 90, left: 40, size: 18, rot: 120, fd: 5.5, dd: 7.9, fd2: 1.1, dd2: 3.8 },
  { type: 'bud',    color: '#FFA0B8', top: 30, left: 93, size: 20, rot: 200, fd: 5.8, dd: 8.1, fd2: 0.9, dd2: 2.1 },
  { type: 'bud',    color: '#F9C0CC', top: 70, left: 3,  size: 18, rot: 60,  fd: 6.3, dd: 7.6, fd2: 3.2, dd2: 0.5 },
  { type: 'butterfly', color: '#89B4FA', top: 15, left: 50, size: 32, rot: 0, fd: 7.5, dd: 10.2, fd2: 1.6, dd2: 3.5 },
  { type: 'sparkle', color: '#D4AF37', top: 8,  left: 70, size: 14, rot: 45, fd: 3.9, dd: 5.5, fd2: 0.4, dd2: 1.2 },
  { type: 'sparkle', color: '#C9A227', top: 92, left: 25, size: 12, rot: 20, fd: 4.2, dd: 6.1, fd2: 2.3, dd2: 0.7 },
  { type: 'sparkle', color: '#E2C060', top: 50, left: 97, size: 13, rot: 75, fd: 3.6, dd: 5.8, fd2: 1.5, dd2: 2.8 },
];

const renderAmbientSvg = (type, color) => {
  if (type === 'blossom')   return <CherryBlossom color={color} />;
  if (type === 'leaf')      return <LeafSprig color={color} />;
  if (type === 'bud')       return <FloralBud color={color} />;
  if (type === 'butterfly') return <Butterfly color={color} />;
  if (type === 'sparkle')   return <GoldSparkle color={color} />;
  return null;
};

/* ─────────────────────────────────────────────────────────────────────────────
   CELEBRATION PARTICLES  (fall from top after scratch reveal)
───────────────────────────────────────────────────────────────────────────── */
const PARTICLE_COLORS = [
  '#FF88AA', '#FFB3C6', '#FF6B8A', '#FFC8D8',
  '#FAD6E0', '#D4AF37', '#C9A227', '#FF7AA8',
  '#8BBF72', '#7DC87A', '#FFA0B8',
];

const generateParticles = (count = 60) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,          // vw %
    size: 8 + Math.random() * 18,
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    duration: 3.5 + Math.random() * 2,
    delay: Math.random() * 1.5,
    drift: (Math.random() - 0.5) * 200,  // px horizontal drift
    rotate: Math.random() * 720 - 360,
    type: Math.random() > 0.4 ? 'petal' : 'sparkle',
  }));

const PetalParticle = ({ color }) => (
  <svg viewBox="0 0 20 30" fill="none">
    <path
      d="M10 2 C6 8 4 16 6 24 C8 30 10 32 10 32 C10 32 12 30 14 24 C16 16 14 8 10 2 Z"
      fill={color} opacity="0.8"
    />
    <path d="M10 5 Q11 16 10 31" stroke="rgba(255,255,255,0.4)" strokeWidth="0.7" fill="none" />
  </svg>
);

const SparkleParticle = ({ color }) => (
  <svg viewBox="0 0 20 20" fill="none">
    <path
      d="M10 1 L11.5 8.5 L19 10 L11.5 11.5 L10 19 L8.5 11.5 L1 10 L8.5 8.5 Z"
      fill={color} opacity="0.85"
    />
  </svg>
);

/* ─────────────────────────────────────────────────────────────────────────────
   COUNTDOWN  (embedded inside this section)
───────────────────────────────────────────────────────────────────────────── */
const TARGET = new Date('2026-12-04T11:00:00+05:30').getTime();

const getTimeLeft = () => {
  const dist = TARGET - Date.now();
  if (dist <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days:    Math.floor(dist / 86400000),
    hours:   Math.floor((dist % 86400000) / 3600000),
    minutes: Math.floor((dist % 3600000) / 60000),
    seconds: Math.floor((dist % 60000) / 1000),
  };
};

const CountdownBlock = ({ value, label, revealed }) => {
  const display = String(value).padStart(2, '0');
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.85 }}
      animate={revealed ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-md"
      style={{
        border: '1.5px solid #EDB8C8',
        minWidth: 72,
        padding: '18px 20px 14px',
      }}
    >
      <span
        className="font-serif leading-none"
        style={{ fontSize: 48, color: '#8B1A3A', fontWeight: 700, lineHeight: 1 }}
      >
        {display}
      </span>
      <span
        className="font-serif tracking-widest uppercase mt-2"
        style={{ fontSize: 10, color: '#A64D6C', letterSpacing: '0.18em', fontWeight: 600 }}
      >
        {label}
      </span>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */
const ScratchReveal = () => {
  const canvasRef    = useRef(null);
  const sectionRef   = useRef(null);
  const [revealed,   setRevealed]   = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [glowing,    setGlowing]    = useState(false);
  const [timeLeft,   setTimeLeft]   = useState(getTimeLeft);
  const isDrawing    = useRef(false);
  const hasRevealed  = useRef(false);
  const particles    = useMemo(() => generateParticles(65), []);

  /* Countdown tick */
  useEffect(() => {
    const t = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  /* Canvas setup */
  useEffect(() => {
    if (revealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Fill scratch layer with blush gradient
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0,   '#F6D1DD');
    grad.addColorStop(0.5, '#EFA6C2');
    grad.addColorStop(1,   '#D97BA7');
    ctx.fillStyle = grad;
    ctx.roundRect(0, 0, canvas.width, canvas.height, 24);
    ctx.fill();

    // Center label
    ctx.font = "28px 'Cormorant Garamond', Georgia, serif";
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle    = 'rgba(255,255,255,0.88)';
    ctx.fillText('✦  SCRATCH TO REVEAL  ✦', canvas.width / 2, canvas.height / 2);

    // Subtle sparkle hints
    for (let i = 0; i < 18; i++) {
      const sx = Math.random() * canvas.width;
      const sy = Math.random() * canvas.height;
      const sr = 1.5 + Math.random() * 2;
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${0.15 + Math.random() * 0.2})`;
      ctx.fill();
    }
  }, [revealed]);

  /* Check scratch coverage */
  const checkCoverage = useCallback(() => {
    if (hasRevealed.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    const total = data.length / 4;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 20) transparent++;
    }
    if (transparent / total > 0.45) {
      hasRevealed.current = true;
      triggerReveal();
    }
  }, []);

  const triggerReveal = () => {
    setRevealed(true);
    setGlowing(true);
    setShowParticles(true);
    setTimeout(() => setShowParticles(false), 5500);
    setTimeout(() => setGlowing(false), 3000);
  };

  /* Scratch drawing helpers */
  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top)  * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top)  * scaleY,
    };
  };

  const scratch = (e) => {
    if (!isDrawing.current || revealed) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getPos(e, canvas);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();
    checkCoverage();
  };

  const startScratch = (e) => {
    if (revealed) return;
    e.preventDefault();
    isDrawing.current = true;
    scratch(e);
  };
  const stopScratch = () => { isDrawing.current = false; };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFF8F0 0%, #FDE8EF 40%, #FFF8F0 100%)',
        padding: '80px 16px 80px',
      }}
    >
      {/* ── Ambient floating decorations ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        {AMBIENT.map((el, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top:  `${el.top}%`,
              left: `${el.left}%`,
              width:  el.size,
              height: el.size,
              opacity: 0.55,
              transform: `rotate(${el.rot}deg)`,
              animation: `floatSec ${el.fd}s ease-in-out ${el.fd2}s infinite, driftSec ${el.dd}s ease-in-out ${el.dd2}s infinite`,
            }}
          >
            {renderAmbientSvg(el.type, el.color)}
          </div>
        ))}
      </div>

      {/* ── Celebration particles (fall from top) ── */}
      <AnimatePresence>
        {showParticles && (
          <div
            className="fixed inset-0 pointer-events-none overflow-hidden"
            style={{ zIndex: 9999 }}
          >
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ y: -60, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
                animate={{
                  y: '105vh',
                  x: `calc(${p.x}vw + ${p.drift}px)`,
                  opacity: [1, 1, 0.8, 0],
                  rotate: p.rotate,
                }}
                transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
                style={{ position: 'absolute', top: 0, width: p.size, height: p.size * 1.5 }}
              >
                {p.type === 'petal'
                  ? <PetalParticle color={p.color} />
                  : <SparkleParticle color={p.color} />
                }
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* ── Section heading ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative text-center mb-10"
        style={{ zIndex: 10 }}
      >
        <p
          className="font-serif uppercase tracking-widest mb-2"
          style={{ fontSize: 12, color: '#A64D6C', letterSpacing: '0.3em' }}
        >
          ✦ &nbsp; An Elegant Moment Awaits &nbsp; ✦
        </p>
        <h2
          className="font-cursive"
          style={{ fontSize: 52, color: '#8B1A3A', lineHeight: 1.1 }}
        >
          Save The Date
        </h2>
        <div
          className="mx-auto mt-3"
          style={{ width: 80, height: 1.5, background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
        />
      </motion.div>

      {/* ── Scratch Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="relative mx-auto"
        style={{
          zIndex: 10,
          width: '100%',
          maxWidth: 700,
        }}
      >
        {/* Glow ring */}
        <AnimatePresence>
          {glowing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                position: 'absolute',
                inset: -8,
                borderRadius: 32,
                background: 'transparent',
                boxShadow: '0 0 40px 12px rgba(212,175,55,0.45), 0 0 80px 24px rgba(255,136,170,0.25)',
                zIndex: -1,
              }}
            />
          )}
        </AnimatePresence>

        {/* Revealed card (sits behind canvas) */}
        <div
          style={{
            width: '100%',
            height: 220,
            background: '#FFFFFF',
            borderRadius: 24,
            border: '1.5px solid #EDB8C8',
            boxShadow: '0 8px 40px rgba(139,26,58,0.10), 0 2px 8px rgba(0,0,0,0.06)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle corner ornaments */}
          {['top-3 left-3 border-t border-l', 'top-3 right-3 border-t border-r',
            'bottom-3 left-3 border-b border-l', 'bottom-3 right-3 border-b border-r'].map((cls, i) => (
            <div key={i} className={`absolute ${cls} w-6 h-6 border-[#D4AF37] opacity-50`} />
          ))}

          <p
            className="font-serif uppercase tracking-widest"
            style={{ fontSize: 13, color: '#8B1A3A', letterSpacing: '0.5em' }}
          >
            SAVE THE DATE
          </p>
          <div style={{ width: 50, height: 1, background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />
          <p
            className="font-cursive text-center"
            style={{
              fontSize: 'clamp(42px, 8vw, 72px)',
              color: '#8B1A3A',
              lineHeight: 1.1,
              textShadow: '1px 2px 4px rgba(139,26,58,0.15)',
            }}
          >
            3rd &amp; 4th December 2026
          </p>
          <div style={{ width: 50, height: 1, background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />
          <p
            className="font-serif uppercase tracking-widest"
            style={{ fontSize: 11, color: '#A64D6C', letterSpacing: '0.35em' }}
          >
            Nikah &nbsp;·&nbsp; Walima &nbsp;·&nbsp; Dayal Vatika, Ratlam
          </p>
        </div>

        {/* Canvas scratch overlay */}
        {!revealed && (
          <canvas
            ref={canvasRef}
            width={700}
            height={220}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: 24,
              cursor: 'crosshair',
              touchAction: 'none',
            }}
            onMouseDown={startScratch}
            onMouseMove={scratch}
            onMouseUp={stopScratch}
            onMouseLeave={stopScratch}
            onTouchStart={startScratch}
            onTouchMove={scratch}
            onTouchEnd={stopScratch}
          />
        )}

        {/* "Scratch hint" finger animation */}
        {!revealed && (
          <motion.div
            animate={{ x: [-30, 30, -30], opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            style={{
              position: 'absolute',
              bottom: 16,
              right: '50%',
              transform: 'translateX(50%)',
              fontSize: 22,
              pointerEvents: 'none',
              zIndex: 20,
              filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))',
            }}
          >
            👆
          </motion.div>
        )}
      </motion.div>

      {/* ── Countdown ── */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative text-center mt-14"
            style={{ zIndex: 10 }}
          >
            {/* Header */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
              <p
                className="font-serif uppercase tracking-widest"
                style={{ fontSize: 11, color: '#A64D6C', letterSpacing: '0.35em', whiteSpace: 'nowrap' }}
              >
                ✦ &nbsp; Counting Down &nbsp; ✦
              </p>
              <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
            </div>

            <h3
              className="font-cursive mb-8"
              style={{ fontSize: 'clamp(32px, 6vw, 52px)', color: '#8B1A3A', lineHeight: 1.1 }}
            >
              The Celebration Begins In…
            </h3>

            {/* Blocks */}
            <div
              className="flex flex-wrap justify-center"
              style={{ gap: 16 }}
            >
              {[
                { label: 'DAYS',    value: timeLeft.days },
                { label: 'HOURS',   value: timeLeft.hours },
                { label: 'MINUTES', value: timeLeft.minutes },
                { label: 'SECONDS', value: timeLeft.seconds },
              ].map((b, i) => (
                <CountdownBlock key={b.label} {...b} revealed={revealed} />
              ))}
            </div>

            <p
              className="font-serif mt-6"
              style={{ fontSize: 12, color: '#A64D6C', letterSpacing: '0.2em', opacity: 0.7 }}
            >
              4 December 2026 &nbsp;·&nbsp; 11:00 AM IST
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ScratchReveal;
