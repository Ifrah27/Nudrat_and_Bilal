import React from 'react';
import { motion } from 'framer-motion';

const Bismillah = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
      className="w-full max-w-4xl mx-auto py-16 px-4 text-center relative"
    >
      <div className="bg-wedding-blush-light rounded-3xl p-10 border border-wedding-rose/20 shadow-sm relative overflow-hidden">
        {/* Subtle floral border SVG */}
        <div className="absolute top-0 left-0 w-32 h-32 opacity-10 text-wedding-crimson">
          <svg viewBox="0 0 100 100" fill="currentColor"><path d="M0 0 C 50 0, 100 50, 100 100 L 0 100 Z"/></svg>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32 opacity-10 text-wedding-crimson transform rotate-180">
          <svg viewBox="0 0 100 100" fill="currentColor"><path d="M0 0 C 50 0, 100 50, 100 100 L 0 100 Z"/></svg>
        </div>

        {/* Decorative Divider Top */}
        <div className="flex items-center justify-center mb-6">
          <div className="h-[1px] w-16 bg-wedding-gold/60"></div>
          <div className="mx-4 text-wedding-gold">✧</div>
          <div className="h-[1px] w-16 bg-wedding-gold/60"></div>
        </div>

        {/* Arabic Calligraphy */}
        <h2 className="font-arabic text-4xl md:text-5xl text-wedding-gold mb-6 leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.05)' }}>
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </h2>

        {/* English Translation */}
        <p className="font-serif text-wedding-gold/80 italic text-sm md:text-base max-w-md mx-auto tracking-widest uppercase">
          In the name of Allah, the Most Gracious, the Most Merciful
        </p>

        {/* Decorative Divider Bottom */}
        <div className="flex items-center justify-center mt-6">
          <div className="h-[1px] w-16 bg-wedding-gold/60"></div>
          <div className="mx-4 text-wedding-gold">✧</div>
          <div className="h-[1px] w-16 bg-wedding-gold/60"></div>
        </div>
      </div>
    </motion.section>
  );
};

export default Bismillah;
