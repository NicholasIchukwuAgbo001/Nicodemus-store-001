import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Heart } from 'lucide-react';

export const WelcomeModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen the welcome modal before
    const hasSeenWelcome = localStorage.getItem('nicodemus001_welcome_seen');
    
    if (!hasSeenWelcome) {
      // Show modal after a short delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Mark that user has seen the welcome modal
    localStorage.setItem('nicodemus001_welcome_seen', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#141312]/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div 
              className="bg-[#FAF8F5] rounded-lg shadow-2xl max-w-lg w-full pointer-events-auto relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative Top Bar */}
              <div className="h-1.5 bg-gradient-to-r from-[#8F683D] via-[#C29E74] to-[#8F683D]" />

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-[#7D7771] hover:text-[#181716] hover:bg-[#F2ECE3] rounded-full transition-colors z-10"
                aria-label="Close welcome modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="p-8 sm:p-10 text-center">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F4EFEA] text-[#C29E74] mb-6">
                  <Sparkles className="w-8 h-8" />
                </div>

                {/* Brand Welcome */}
                <div className="mb-4">
                  <h2 className="font-brand text-2xl sm:text-3xl font-bold tracking-[0.24em] text-[#181716]">
                    NICODEMUS<span className="text-[#C29E74] ml-2 font-normal tracking-[0.15em]">001</span>
                  </h2>
                  <p className="text-[9px] uppercase tracking-[0.35em] text-[#7D7771] font-medium mt-1">
                    Women's Atelier & Lifestyle
                  </p>
                </div>

                {/* Welcome Message */}
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#181716] mb-4">
                  Welcome to Our Atelier
                </h3>
                
                <div className="space-y-3 text-sm text-[#4A453F] leading-relaxed max-w-md mx-auto">
                  <p>
                    We're delighted to have you here. Step into a world of timeless elegance, 
                    where each piece is thoughtfully curated for the modern woman who values 
                    quality, craftsmanship, and distinctive style.
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <Heart className="w-4 h-4 text-[#C29E74]" />
                    <p className="text-xs text-[#8F683D] font-medium tracking-wider">
                      Discover exclusive collections designed just for you
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-[#E8E2DA]">
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8F683D] font-semibold mb-1">
                      Premium Quality
                    </p>
                    <p className="text-xs text-[#5D5750]">
                      Handpicked fabrics
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8F683D] font-semibold mb-1">
                      Free Delivery
                    </p>
                    <p className="text-xs text-[#5D5750]">
                      Orders over ₦250k
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8F683D] font-semibold mb-1">
                      VIP Service
                    </p>
                    <p className="text-xs text-[#5D5750]">
                      Personal styling
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleClose}
                  className="mt-8 w-full bg-[#181716] text-[#FAF8F5] py-3.5 px-6 text-xs font-semibold uppercase tracking-[0.22em] rounded-sm hover:bg-[#34302C] transition-colors shadow-md"
                >
                  Begin Your Journey
                </button>

                <p className="text-[11px] text-[#A8A196] mt-4 tracking-wide">
                  Thank you for choosing NICODEMUS 001
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
