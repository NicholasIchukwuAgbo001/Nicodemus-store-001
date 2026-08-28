import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { Award, ArrowRight } from 'lucide-react';

export const BestSellers: React.FC = () => {
  const { products, navigateTo, setActiveCategoryFilter } = useStore();

  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section id="best-sellers-section" className="py-20 lg:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#8F683D] mb-2">
              <Award className="w-4 h-4" />
              <span>Iconic Signatures</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#181716] font-normal">
              BEST SELLERS
            </h2>
            <p className="text-xs text-[#7D7771] mt-2 max-w-lg">
              The permanent essentials and cult favorites celebrated by clients worldwide.
            </p>
          </div>

          <button
            id="view-all-best-sellers-btn"
            onClick={() => {
              setActiveCategoryFilter('All');
              navigateTo('shop');
            }}
            className="mt-4 md:mt-0 text-xs font-semibold uppercase tracking-[0.2em] text-[#181716] hover:text-[#8F683D] flex items-center gap-1.5 transition-colors border-b border-[#181716] pb-1"
          >
            <span>View All Best Sellers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Column Product Grid */}
        <div
          id="best-sellers-grid"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};
