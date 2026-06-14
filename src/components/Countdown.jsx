import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Countdown = () => {
  // Target: December 4, 2026 at 11:00 AM IST (IST is UTC+5:30)
  // Constructing a strict ISO date string: 2026-12-04T11:00:00+05:30
  const targetDate = new Date('2026-12-04T11:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeBlocks = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="w-full py-16 bg-wedding-blush-light relative"
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="text-wedding-rose/50 w-8 h-8">
            <svg viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 21.5c-1.5 0-3-.5-4.2-1.5C3.3 16.5 2 11 2 5.5c5.5 0 11 1.3 14.5 5.8 1.2 1.5 1.5 3 1.5 4.2 0 3-2.5 6-6 6z"/>
            </svg>
          </div>
          <h2 className="font-cursive text-4xl md:text-5xl text-wedding-crimson drop-shadow-sm">
            The Celebration Begins In...
          </h2>
          <div className="text-wedding-rose/50 w-8 h-8 transform -scale-x-100">
             <svg viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 21.5c-1.5 0-3-.5-4.2-1.5C3.3 16.5 2 11 2 5.5c5.5 0 11 1.3 14.5 5.8 1.2 1.5 1.5 3 1.5 4.2 0 3-2.5 6-6 6z"/>
            </svg>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {timeBlocks.map((block, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-xl border-2 border-wedding-gold shadow-md w-20 h-24 md:w-28 md:h-32 flex flex-col items-center justify-center relative overflow-hidden"
            >
              {/* Subtle top glare */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/80 to-transparent"></div>
              
              <span className="font-serif text-3xl md:text-5xl text-wedding-crimson mb-1 md:mb-2 relative z-10">
                {String(block.value).padStart(2, '0')}
              </span>
              <span className="font-serif text-[10px] md:text-xs tracking-widest text-wedding-gold font-bold uppercase relative z-10">
                {block.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Countdown;
