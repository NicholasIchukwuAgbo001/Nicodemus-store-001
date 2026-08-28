import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Heart } from 'lucide-react';

export const WelcomeModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal every time the page loads
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
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
              className="bg-[#FAF8F5] rounded-lg shadow-2xl max-w-md w-full pointer-events-auto relative overflow-hidden"
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
              <div className="p-6 sm:p-8 text-center">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#F4EFEA] text-[#C29E74] mb-5">
                  <Sparkles className="w-7 h-7" />
                </div>

                {/* Brand Welcome */}
                <div className="mb-3">
                  <h2 className="font-brand text-xl sm:text-2xl font-bold tracking-[0.24em] text-[#181716]">
                    NICODEMUS<span className="text-[#C29E74] ml-1.5 font-normal tracking-[0.15em]">001</span>
                  </h2>
                  <p className="text-[8px] uppercase tracking-[0.35em] text-[#7D7771] font-medium mt-1">
                    Women's Atelier & Lifestyle
                  </p>
                </div>

                {/* Welcome Message */}
                <h3 className="font-editorial text-xl sm:text-2xl text-[#181716] mb-3">
                  Welcome to Our Atelier
                </h3>

                <p className="text-sm text-[#4A453F] leading-relaxed max-w-sm mx-auto mb-6">
                  Discover timeless elegance and distinctive style. Each piece is thoughtfully
                  curated for the modern woman who values quality and craftsmanship.
                </p>

                {/* CTA Button */}
                <button
                  onClick={handleClose}
                  className="w-full bg-[#181716] text-[#FAF8F5] py-3 px-6 text-xs font-semibold uppercase tracking-[0.22em] rounded-sm hover:bg-[#34302C] transition-colors shadow-md"
                >
                  Begin Shopping
                </button>

                <p className="text-[10px] text-[#A8A196] mt-3 tracking-wide">
                  Complimentary delivery on orders over ₦250,000
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
