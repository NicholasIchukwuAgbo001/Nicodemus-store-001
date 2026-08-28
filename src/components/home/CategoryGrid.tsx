import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface CategoryItem {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  itemCount: string;
  spanClass?: string;
}

export const CategoryGrid: React.FC = () => {
  const { navigateTo, setActiveCategoryFilter } = useStore();

  const categories: CategoryItem[] = [
    {
      id: 'cat-clothing',
      name: 'Clothing & Dresses',
      category: 'Clothing',
      description: 'Liquid silk slips, tailored hourglass blazers, pleated trousers, and structured outerwear.',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      itemCount: '18 Pieces',
      spanClass: 'md:col-span-2 lg:col-span-2',
    },
    {
      id: 'cat-shoes',
      name: 'Footwear & Heels',
      category: 'Shoes',
      description: 'Sculpted flute heels, buttery Italian calfskin loafers, and minimalist sneakers.',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80',
      itemCount: '12 Pieces',
    },
    {
      id: 'cat-bags',
      name: 'Handbags & Totes',
      category: 'Bags',
      description: 'Architectural top-handles, pebbled crossbodies, and full-grain travel carryalls.',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
      itemCount: '14 Pieces',
    },
    {
      id: 'cat-accessories',
      name: 'Accessories & Eyewear',
      category: 'Accessories',
      description: 'Bio-acetate sunglasses, saddle leather belts, and hand-rolled French silk scarves.',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
      itemCount: '9 Pieces',
    },
    {
      id: 'cat-jewelry',
      name: 'Fine Jewelry',
      category: 'Jewelry',
      description: 'Heavy 18k gold vermeil collars, organic baroque pearls, and molten bangles.',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      itemCount: '11 Pieces',
    },
    {
      id: 'cat-lifestyle',
      name: 'Lifestyle & Atmosphere',
      category: 'Lifestyle',
      description: 'Hand-poured botanic candles, Portuguese stoneware ceramics, and cashmere throws.',
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1000&q=80',
      itemCount: '8 Pieces',
    },
  ];

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategoryFilter(categoryName);
    navigateTo('shop', undefined, categoryName);
  };

  return (
    <section id="shop-by-category-section" className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#E8E2DA] pb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8F683D] block mb-2">
            Curated Collections
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#181716] font-normal">
            SHOP BY CATEGORY
          </h2>
        </div>
        <p className="text-xs text-[#7D7771] mt-3 md:mt-0 max-w-md leading-relaxed">
          From architectural tailoring and statement leather bags to fine jewelry and lifestyle treasures designed for modern living.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <div
            key={cat.id}
            id={cat.id}
            onClick={() => handleCategoryClick(cat.category)}
            className={`group relative overflow-hidden rounded-sm cursor-pointer bg-[#181716] min-h-[380px] sm:min-h-[420px] flex flex-col justify-end p-6 sm:p-8 transition-all duration-500 shadow-sm ${
              cat.spanClass || ''
            }`}
          >
            {/* Background Editorial Image */}
            <img
              src={cat.image}
              alt={cat.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.82] transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Gradient Mask for Readability */}
            <div className="absolute inset-0 bg-linear-to-t from-[#141312]/95 via-[#141312]/40 to-transparent" />

            {/* Content Box */}
            <div className="relative z-10 text-[#FAF8F5]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C29E74] font-semibold">
                  {cat.itemCount}
                </span>
                <div className="w-8 h-8 rounded-full bg-[#FAF8F5]/15 backdrop-blur-xs flex items-center justify-center group-hover:bg-[#FAF8F5] group-hover:text-[#181716] transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-medium tracking-tight text-[#FAF8F5] group-hover:text-[#EAE4DA] transition-colors">
                {cat.name}
              </h3>

              <p className="text-xs text-[#D5CEBF] mt-2 leading-relaxed max-w-sm line-clamp-2">
                {cat.description}
              </p>

              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#FAF8F5] mt-4 border-b border-[#FAF8F5]/40 pb-0.5 group-hover:border-[#FAF8F5]">
                Explore Collection
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
