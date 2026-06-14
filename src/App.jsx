import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import EnvelopeHero from './components/EnvelopeHero';
import Bismillah from './components/Bismillah';
import InvitationContent from './components/InvitationContent';
import ScratchReveal from './components/ScratchReveal';
import Events from './components/Events';
import AwaitingPresence from './components/AwaitingPresence';
import VenueMap from './components/VenueMap';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // 2-second loading screen
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleRevealComplete = () => {
    // Envelope animation is completely finished
    setEnvelopeOpened(true);
    // Allow a slight delay for the final scale/fade out before showing content
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-wedding-blush font-serif text-wedding-text selection:bg-wedding-rose selection:text-white relative">
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full flex flex-col items-center"
          >
            {/* The Envelope Hero handles its own internal states and triggers handleRevealComplete */}
            {!showContent && (
              <EnvelopeHero onRevealComplete={handleRevealComplete} />
            )}
            
            {/* Only show the rest of the content after the envelope sequence finishes */}
            <AnimatePresence>
              {showContent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="w-full flex flex-col items-center z-10"
                >
                  <InvitationContent />
                  <ScratchReveal />
                  <Events />
                  <AwaitingPresence />
                  <VenueMap />
                  <Footer />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
