import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export const NewArrivals: React.FC = () => {
  const { products, navigateTo, setActiveCategoryFilter } = useStore();
  const [selectedSubTab, setSelectedSubTab] = useState<'All' | 'Clothing' | 'Bags' | 'Shoes' | 'Jewelry'>('All');

  // Filter new pieces
  const newArrivals = products.filter((p) => p.isNew || p.tags.includes('campaign'));

  const displayedProducts = selectedSubTab === 'All'
    ? newArrivals.slice(0, 8)
    : newArrivals.filter((p) => p.category === selectedSubTab).slice(0, 8);

  const handleViewAll = () => {
    setActiveCategoryFilter('New Arrivals');
    navigateTo('shop', undefined, 'New Arrivals');
  };

  return (
    <section id="new-arrivals-section" className="py-20 bg-[#FAF8F5] border-t border-[#E8E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#8F683D] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autumn / Winter Drop 001</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#181716] font-normal">
              NEW ARRIVALS
            </h2>
            <p className="text-xs text-[#7D7771] mt-2 max-w-lg">
              Discover the latest pieces selected for your wardrobe.
            </p>
          </div>

          {/* Sub-category Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {(['All', 'Clothing', 'Bags', 'Shoes', 'Jewelry'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedSubTab(tab)}
                className={`text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-all ${
                  selectedSubTab === tab
                    ? 'bg-[#181716] text-[#FAF8F5] font-semibold'
                    : 'bg-[#F0EAE1] text-[#4A453F] hover:bg-[#E4DCCE]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Product Grid: Desktop 4 / Tablet 3 / Mobile 2 */}
        <div 
          id="new-arrivals-grid"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-14 text-center">
          <button
            id="view-all-new-arrivals-btn"
            onClick={handleViewAll}
            className="inline-flex items-center gap-2 bg-[#181716] text-[#FAF8F5] hover:bg-[#38332E] px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] rounded-sm transition-colors shadow-md"
          >
            <span>Explore All New Arrivals</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
