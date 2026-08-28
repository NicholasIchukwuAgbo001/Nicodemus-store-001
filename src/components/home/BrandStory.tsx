import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const BrandStory: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <section id="brand-story-section" className="py-20 lg:py-28 bg-[#F2EDE5] border-y border-[#E2DBD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Large Editorial Portrait Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/5 overflow-hidden rounded-sm bg-[#181716] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
                alt="NICODEMUS 001 Atelier Portrait"
                className="w-full h-full object-cover object-[50%_20%]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#141312]/40 via-transparent to-transparent" />
            </div>

            {/* Subtle Floating Atelier Badge */}
            <div className="absolute -bottom-6 -right-6 bg-[#FAF8F5] p-6 shadow-xl rounded-sm border border-[#E8E2DA] max-w-xs hidden sm:block">
              <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#8F683D]">
                Maison Philosophy
              </p>
              <p className="font-editorial text-lg text-[#181716] italic mt-1">
                &ldquo;True elegance lies in quiet precision and effortless movement.&rdquo;
              </p>
            </div>
          </div>

          {/* Story Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-semibold text-[#8F683D]">
              <Sparkles className="w-4 h-4" />
              <span>The Atelier Manifesto</span>
            </div>

            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#181716] font-normal leading-[1.08]">
              MADE FOR HER.
            </h2>

            <p className="text-base sm:text-lg font-serif text-[#2B2723] leading-relaxed italic">
              NICODEMUS 001 brings together modern fashion, timeless essentials and statement pieces designed for women who express themselves through style.
            </p>

            <p className="text-xs sm:text-sm text-[#615B54] leading-relaxed">
              Founded on the belief that luxury should be felt in the drape of silk, the weight of virgin wool, and the architectural confidence of a tailored line. Every piece is constructed in limited quantities in master European ateliers, honoring responsible craftsmanship and enduring silhouettes.
            </p>

            {/* 3 Pillars */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#DED7CB] text-xs text-[#2B2723]">
              <div>
                <strong className="block text-sm font-editorial text-[#181716]">Ethical Sourcing</strong>
                <span className="text-[#7D7771]">100% Traceable French silk and certified Italian wool.</span>
              </div>
              <div>
                <strong className="block text-sm font-editorial text-[#181716]">Bespoke Longevity</strong>
                <span className="text-[#7D7771]">Designed to transcend seasons and remain relevant for decades.</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                id="brand-story-btn"
                onClick={() => navigateTo('story')}
                className="bg-[#181716] hover:bg-[#34302C] text-[#FAF8F5] px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] rounded-sm transition-colors shadow-md inline-flex items-center gap-2"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
