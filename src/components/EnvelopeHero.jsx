import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const EnvelopeHero = ({ onRevealComplete }) => {
  const [clicked, setClicked] = useState(false);
  const controls = useAnimation();

  const handleClick = async () => {
    if (clicked) return;
    setClicked(true);

    // "pop up and the main page should be open"
    await controls.start({
      scale: 1.2,
      opacity: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    });

    onRevealComplete();
  };

  return (
    <motion.div
      className="relative w-full h-screen flex items-center justify-center overflow-hidden z-50 absolute inset-0 bg-[#FDF6F7]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* The exact photo provided by the user */}
      <motion.img
        src="/envelope-hero.png"
        alt="Wedding Invitation Envelope"
        className="w-full h-full object-cover md:object-contain cursor-pointer"
        onClick={handleClick}
        animate={controls}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      />
    </motion.div>
  );
};

export default EnvelopeHero;
