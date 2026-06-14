import React from 'react';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────────────────
   AMBIENT FLOATING DECORATIONS
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

const FLOATERS = [
  { type: 'blossom', color: '#FF88AA', top: 8, left: 4, size: 24, rot: 30, fd: 6.5, dd: 8.8, fd2: 0.2, dd2: 1.5 },
  { type: 'blossom', color: '#FFC8D8', top: 18, left: 92, size: 20, rot: 140, fd: 5.9, dd: 8.1, fd2: 0.9, dd2: 2.3 },
  { type: 'leaf', color: '#7DC87A', top: 75, left: 5, size: 22, rot: -30, fd: 6.8, dd: 9.0, fd2: 1.6, dd2: 0.8 },
  { type: 'blossom', color: '#FFB3C6', top: 85, left: 91, size: 23, rot: 250, fd: 6.2, dd: 8.5, fd2: 0.5, dd2: 3.1 },
];

/* ─────────────────────────────────────────────────────────────────────────────
   CORNER FLORAL ORNAMENTS
───────────────────────────────────────────────────────────────────────────── */
const CornerOrnament = ({ position = 'top-left' }) => {
  const isTopLeft = position === 'top-left';
  return (
    <svg
      width="150"
      height="150"
      viewBox="0 0 150 150"
      fill="none"
      className={`absolute ${isTopLeft ? 'top-0 left-0' : 'bottom-0 right-0'
        } opacity-35 pointer-events-none select-none z-10`}
      style={{
        transform: isTopLeft ? 'none' : 'rotate(180deg)',
      }}
    >
      {/* Delicate border guide */}
      <path d="M15 15 H110" stroke="#C9A227" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
      <path d="M15 15 V110" stroke="#C9A227" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />

      {/* Decorative leaf scrolls */}
      <path d="M15 15 C45 45 75 25 110 55" stroke="#C9A227" strokeWidth="0.8" fill="none" />
      <path d="M15 15 C45 45 25 75 55 110" stroke="#C9A227" strokeWidth="0.8" fill="none" />
      <path d="M15 15 Q60 60 90 90" stroke="#C9A227" strokeWidth="0.5" fill="none" opacity="0.5" />

      {/* Floral nodes / petals */}
      <circle cx="110" cy="55" r="3.5" fill="#D4899A" />
      <circle cx="55" cy="110" r="3.5" fill="#D4899A" />
      <circle cx="90" cy="90" r="2.5" fill="#C9A227" />
      <circle cx="70" cy="70" r="2" fill="#D4899A" opacity="0.7" />

      {/* Main corner rose bloom */}
      <circle cx="22" cy="22" r="6" fill="#D4899A" />
      <circle cx="17" cy="18" r="4.5" fill="#FFA0B8" opacity="0.9" />
      <circle cx="27" cy="26" r="4.5" fill="#FFA0B8" opacity="0.9" />
      <circle cx="26" cy="17" r="4" fill="#FF88AA" opacity="0.85" />
      <circle cx="18" cy="27" r="4" fill="#FF88AA" opacity="0.85" />
      <circle cx="22" cy="22" r="2.5" fill="#C9A227" />
    </svg>
  );
};

const VenueMap = () => {
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
    <motion.section
      id="venue-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
      className="w-full py-24 px-4 text-center bg-wedding-blush relative overflow-hidden"
    >
      {/* Corner Floral Ornaments */}
      <CornerOrnament position="top-left" />
      <CornerOrnament position="bottom-right" />

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
            {f.type === 'blossom' ? (
              <CherryBlossom color={f.color} />
            ) : (
              <LeafSprig color={f.color} />
            )}
          </div>
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto relative z-10 flex flex-col items-center"
      >
        {/* Section Title */}
        <motion.h2
          variants={itemVariants}
          className="font-cursive text-[#8B1A3A] text-[48px] md:text-[72px] mb-4 leading-tight select-none"
        >
          Join Us At
        </motion.h2>

        {/* Venue Name */}
        <motion.h3
          variants={itemVariants}
          className="font-serif text-[32px] md:text-[42px] font-[600] text-[#8B1A3A] mb-4 tracking-wide leading-snug"
        >
          Dayal Vatika
        </motion.h3>

        {/* Address */}
        <motion.div
          variants={itemVariants}
          className="font-serif text-[18px] md:text-[22px] text-[#6B1530] mb-10 leading-relaxed max-w-xl text-center px-4"
        >
          <p>Dayal Vatika,</p>
          <p>Sailana Road,</p>
          <p>Banjali,</p>
          <p>Ratlam,</p>
          <p>Madhya Pradesh – 457001</p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          variants={itemVariants}
          className="w-full h-[320px] md:h-[450px] overflow-hidden mb-10 relative shadow-xl"
          style={{
            border: "4px solid #C9A227",
            padding: "8px",
            borderRadius: "28px",
            background: "white",
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.473356070624!2d75.02498277579178!3d23.366307203362143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3963fefd43d2ffe5%3A0x5c43bc98be6a0ed!2sDayal%20Vatika!5e0!3m2!1sen!2sin!4v1718366400000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Dayal Vatika Venue Map"
            className="absolute inset-0"
          ></iframe>
        </motion.div>

        {/* Get Directions Button */}
        <motion.div variants={itemVariants}>
          <a
            href="https://www.google.com/maps/dir//Dayal+Vatika,+Sailana,+road,+Banjali,+Madhya+Pradesh+457001/@23.1479492,75.7930925,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3963fefd43d2ffe5:0x5c43bc98be6a0ed!2m2!1d75.0271677!2d23.3663024"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#C9A227] text-white font-serif tracking-wider py-4 px-9 rounded-full shadow-md hover:bg-[#A8851C] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 transform font-semibold text-base md:text-lg"
          >
            <span className="mr-2">📍</span> Get Directions
          </a>
        </motion.div>

        {/* Optional Message Below Map */}
        <motion.p
          variants={itemVariants}
          className="font-serif italic text-center text-[#6B1530] text-[18px] md:text-[20px] max-w-xl mt-12 leading-relaxed px-4"
        >
          "We look forward to celebrating this special day with you at Dayal Vatika."
        </motion.p>
      </motion.div>
    </motion.section>
  );
};

export default VenueMap;
