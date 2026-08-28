import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CampaignSection: React.FC = () => {
  const { navigateTo, setActiveCategoryFilter } = useStore();

  const handleExplore = () => {
    setActiveCategoryFilter('All');
    navigateTo('shop');
  };

  return (
    <section id="campaign-banner-section" className="relative w-full overflow-hidden bg-[#181716] text-[#FAF8F5] my-12">
      <div className="relative min-h-[580px] lg:min-h-[640px] flex items-center">
        
        {/* Full-width High-Impact Fashion Photography */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=85"
            alt="The New Season Edit Campaign"
            className="w-full h-full object-cover object-[60%_30%] filter brightness-[0.72] contrast-[1.08]"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#121110]/95 via-[#121110]/60 to-transparent lg:w-3/5" />
          <div className="absolute inset-0 bg-linear-to-t from-[#121110]/80 via-transparent to-transparent" />
        </div>

        {/* Campaign Editorial Copy */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-xl">
            <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#C29E74] block mb-4">
              Seasonal Runway Campaign 001
            </span>

            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#FAF8F5] font-normal leading-[1.1]">
              THE NEW<br />
              <span className="italic font-light text-[#E8DCCF]">SEASON EDIT</span>
            </h2>

            <p className="text-sm sm:text-base text-[#D5CDBC] font-light mt-6 leading-relaxed">
              Elevate your wardrobe with pieces designed to make an impression. Fluid tailoring, refined silk columns, and sculptural accessories engineered for effortless distinction.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                id="campaign-explore-btn"
                onClick={handleExplore}
                className="bg-[#FAF8F5] hover:bg-[#EAE4DA] text-[#181716] px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] rounded-sm transition-all shadow-xl flex items-center gap-2 group"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="campaign-dresses-btn"
                onClick={() => {
                  setActiveCategoryFilter('Clothing');
                  navigateTo('shop', undefined, 'Clothing');
                }}
                className="bg-transparent hover:bg-[#FAF8F5]/10 text-[#FAF8F5] border border-[#FAF8F5]/40 px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] rounded-sm transition-all"
              >
                Discover Dresses
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
