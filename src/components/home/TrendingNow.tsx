import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';

export const TrendingNow: React.FC = () => {
  const { products, navigateTo, setActiveCategoryFilter } = useStore();

  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 6);

  const handleShopTheEdit = () => {
    setActiveCategoryFilter('All');
    navigateTo('shop');
  };

  return (
    <section id="trending-now-section" className="py-20 lg:py-28 bg-[#F4EFEA] border-t border-[#E8E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Split Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14 border-b border-[#D8D0C4] pb-8">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#A85A44] mb-2">
              <Flame className="w-4 h-4" />
              <span>Curator’s Weekly Selection</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#181716] font-normal">
              TRENDING NOW
            </h2>
            <p className="text-xs sm:text-sm text-[#5D5750] mt-3 max-w-xl leading-relaxed">
              The high-rotation silhouettes, standout evening bags, and tactile knitwear commanding attention in the global fashion capitals.
            </p>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <button
              id="shop-the-edit-btn"
              onClick={handleShopTheEdit}
              className="inline-flex items-center gap-2 bg-[#181716] text-[#FAF8F5] hover:bg-[#34302C] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] rounded-sm transition-colors shadow-sm"
            >
              <span>Shop The Edit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Featured Editorial Spotlight + Horizontal Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Spotlight Large Editorial Feature Box */}
          <div 
            onClick={() => navigateTo('product-detail', 'prod-tailored-blazer')}
            className="lg:col-span-5 relative group overflow-hidden rounded-sm cursor-pointer bg-[#181716] min-h-[460px] flex flex-col justify-end p-8 text-[#FAF8F5] shadow-lg"
          >
            <img
              src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=85"
              alt="Editorial Spotlight: Sartorial Hourglass Wool Blazer"
              className="absolute inset-0 w-full h-full object-cover object-[50%_25%] filter brightness-[0.8] transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#141312]/95 via-[#141312]/40 to-transparent" />

            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#C29E74] block mb-1">
                The Master Silhouette
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#FAF8F5] font-medium leading-tight">
                Sartorial Hourglass Wool Blazer
              </h3>
              <p className="text-xs text-[#D8D2C7] mt-2 leading-relaxed line-clamp-2">
                Double-faced virgin wool sculpted with sharp peaked lapels and an architectural cinched waist.
              </p>
              <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#FAF8F5]/20">
                <span className="text-sm font-semibold text-[#FAF8F5]">$520</span>
                <span className="text-xs uppercase tracking-widest font-medium text-[#C29E74] group-hover:text-[#FAF8F5] flex items-center gap-1">
                  Acquire Piece <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>

          {/* 4 Supporting Trending Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
            {trendingProducts.slice(1, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
