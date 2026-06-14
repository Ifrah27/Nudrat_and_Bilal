import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────────────────
   SMALL FLOATING GREEN LEAF SPRIG
───────────────────────────────────────────────────────────────────────────── */
const FloatingLeaf = () => (
  <motion.svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mb-3 select-none pointer-events-none"
    animate={{ y: [0, -6, 0] }}
    transition={{
      repeat: Infinity,
      duration: 5,
      ease: "easeInOut",
    }}
  >
    {/* Stalk / Stem */}
    <path
      d="M12 20C12 20 12 13 15 9C16.5 7 18 7 19 5C17 6 15 7.5 13 10C11.5 11.8 11.2 13.5 11 15"
      stroke="#8BBF72"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Saffron/Light green leaves */}
    <path
      d="M13.5 11.5C10.5 9.5 8.5 6 9.5 3C11.5 3 13 6.5 14 9.5"
      fill="#A5D68A"
      opacity="0.95"
    />
    <path
      d="M14.5 8C12.5 6 11 3 12 0.5C13.5 1 14.5 4 15 6.5"
      fill="#8BBF72"
      opacity="0.85"
    />
  </motion.svg>
);

const EnvelopeHero = ({ onRevealComplete }) => {
  const [clicked, setClicked] = useState(false);
  const controls = useAnimation();

  // Kick off the entrance fade-in as soon as the component mounts
  React.useEffect(() => {
    controls.start({ opacity: 1, transition: { duration: 0.6, ease: "easeOut" } });
  }, [controls]);

  const handleClick = async () => {
    if (clicked) return;
    setClicked(true);

    // Fade out and scale up the entire landing page for a seamless transition
    await controls.start({
      scale: 1.1,
      opacity: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    });

    onRevealComplete();
  };

  return (
    <motion.div
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden z-50 bg-[#FDF6F7] py-16 px-4"
      initial={{ opacity: 0 }}
      animate={controls}
      exit={{ opacity: 0 }}
    >
      {/* Centered Envelope Image */}
      <motion.img
        src="/envelope-hero.png"
        alt="Wedding Invitation Envelope"
        className="w-[280px] h-[190px] xs:w-[320px] xs:h-[220px] md:w-[480px] md:h-[330px] object-contain cursor-pointer select-none"
        onClick={handleClick}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      {/* Spacing (80px gap) & Text Block */}
      <div className="flex flex-col items-center mt-[80px]">
        {/* Small floating green leaf sprig */}
        <FloatingLeaf />

        {/* Main Title: You're Invited */}
        <h1 className="font-cursive text-[#B03A63] text-[58px] sm:text-[70px] md:text-[80px] leading-none font-normal text-center select-none tracking-normal">
          You're Invited
        </h1>

        {/* Subtitle: Tap the envelope to open your invitation */}
        <p className="font-serif italic text-[#6B1530]/75 text-[16px] md:text-[22px] tracking-[0.5px] font-normal text-center mt-[12px] select-none">
          Tap the envelope to open your invitation
        </p>
      </div>
    </motion.div>
  );
};

export default EnvelopeHero;
