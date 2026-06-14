import React from 'react';
import { motion } from 'framer-motion';
import FloatingDecorations from './FloatingDecorations';

const InvitationContent = () => {
  // Animation variants for sequential text reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // 0.3s delay between each line appearing
        delayChildren: 0.5,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const nameVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } }
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
      className="w-full min-h-[120vh] relative overflow-hidden flex flex-col items-center py-16 px-4"
      style={{
        backgroundColor: '#FFF8F0',
        backgroundImage: 'url("/main-bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* If main-bg.png doesn't load, use these fallback watercolor splotches */}
      <div className="absolute inset-0 pointer-events-none opacity-50 z-0" style={{ mixBlendMode: 'multiply' }}>
         <div className="absolute top-20 left-10 w-[30rem] h-[30rem] bg-[#FAD9CD] rounded-full mix-blend-multiply filter blur-[100px]"></div>
         <div className="absolute bottom-20 right-10 w-[30rem] h-[30rem] bg-[#FCDAE1] rounded-full mix-blend-multiply filter blur-[120px]"></div>
         <div className="absolute top-[40%] left-[50%] w-[20rem] h-[20rem] bg-[#FEEBDB] rounded-full mix-blend-multiply filter blur-[80px]"></div>
      </div>

      {/* Removed SVG trees as main-bg.png will provide the exact background layout */}

      {/* Full Floating Decorations System: 40-50 SVG elements, 3-layer depth */}
      <FloatingDecorations scatterActive={false} />

      {/* Sequential Text Reveal Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-20 flex flex-col items-center w-full max-w-2xl mt-12"
      >
        {/* Top Mantras / Bismillah */}
        <motion.h3 variants={itemVariants} className="font-arabic text-[#D06C82] text-[16px] md:text-lg mb-10 tracking-widest text-center" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </motion.h3>

        {/* Text Block 1 */}
        <motion.div variants={itemVariants} className="text-center font-serif text-[#A56776] text-[15px] md:text-[17px] leading-[2.2] tracking-[0.04em] mb-8 w-full">
          <p>By the grace of Allah and the blessings of our elders,</p>
          <p>We solicit your gracious presence on the auspicious occasion of</p>
          <p>the wedding celebration of</p>
        </motion.div>

        {/* Nudrat Name */}
        <motion.h1 
          variants={nameVariants}
          className="font-cursive text-[6rem] md:text-[8rem] leading-[0.8] text-[#F12656] my-4 transform -rotate-2 w-full text-center"
          style={{ textShadow: '1px 2px 2px rgba(241, 38, 86, 0.15)' }}
        >
          Nudrat
        </motion.h1>

        {/* Nudrat Details */}
        <motion.div variants={itemVariants} className="font-serif text-[13px] md:text-[14px] text-[#A56776] mt-4 mb-6 tracking-wide text-center leading-relaxed">
          <p>(D/O [Bride's Father Name] & [Bride's Mother Name])</p>
        </motion.div>

        {/* With Divider */}
        <motion.div variants={itemVariants} className="relative my-6 flex justify-center items-center">
           <h2 className="font-cursive text-5xl md:text-6xl text-[#F12656] transform -rotate-2">
             with
           </h2>
           {/* Tiny flower dotting the 'i' */}
           <div className="absolute top-[-10px] right-[-15px] text-[#F96D8E] w-5 h-5 transform rotate-12">
             <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-.6 2.3-2.3 4.1-4.5 4.8C9.5 8 11.2 9.8 12 12c.8-2.2 2.5-4 4.5-4.8-2.2-.7-3.9-2.5-4.5-4.8z"/></svg>
           </div>
        </motion.div>

        {/* Bilal Name */}
        <motion.h1 
          variants={nameVariants}
          className="font-cursive text-[6rem] md:text-[8rem] leading-[0.8] text-[#F12656] my-4 transform -rotate-2 w-full text-center"
          style={{ textShadow: '1px 2px 2px rgba(241, 38, 86, 0.15)' }}
        >
          Bilal
        </motion.h1>

        {/* Bilal Details */}
        <motion.div variants={itemVariants} className="font-serif text-[13px] md:text-[14px] text-[#A56776] mt-4 mb-16 tracking-wide text-center leading-relaxed">
          <p>(S/O [Groom's Father Name] & [Groom's Mother Name])</p>
        </motion.div>
      </motion.div>

      {/* Bottom right mute button (mimicking video template) */}
      <div className="absolute bottom-6 right-6 z-30 w-10 h-10 bg-black/40 rounded-full flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors">
         <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
         </svg>
      </div>
    </motion.section>
  );
};

export default InvitationContent;
