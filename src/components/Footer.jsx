import React from 'react';

const Footer = () => {
  const currentUrl = window.location.href;
  const whatsappMessage = `You're invited to Nudrat & Bilal's wedding! ${currentUrl}`;
  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <footer className="w-full bg-wedding-crimson text-white relative pt-12 pb-16 px-4 text-center">
      {/* Gold floral ornamental divider at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-12 text-wedding-gold">
        <svg viewBox="0 0 100 50" fill="currentColor">
          <path d="M50 0 C 70 20, 90 20, 100 50 C 70 40, 50 50, 50 50 C 50 50, 30 40, 0 50 C 10 20, 30 20, 50 0 Z"/>
        </svg>
      </div>

      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <h2 className="font-cursive text-5xl md:text-6xl text-wedding-gold mb-4 drop-shadow-sm">
          Nudrat & Bilal
        </h2>
        
        <p className="font-serif text-lg tracking-widest text-wedding-blush mb-6">
          4th December 2026
        </p>
        
        <h3 className="font-arabic text-2xl md:text-3xl text-wedding-gold mb-8 leading-relaxed">
          جزاك اللهُ خيرًا
        </h3>
        
        <p className="font-serif text-sm text-wedding-blush/60 tracking-wider">
          Made with ❤️ for our special day
        </p>
      </div>

      {/* Floating WhatsApp Share Button */}
      <a 
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 z-50 animate-bounce"
        aria-label="Share on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </footer>
  );
};

export default Footer;
