import React, { useState } from 'react';
import { motion } from 'framer-motion';

/* ─────────────────────────────────────────────────────────────────────────────
   THEME  (matches the rest of the website)
   blush   #FDE8EF  |  cream  #FFF8F0  |  crimson  #8B1A3A
   rose    #D4899A  |  gold   #C9A227  |  text     #6B1530
───────────────────────────────────────────────────────────────────────────── */

const EVENTS = [
  {
    id: 'haldi',
    name: 'Haldi Ceremony',
    description: 'A joyful celebration filled with laughter, love and blessings',
    date: '3rd December 2026',
    time: '12:00 PM onwards',
    venue: 'Dayal Vatika, Ratlam',
    image: '/haldi.jpg',
    fallbackGradient: 'linear-gradient(160deg, #F9C74F 0%, #F4A261 55%, #E76F51 100%)',
    accentColor: '#E8832A',
  },
  {
    id: 'mehendi',
    name: 'Mehendi Ceremony',
    description: 'An enchanting evening of colors, music and beautiful henna art',
    date: '3rd December 2026',
    time: '7:00 PM onwards',
    venue: 'Dayal Vatika, Ratlam',
    image: '/mehendi.jpg',
    fallbackGradient: 'linear-gradient(160deg, #52B788 0%, #2D6A4F 55%, #1B4332 100%)',
    accentColor: '#52B788',
  },
  {
    id: 'nikah',
    name: 'Nikah Ceremony',
    description: 'The sacred union witnessed with joy by family and friends',
    date: '4th December 2026',
    time: '11:00 AM',
    venue: 'Dayal Vatika, Ratlam',
    image: '/nikah.jpg',
    fallbackGradient: 'linear-gradient(160deg, #C9A0B4 0%, #8B1A3A 55%, #5A0F26 100%)',
    accentColor: '#C9A227',
  },
  {
    id: 'walima',
    name: 'Walima Reception',
    description: 'A grand celebration of love, gratitude and shared togetherness',
    date: '5th December 2026',
    time: '7:00 PM onwards',
    venue: 'Dayal Vatika, Ratlam',
    image: '/walima.jpg',
    fallbackGradient: 'linear-gradient(160deg, #E9C46A 0%, #B5838D 55%, #6D2B3D 100%)',
    accentColor: '#C9A227',
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   AMBIENT FLOATING DECORATIONS  (blush palette — matches site)
───────────────────────────────────────────────────────────────────────────── */
const CherryBlossom = ({ color }) => (
  <svg viewBox="0 0 40 40" fill="none">
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
  <svg viewBox="0 0 36 48" fill="none">
    <path d="M18 46 Q17 32 18 8" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M18 22 C10 16 4 10 8 4 C12 0 18 8 18 22 Z" fill={color} opacity="0.8" />
    <path d="M18 32 C26 26 32 20 28 14 C24 10 18 20 18 32 Z" fill={color} opacity="0.65" />
  </svg>
);

const Butterfly = ({ color }) => (
  <svg viewBox="0 0 48 36" fill="none">
    <path d="M24 18 C18 10 6 6 4 14 C2 22 14 26 24 20 Z" fill={color} opacity="0.75" />
    <path d="M24 18 C30 10 42 6 44 14 C46 22 34 26 24 20 Z" fill={color} opacity="0.75" />
    <path d="M24 20 C16 22 8 30 12 34 C16 38 22 28 24 22 Z" fill={color} opacity="0.5" />
    <path d="M24 20 C32 22 40 30 36 34 C32 38 26 28 24 22 Z" fill={color} opacity="0.5" />
    <ellipse cx="24" cy="19" rx="1.3" ry="5.5" fill="#6B1530" opacity="0.6" />
    <path d="M23 14 Q19 9 17 7" stroke="#6B1530" strokeWidth="0.7" fill="none" strokeLinecap="round" />
    <path d="M25 14 Q29 9 31 7" stroke="#6B1530" strokeWidth="0.7" fill="none" strokeLinecap="round" />
    <circle cx="17" cy="7" r="1" fill="#6B1530" />
    <circle cx="31" cy="7" r="1" fill="#6B1530" />
  </svg>
);

const FLOATERS = [
  { type: 'blossom',   color: '#FF88AA', top: 3,  left: 2,  size: 22, rot: 20,  fd: 5.1, dd: 7.2, fd2: 0.2, dd2: 1.0 },
  { type: 'blossom',   color: '#FFB3C6', top: 8,  left: 91, size: 20, rot: 190, fd: 6.3, dd: 8.5, fd2: 1.4, dd2: 2.5 },
  { type: 'blossom',   color: '#D4899A', top: 88, left: 4,  size: 24, rot: 75,  fd: 4.9, dd: 6.8, fd2: 2.2, dd2: 0.9 },
  { type: 'blossom',   color: '#FFC8D8', top: 84, left: 94, size: 20, rot: 310, fd: 5.8, dd: 7.9, fd2: 0.7, dd2: 3.1 },
  { type: 'blossom',   color: '#FF88AA', top: 48, left: 1,  size: 18, rot: 135, fd: 6.5, dd: 9.0, fd2: 3.6, dd2: 1.8 },
  { type: 'blossom',   color: '#E8A8BC', top: 32, left: 96, size: 19, rot: 250, fd: 5.2, dd: 7.4, fd2: 1.9, dd2: 4.3 },
  { type: 'leaf',      color: '#7DC87A', top: 18, left: 5,  size: 20, rot: -25, fd: 7.0, dd: 9.3, fd2: 0.6, dd2: 2.8 },
  { type: 'leaf',      color: '#8BBF72', top: 70, left: 93, size: 18, rot: 50,  fd: 6.7, dd: 8.6, fd2: 2.8, dd2: 1.4 },
  { type: 'leaf',      color: '#96C875', top: 94, left: 46, size: 16, rot: 115, fd: 5.4, dd: 7.8, fd2: 1.2, dd2: 3.9 },
  { type: 'butterfly', color: '#D4899A', top: 6,  left: 53, size: 26, rot: 0,   fd: 7.8, dd: 10.5, fd2: 1.7, dd2: 3.6 },
  { type: 'butterfly', color: '#C9A0B4', top: 62, left: 47, size: 22, rot: 10,  fd: 6.9, dd: 9.2,  fd2: 0.4, dd2: 1.5 },
];

const renderFloater = (type, color) => {
  if (type === 'blossom')   return <CherryBlossom color={color} />;
  if (type === 'leaf')      return <LeafSprig color={color} />;
  if (type === 'butterfly') return <Butterfly color={color} />;
  return null;
};

/* ─────────────────────────────────────────────────────────────────────────────
   CRESCENT MOON
───────────────────────────────────────────────────────────────────────────── */
const CrescentMoon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <path
      d="M26 16.5C26 22.299 21.299 27 15.5 27C11.48 27 8.01 24.756 6.25 21.5C7.25 21.827 8.353 22 9.5 22C15.299 22 20 17.299 20 11.5C20 9.59 19.47 7.806 18.55 6.284C22.963 7.755 26 11.784 26 16.5Z"
      fill="#C9A227"
    />
    <circle cx="23" cy="8" r="1" fill="#C9A227" opacity="0.5" />
    <circle cx="26" cy="11" r="0.7" fill="#C9A227" opacity="0.35" />
  </svg>
);

/* ─────────────────────────────────────────────────────────────────────────────
   SINGLE EVENT CARD
───────────────────────────────────────────────────────────────────────────── */
const EventCard = ({ event, index }) => {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay: index * 0.13, ease: 'easeOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        width: '100%',
        height: 300,
        borderRadius: 20,
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: hovered
          ? '0 20px 50px rgba(139,26,58,0.22), 0 6px 18px rgba(0,0,0,0.14)'
          : '0 6px 24px rgba(139,26,58,0.10), 0 2px 8px rgba(0,0,0,0.07)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0px)',
        transition: 'all 0.5s cubic-bezier(0.25,0.46,0.45,0.94)',
        border: '1.5px solid rgba(201,162,39,0.25)',
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: imgError ? event.fallbackGradient : undefined,
          transform: hovered ? 'scale(1.07)' : 'scale(1.0)',
          transition: 'transform 0.65s cubic-bezier(0.25,0.46,0.45,0.94)',
          willChange: 'transform',
        }}
      >
        {!imgError && (
          <img
            src={event.image}
            alt={event.name}
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        )}
      </div>

      {/* Blush-tinted overlay — lighter than before, site-themed */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: hovered
            ? 'linear-gradient(180deg, rgba(253,232,239,0.08) 0%, rgba(107,21,48,0.42) 45%, rgba(107,21,48,0.78) 100%)'
            : 'linear-gradient(180deg, rgba(253,232,239,0.05) 0%, rgba(107,21,48,0.32) 45%, rgba(107,21,48,0.72) 100%)',
          transition: 'background 0.5s ease',
        }}
      />

      {/* Gold top accent stripe */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: 2.5,
          background: `linear-gradient(90deg, transparent, ${event.accentColor}, transparent)`,
        }}
      />

      {/* Gold corner ornaments */}
      {[
        { top: 12, left: 12, borderTop: '1.5px solid', borderLeft: '1.5px solid' },
        { top: 12, right: 12, borderTop: '1.5px solid', borderRight: '1.5px solid' },
        { bottom: 12, left: 12, borderBottom: '1.5px solid', borderLeft: '1.5px solid' },
        { bottom: 12, right: 12, borderBottom: '1.5px solid', borderRight: '1.5px solid' },
      ].map((s, i) => (
        <div key={i} style={{ position: 'absolute', width: 18, height: 18, borderColor: 'rgba(201,162,39,0.6)', ...s }} />
      ))}

      {/* Card text content — pushed to bottom */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0 20px 22px',
          textAlign: 'center',
        }}
      >
        {/* Event name */}
        <h3
          style={{
            fontFamily: '"Burgues Script","Bickham Script Pro","Pinyon Script","Great Vibes",cursive',
            fontSize: 'clamp(32px, 4vw, 52px)',
            color: '#FFFFFF',
            lineHeight: 1.0,
            textShadow: '0 2px 16px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.7)',
            marginBottom: 7,
            transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
            transition: 'transform 0.5s ease',
          }}
        >
          {event.name}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontStyle: 'italic',
            fontSize: 'clamp(12px, 1.4vw, 15px)',
            color: 'rgba(255,240,245,0.92)',
            lineHeight: 1.45,
            textShadow: '0 1px 5px rgba(0,0,0,0.45)',
            marginBottom: 12,
            maxWidth: 300,
          }}
        >
          {event.description}
        </p>

        {/* Gold hairline divider */}
        <div
          style={{
            width: 48,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${event.accentColor}, transparent)`,
            marginBottom: 11,
            opacity: 0.9,
          }}
        />

        {/* Details */}
        <div
          style={{
            display: 'flex',
            gap: 'clamp(10px, 2.5vw, 24px)',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {[
            { label: 'Date',  value: event.date },
            { label: 'Time',  value: event.time },
            { label: 'Venue', value: event.venue },
          ].map((d, i) => (
            <React.Fragment key={d.label}>
              {i > 0 && (
                <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.25)' }} />
              )}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <span style={{
                  fontSize: 8,
                  letterSpacing: '0.32em',
                  color: 'rgba(255,240,245,0.7)',
                  textTransform: 'uppercase',
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 600,
                }}>
                  {d.label}
                </span>
                <span style={{
                  fontSize: 'clamp(11px, 1.3vw, 14px)',
                  color: '#FFFFFF',
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                }}>
                  {d.value}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────────────────────────────────────── */
const Events = () => (
  <section
    className="relative w-full overflow-hidden"
    style={{
      /* Matches the site's blush → cream → blush gradient */
      background: 'linear-gradient(180deg, #FDE8EF 0%, #FFF8F0 35%, #FBE9F0 75%, #FDE8EF 100%)',
      padding: '80px 24px 90px',
    }}
  >
    {/* Soft pink radial bloom behind heading */}
    <div
      style={{
        position: 'absolute',
        top: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: 600, height: 260,
        background: 'radial-gradient(ellipse, rgba(212,137,154,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />

    {/* Ambient floating decorations */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
      {FLOATERS.map((el, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top:  `${el.top}%`,
            left: `${el.left}%`,
            width: el.size, height: el.size,
            opacity: 0.50,
            transform: `rotate(${el.rot}deg)`,
            animation: `floatSec ${el.fd}s ease-in-out ${el.fd2}s infinite, driftSec ${el.dd}s ease-in-out ${el.dd2}s infinite`,
          }}
        >
          {renderFloater(el.type, el.color)}
        </div>
      ))}
    </div>

    {/* Section header */}
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      className="relative text-center mb-12"
      style={{ zIndex: 10 }}
    >
      <div className="flex justify-center mb-3">
        <CrescentMoon />
      </div>

      <p style={{
        fontSize: 10,
        letterSpacing: '0.42em',
        color: '#C9A227',
        textTransform: 'uppercase',
        fontFamily: 'Cormorant Garamond, serif',
        fontWeight: 600,
        marginBottom: 10,
      }}>
        ✦ &nbsp; Nudrat &amp; Bilal &nbsp; ✦
      </p>

      <h2 style={{
        fontFamily: '"Burgues Script","Bickham Script Pro","Pinyon Script","Great Vibes",cursive',
        fontSize: 'clamp(42px, 7vw, 72px)',
        color: '#8B1A3A',
        lineHeight: 1.0,
        marginBottom: 16,
        textShadow: '0 1px 12px rgba(139,26,58,0.12)',
      }}>
        Wedding Celebrations
      </h2>

      <div style={{
        width: 100,
        height: 1.5,
        background: 'linear-gradient(90deg, transparent, #C9A227, transparent)',
        margin: '0 auto',
      }} />
    </motion.div>

    {/* 2 × 2 card grid */}
    <div
      className="relative"
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
        gap: 28,
        zIndex: 10,
      }}
    >
      {EVENTS.map((event, i) => (
        <EventCard key={event.id} event={event} index={i} />
      ))}
    </div>

    {/* Bottom note */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: 0.4 }}
      className="text-center mt-12 relative"
      style={{ zIndex: 10 }}
    >
      <div style={{
        width: 70,
        height: 1,
        background: 'linear-gradient(90deg, transparent, #C9A227, transparent)',
        margin: '0 auto 14px',
      }} />
      <p style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontStyle: 'italic',
        fontSize: 15,
        color: '#A56776',
        letterSpacing: '0.05em',
      }}>
        All celebrations at &nbsp;
        <span style={{ color: '#8B1A3A', fontStyle: 'normal', fontWeight: 600 }}>
          Dayal Vatika, Ratlam
        </span>
      </p>
    </motion.div>
  </section>
);

export default Events;
