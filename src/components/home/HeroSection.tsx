import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const HeroSection: React.FC = () => {
  const { navigateTo, setActiveCategoryFilter } = useStore();

  return (
    <section id="hero-section" className="relative w-full overflow-hidden bg-[#181716] text-[#FAF8F5]">
      {/* Background Editorial Visual Split / Overlay */}
      <div className="relative min-h-[86vh] lg:min-h-[92vh] flex items-center">
        {/* Background Image Container with Soft Parallax / Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85"
            alt="NICODEMUS 001 Editorial Campaign"
            className="w-full h-full object-cover object-[55%_35%] filter brightness-[0.78] contrast-[1.05]"
          />
          {/* Gradients for ultra-refined typography contrast */}
          <div className="absolute inset-0 bg-linear-to-r from-[#141312]/90 via-[#141312]/50 to-transparent sm:w-2/3" />
          <div className="absolute inset-0 bg-linear-to-t from-[#141312]/80 via-transparent to-transparent" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
          <div className="max-w-2xl">
            
            {/* Editorial Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5]/10 backdrop-blur-md border border-[#FAF8F5]/20 text-[#C29E74] text-[11px] font-semibold tracking-[0.25em] uppercase mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autumn / Winter Runway 001</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-[#FAF8F5]"
            >
              YOUR STYLE.<br />
              <span className="italic font-light text-[#E8DCCF]">YOUR STATEMENT.</span>
            </motion.h1>

            {/* Supporting Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-sm sm:text-base text-[#D4CCC0] font-light leading-relaxed max-w-lg"
            >
              Discover modern fashion, timeless essentials, shoes, bags and accessories curated for the woman who knows her style.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <button
                id="hero-shop-collection-btn"
                onClick={() => {
                  setActiveCategoryFilter('All');
                  navigateTo('shop');
                }}
                className="bg-[#FAF8F5] text-[#181716] hover:bg-[#E8E2D8] px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] rounded-sm transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-new-arrivals-btn"
                onClick={() => {
                  setActiveCategoryFilter('New Arrivals');
                  navigateTo('shop', undefined, 'New Arrivals');
                }}
                className="bg-transparent hover:bg-[#FAF8F5]/10 text-[#FAF8F5] border border-[#FAF8F5]/40 hover:border-[#FAF8F5] px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] rounded-sm transition-all duration-300 flex items-center justify-center"
              >
                <span>New Arrivals</span>
              </button>
            </motion.div>

            {/* Mini Trust Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-14 pt-8 border-t border-[#FAF8F5]/15 flex items-center gap-8 text-[11px] uppercase tracking-widest text-[#B5ACA0]"
            >
              <div>
                <span className="text-[#FAF8F5] font-semibold block text-base font-serif">100%</span>
                <span>Mulberry Silk & Virgin Wool</span>
              </div>
              <div className="w-px h-8 bg-[#FAF8F5]/15" />
              <div>
                <span className="text-[#FAF8F5] font-semibold block text-base font-serif">Limited</span>
                <span>Artisan Batch Editions</span>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};
