import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, X, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, navigateTo, setActiveCategoryFilter } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setSearchTerm('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  const popularSearches = [
    'Dresses',
    'Satin Midi',
    'Bags',
    'Leather Sneakers',
    'Tailored Blazer',
    'Silk Scarf',
    'Jewelry',
    'Sunglasses',
  ];

  // Fuzzy filter results
  const filteredProducts = searchTerm.trim() === ''
    ? []
    : products.filter((item) => {
        const query = searchTerm.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.subCategory.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.tags.some((t) => t.toLowerCase().includes(query))
        );
      });

  const handleProductSelect = (productId: string) => {
    setIsSearchOpen(false);
    navigateTo('product-detail', productId);
  };

  const handleCategoryJump = (cat: string) => {
    setIsSearchOpen(false);
    setActiveCategoryFilter(cat);
    navigateTo('shop', undefined, cat);
  };

  if (!isSearchOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="search-overlay-container" 
        className="fixed inset-0 z-50 flex flex-col bg-[#FAF8F5]/98 backdrop-blur-md overflow-y-auto"
      >
        {/* Search Header */}
        <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <div className="flex items-center justify-between border-b border-[#D8D0C4] pb-4">
            <div className="flex items-center gap-3 flex-1">
              <Search className="w-6 h-6 text-[#7D7771]" />
              <input
                ref={inputRef}
                id="search-overlay-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search collection, dresses, bags, tailored pieces..."
                className="w-full text-lg sm:text-2xl font-serif tracking-wide bg-transparent focus:outline-none placeholder:text-[#A8A196] text-[#181716]"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="p-1 text-[#7D7771] hover:text-[#181716] text-xs uppercase tracking-wider"
                >
                  Clear
                </button>
              )}
            </div>
            <button
              id="close-search-overlay-btn"
              onClick={() => setIsSearchOpen(false)}
              className="ml-4 p-2 text-[#7D7771] hover:text-[#181716] rounded-full hover:bg-[#EAE4DB] transition-colors"
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Popular Searches when no term typed */}
          {searchTerm.trim() === '' ? (
            <div className="py-10">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8F683D] mb-4">
                <TrendingUp className="w-4 h-4" />
                <span>Trending Explorations</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchTerm(term)}
                    className="bg-[#EFE9DF] hover:bg-[#181716] hover:text-[#FAF8F5] text-xs text-[#2A2723] px-4 py-2 rounded-full transition-all tracking-wider font-medium"
                  >
                    {term}
                  </button>
                ))}
              </div>

              {/* Quick Category Directory */}
              <div className="mt-12 pt-8 border-t border-[#E8E2DA]">
                <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#7D7771] mb-6">
                  Browse by Department
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {['Clothing', 'Shoes', 'Bags', 'Accessories', 'Jewelry', 'Lifestyle'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryJump(cat)}
                      className="p-4 bg-[#F2EDE5] hover:bg-[#E8E1D5] rounded-sm text-center group transition-colors"
                    >
                      <span className="text-xs font-serif font-medium tracking-wide text-[#181716] block group-hover:text-[#8F683D]">
                        {cat}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Live Search Results */
            <div className="py-8">
              <div className="flex items-center justify-between mb-6">
                <p className="text-xs uppercase tracking-[0.2em] text-[#7D7771]">
                  Results for &ldquo;{searchTerm}&rdquo; ({filteredProducts.length} pieces)
                </p>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="py-16 text-center max-w-md mx-auto">
                  <p className="font-serif text-2xl text-[#181716]">We couldn't find that</p>
                  <p className="text-xs text-[#7D7771] mt-2 leading-relaxed">
                    Try searching for another piece, collection, or explore our latest seasonal arrivals.
                  </p>
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setActiveCategoryFilter('All');
                      navigateTo('shop');
                    }}
                    className="mt-6 bg-[#181716] text-[#FAF8F5] text-xs uppercase tracking-widest px-6 py-3 rounded-sm hover:bg-[#34302C] transition-colors"
                  >
                    View All Collections
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductSelect(product.id)}
                      className="group flex gap-4 p-3 rounded-lg hover:bg-[#F2EDE5] transition-colors cursor-pointer border border-transparent hover:border-[#E8E2DA]"
                    >
                      <img
                        src={product.primaryImage}
                        alt={product.name}
                        className="w-20 h-24 object-cover rounded-sm bg-[#E8E2DA] shrink-0"
                      />
                      <div className="flex flex-col justify-center">
                        <span className="text-[10px] uppercase tracking-widest text-[#7D7771]">
                          {product.category}
                        </span>
                        <h4 className="font-serif text-sm font-medium text-[#181716] group-hover:text-[#8F683D] transition-colors line-clamp-1">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-semibold text-[#181716]">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-[11px] text-[#9E968B] line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-[#8F683D] font-medium mt-1 flex items-center gap-1">
                          View details <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
};
