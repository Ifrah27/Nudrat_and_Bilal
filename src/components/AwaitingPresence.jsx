import React from 'react';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────────────────
   AMBIENT FLOATING DECORATIONS
   Using local SVGs and existing CSS classes (animate-floral-float / drift)
───────────────────────────────────────────────────────────────────────────── */

const CherryBlossom = ({ color }) => (
  <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
    {[0, 72, 144, 216, 288].map((a, i) => (
      <g key={i} transform={`rotate(${a} 20 20)`}>
        <ellipse cx="20" cy="10" rx="4.2" ry="7.5" fill={color} opacity="0.8" />
      </g>
    ))}
    <circle cx="20" cy="20" r="3.2" fill="#FFD6E0" />
    <circle cx="20" cy="20" r="1.8" fill="#FF6699" />
  </svg>
);

const LeafSprig = ({ color }) => (
  <svg viewBox="0 0 36 48" fill="none" className="w-full h-full">
    <path d="M18 46 Q17 32 18 8" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M18 22 C10 16 4 10 8 4 C12 0 18 8 18 22 Z" fill={color} opacity="0.8" />
    <path d="M18 32 C26 26 32 20 28 14 C24 10 18 20 18 32 Z" fill={color} opacity="0.65" />
  </svg>
);

const FloralBud = ({ color }) => (
  <svg viewBox="0 0 28 36" fill="none" className="w-full h-full">
    <path d="M14 36 Q13 28 14 20" stroke="#8BBF72" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M14 22 C10 20 8 16 10 12 C12 10 14 18 14 22 Z" fill="#8BBF72" opacity="0.8" />
    <path d="M14 22 C18 20 20 16 18 12 C16 10 14 18 14 22 Z" fill="#6FA45B" opacity="0.8" />
    <ellipse cx="14" cy="14" rx="5" ry="7" fill={color} opacity="0.85" />
    <path d="M9 14 C8 8 10 4 14 4 C12 10 10 14 9 14 Z" fill={color} opacity="0.6" />
    <path d="M19 14 C20 8 18 4 14 4 C16 10 18 14 19 14 Z" fill={color} opacity="0.6" />
  </svg>
);

const FLOATERS = [
  { type: 'blossom', color: '#FF88AA', top: 5,   left: 3,   size: 24, rot: 15,  fd: 6.2, dd: 8.5, fd2: 0.1, dd2: 1.2 },
  { type: 'blossom', color: '#FFB3C6', top: 15,  left: 92,  size: 20, rot: 120, fd: 5.8, dd: 7.9, fd2: 0.8, dd2: 2.1 },
  { type: 'leaf',    color: '#7DC87A', top: 25,  left: 6,   size: 22, rot: -45, fd: 6.5, dd: 8.8, fd2: 1.5, dd2: 0.5 },
  { type: 'bud',     color: '#FFA0B8', top: 38,  left: 88,  size: 18, rot: 35,  fd: 5.2, dd: 7.4, fd2: 2.2, dd2: 1.8 },
  { type: 'blossom', color: '#FFC8D8', top: 52,  left: 4,   size: 22, rot: 210, fd: 6.0, dd: 8.2, fd2: 0.4, dd2: 3.0 },
  { type: 'leaf',    color: '#8BBF72', top: 62,  left: 93,  size: 20, rot: 95,  fd: 6.9, dd: 9.1, fd2: 1.8, dd2: 1.1 },
  { type: 'bud',     color: '#F9C0CC', top: 78,  left: 8,   size: 21, rot: -80, fd: 5.5, dd: 7.7, fd2: 2.5, dd2: 2.4 },
  { type: 'blossom', color: '#FF88AA', top: 88,  left: 90,  size: 23, rot: 280, fd: 6.4, dd: 8.7, fd2: 0.7, dd2: 1.6 },
  { type: 'leaf',    color: '#96C875', top: 92,  left: 45,  size: 19, rot: 160, fd: 6.1, dd: 8.0, fd2: 1.2, dd2: 2.8 },
];

const renderFloater = (type, color) => {
  if (type === 'blossom') return <CherryBlossom color={color} />;
  if (type === 'leaf') return <LeafSprig color={color} />;
  if (type === 'bud') return <FloralBud color={color} />;
  return null;
};

/* ─────────────────────────────────────────────────────────────────────────────
   ELEGANT GOLD FLORAL DIVIDER
───────────────────────────────────────────────────────────────────────────── */
const FloralDivider = () => (
  <svg width="150" height="24" viewBox="0 0 150 24" fill="none" className="my-5">
    {/* Center flower */}
    <circle cx="75" cy="12" r="3" fill="#C9A227" />
    <path d="M75 4 Q78 8 75 12 Q72 8 75 4 Z" fill="#C9A227" />
    <path d="M75 20 Q78 16 75 12 Q72 16 75 20 Z" fill="#C9A227" />
    <path d="M67 12 Q71 9 75 12 Q71 15 67 12 Z" fill="#C9A227" />
    <path d="M83 12 Q79 9 75 12 Q79 15 83 12 Z" fill="#C9A227" />
    
    {/* Left scroll / stem */}
    <path d="M15 12 H62" stroke="#C9A227" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M40 12 Q48 6 56 12" stroke="#C9A227" strokeWidth="0.8" fill="none" />
    <circle cx="28" cy="12" r="1.5" fill="#C9A227" />
    
    {/* Right scroll / stem */}
    <path d="M88 12 H135" stroke="#C9A227" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M110 12 Q102 6 94 12" stroke="#C9A227" strokeWidth="0.8" fill="none" />
    <circle cx="122" cy="12" r="1.5" fill="#C9A227" />
  </svg>
);

const AwaitingPresence = () => {
  // Stagger variants for sub-items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="awaiting-presence"
      className="w-full relative overflow-hidden py-24 px-4 flex flex-col items-center justify-center min-h-[90vh]"
      style={{ background: '#FBE9F0' }}
    >
      {/* 🌸 Ambient Floating Decorations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {FLOATERS.map((f, i) => (
          <div
            key={i}
            className="absolute animate-floral-float animate-floral-drift"
            style={{
              top: `${f.top}%`,
              left: `${f.left}%`,
              width: `${f.size}px`,
              height: `${f.size * 1.2}px`,
              transform: `rotate(${f.rot}deg)`,
              '--float-duration': `${f.fd}s`,
              '--drift-duration': `${f.dd}s`,
              '--float-delay': `${f.fd2}s`,
              '--drift-delay': `${f.dd2}s`,
            }}
          >
            {renderFloater(f.type, f.color)}
          </div>
        ))}
      </div>

      {/* Main Content Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 w-full max-w-4xl flex flex-col items-center"
      >
        {/* Main Heading */}
        <motion.h2
          variants={itemVariants}
          style={{
            fontSize: 'var(--heading-size, 72px)',
            '--heading-size': '72px',
          }}
          className="font-cursive text-[#8B1A3A] text-center mb-4 leading-tight select-none text-[48px] md:text-[72px]"
        >
          Awaiting Your Noble Presence
        </motion.h2>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          className="font-serif italic text-center text-[#6B1530] text-[18px] md:text-[22px] max-w-2xl px-4 leading-relaxed"
        >
          "Your presence, prayers and blessings will make our celebration truly special."
        </motion.p>

        {/* Decorative Divider */}
        <motion.div variants={itemVariants}>
          <FloralDivider />
        </motion.div>

        {/* Family Section Card */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-3xl bg-white/65 border border-[#C9A227]/40 rounded-[24px] shadow-lg shadow-[#D4899A]/10 p-8 md:p-12 mt-6 backdrop-blur-sm"
        >
          {/* Header of the Card */}
          <div className="flex flex-col items-center text-center mb-8">
            <span className="text-[#C9A227] tracking-[0.25em] text-xs font-bold uppercase mb-1">
              WITH LOVE
            </span>
            <h3 className="font-cursive text-[#8B1A3A] text-4xl md:text-5xl">
              The Families
            </h3>
            <div className="w-16 h-[1px] bg-[#C9A227]/30 mt-3"></div>
          </div>

          {/* Grid Layout: Two columns on desktop, one column on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative">
            {/* Split divider for desktop */}
            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[1px] bg-[#C9A227]/20 transform -translate-x-1/2" />

            {/* Bride's Family */}
            <div className="flex flex-col items-center text-center">
              <h4 className="font-serif font-bold text-lg md:text-xl text-[#8B1A3A] tracking-wider mb-4 uppercase">
                Bride's Family
              </h4>
              <div className="space-y-2 font-serif text-[#6B1530]">
                <p className="text-xl font-medium tracking-wide">KHAN FAMILY</p>
                <div className="py-1">
                  <p className="text-base text-[#6B1530]/80">Father Name</p>
                  <p className="text-base text-[#6B1530]/80">Mother Name</p>
                </div>
                <div className="h-[1px] w-12 bg-[#C9A227]/30 my-3 mx-auto"></div>
                <p className="text-[14px] italic text-[#A56776] leading-relaxed">
                  Family Members
                </p>
              </div>
            </div>

            {/* Groom's Family */}
            <div className="flex flex-col items-center text-center">
              <h4 className="font-serif font-bold text-lg md:text-xl text-[#8B1A3A] tracking-wider mb-4 uppercase">
                Groom's Family
              </h4>
              <div className="space-y-2 font-serif text-[#6B1530]">
                <p className="text-xl font-medium tracking-wide">KHAN FAMILY</p>
                <div className="py-1">
                  <p className="text-base text-[#6B1530]/80">Father Name</p>
                  <p className="text-base text-[#6B1530]/80">Mother Name</p>
                </div>
                <div className="h-[1px] w-12 bg-[#C9A227]/30 my-3 mx-auto"></div>
                <p className="text-[14px] italic text-[#A56776] leading-relaxed">
                  Family Members
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blessing Quote */}
        <motion.p
          variants={itemVariants}
          className="font-serif italic text-center text-[#6B1530] text-[16px] md:text-[20px] max-w-2xl px-4 mt-12 leading-relaxed"
        >
          "We eagerly await the honor of your presence as we begin this beautiful journey together."
        </motion.p>

        {/* Optional Islamic Ending */}
        <motion.div
          variants={itemVariants}
          className="font-arabic text-[#C9A227] text-[32px] text-center mt-6 tracking-wide select-none"
        >
          جزاك اللهُ خيرًا
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AwaitingPresence;
