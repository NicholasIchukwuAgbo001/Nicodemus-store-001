import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { Filter, X, ChevronDown, SlidersHorizontal, Sparkles, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatPrice } from '../../utils/currency';

export const ShopCatalog: React.FC = () => {
  const { 
    products, 
    activeCategoryFilter, 
    setActiveCategoryFilter, 
    selectedSubCategory, 
    setSelectedSubCategory,
    priceRange,
    setPriceRange,
    selectedSizes,
    toggleSizeFilter,
    selectedColors,
    toggleColorFilter,
    inStockOnly,
    setInStockOnly,
    sortBy,
    setSortBy,
    clearAllFilters
  } = useStore();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = [
    'All',
    'Clothing',
    'Shoes',
    'Bags',
    'Accessories',
    'Jewelry',
    'Lifestyle',
    'New Arrivals',
    'Sale',
  ];

  const allSizes = [
    'UK 6 (XS)', 
    'UK 8 (S)', 
    'UK 10 (M)', 
    'UK 12 (L)', 
    'UK 14 (XL)', 
    'EU 36 / UK 3.5', 
    'EU 37 / UK 4.0', 
    'EU 38 / UK 5.0', 
    'EU 39 / UK 6.0', 
    'EU 40 / UK 6.5', 
    'EU 41 / UK 7.5', 
    'One Size'
  ];

  const allColors = [
    { name: 'Black', hex: '#111111' },
    { name: 'Ivory', hex: '#FFFFF0' },
    { name: 'Cream', hex: '#FDFBF7' },
    { name: 'Oatmeal', hex: '#D8CAB8' },
    { name: 'Tuscan Tan', hex: '#C29E74' },
    { name: 'Camel', hex: '#C19A6B' },
    { name: 'Cognac', hex: '#9E472A' },
    { name: 'Burgundy', hex: '#800020' },
    { name: 'Emerald', hex: '#1E4D2B' },
    { name: 'Gold', hex: '#D4AF37' },
    { name: 'Silver', hex: '#C0C0C0' },
  ];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (activeCategoryFilter === 'New Arrivals') {
      list = list.filter((p) => p.isNew || p.tags.includes('campaign'));
    } else if (activeCategoryFilter === 'Sale') {
      list = list.filter((p) => p.originalPrice && p.originalPrice > p.price);
    } else if (activeCategoryFilter !== 'All') {
      list = list.filter((p) => p.category === activeCategoryFilter);
    }

    // Sub-category
    if (selectedSubCategory) {
      list = list.filter((p) => p.subCategory === selectedSubCategory);
    }

    // Price
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sizes
    if (selectedSizes.length > 0) {
      list = list.filter((p) => 
        p.sizes.some((s) => selectedSizes.includes(s.size) && s.inStock)
      );
    }

    // Colors
    if (selectedColors.length > 0) {
      list = list.filter((p) =>
        p.colors.some((c) => selectedColors.includes(c.name))
      );
    }

    // In-stock
    if (inStockOnly) {
      list = list.filter((p) => p.stockStatus !== 'Out of Stock');
    }

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'bestseller') {
      list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return list;
  }, [products, activeCategoryFilter, selectedSubCategory, priceRange, selectedSizes, selectedColors, inStockOnly, sortBy]);

  const hasActiveFilters = 
    activeCategoryFilter !== 'All' ||
    selectedSubCategory !== null ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 1500000 ||
    inStockOnly;

  return (
    <div id="shop-catalog-page" className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Category Hero Banner */}
      <div className="bg-[#181716] text-[#FAF8F5] py-14 sm:py-18 px-4 sm:px-6 lg:px-8 border-b border-[#2C2925]">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C29E74] block mb-2">
            NICODEMUS 001 Collections
          </span>
          <h1 className="font-editorial text-3xl sm:text-5xl lg:text-6xl text-[#FAF8F5] font-normal">
            {activeCategoryFilter === 'All' ? 'ALL COLLECTIONS' : activeCategoryFilter.toUpperCase()}
          </h1>
          <p className="text-xs sm:text-sm text-[#BDB5A8] mt-3 max-w-xl mx-auto">
            Architectural tailoring, fluid silks, hand-finished leathercraft and timeless jewels for the modern wardrobe.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Category Horizontal Quick-Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-[#E8E2DA]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategoryFilter(cat);
                setSelectedSubCategory(null);
              }}
              className={`text-xs uppercase tracking-widest px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                activeCategoryFilter === cat
                  ? 'bg-[#181716] text-[#FAF8F5] font-semibold'
                  : 'bg-[#EFE9DF] text-[#4A453F] hover:bg-[#E4DCCE]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter Controls Bar & Results Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 border-b border-[#E8E2DA]">
          <div className="flex items-center gap-4">
            {/* Mobile Filter Button */}
            <button
              id="mobile-filter-trigger-btn"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 bg-[#EFE9DF] text-[#181716] px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters {hasActiveFilters && '•'}</span>
            </button>

            <p className="text-xs text-[#7D7771] tracking-wider uppercase font-medium">
              Showing <strong className="text-[#181716]">{filteredProducts.length}</strong> creations
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-[#7D7771] hidden sm:inline">
              Sort By:
            </span>
            <div className="relative">
              <select
                id="shop-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FAF8F5] border border-[#D5CDBD] text-xs font-medium text-[#181716] px-3.5 py-2 pr-8 rounded-sm focus:outline-none focus:border-[#181716] uppercase tracking-wider appearance-none cursor-pointer"
              >
                <option value="featured">Featured / Curated</option>
                <option value="newest">Newest Arrivals</option>
                <option value="bestseller">Best Sellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#7D7771] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <span className="text-[11px] uppercase tracking-wider text-[#7D7771]">Active Filters:</span>
            {activeCategoryFilter !== 'All' && (
              <span className="inline-flex items-center gap-1 bg-[#E8E2DA] text-[#181716] text-xs px-2.5 py-1 rounded-sm">
                Category: {activeCategoryFilter}
                <button onClick={() => setActiveCategoryFilter('All')}><X className="w-3 h-3" /></button>
              </span>
            )}
            {selectedSizes.map((size) => (
              <span key={size} className="inline-flex items-center gap-1 bg-[#E8E2DA] text-[#181716] text-xs px-2.5 py-1 rounded-sm">
                Size: {size}
                <button onClick={() => toggleSizeFilter(size)}><X className="w-3 h-3" /></button>
              </span>
            ))}
            {selectedColors.map((col) => (
              <span key={col} className="inline-flex items-center gap-1 bg-[#E8E2DA] text-[#181716] text-xs px-2.5 py-1 rounded-sm">
                Shade: {col}
                <button onClick={() => toggleColorFilter(col)}><X className="w-3 h-3" /></button>
              </span>
            ))}
            {inStockOnly && (
              <span className="inline-flex items-center gap-1 bg-[#E8E2DA] text-[#181716] text-xs px-2.5 py-1 rounded-sm">
                In Stock Only
                <button onClick={() => setInStockOnly(false)}><X className="w-3 h-3" /></button>
              </span>
            )}
            <button
              id="clear-all-filters-btn"
              onClick={clearAllFilters}
              className="text-xs uppercase tracking-wider text-[#A85A44] hover:underline font-semibold ml-2 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Clear All
            </button>
          </div>
        )}

        {/* Main Content Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
          
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-3 space-y-8 pr-4 border-r border-[#E8E2DA]">
            
            {/* Departments */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#181716] mb-4">
                Department
              </h4>
              <div className="space-y-2 text-xs">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveCategoryFilter(c)}
                    className={`w-full text-left py-1 transition-colors flex justify-between ${
                      activeCategoryFilter === c
                        ? 'text-[#181716] font-bold'
                        : 'text-[#5D5750] hover:text-[#181716]'
                    }`}
                  >
                    <span>{c}</span>
                    {activeCategoryFilter === c && <span className="text-[#C29E74]">●</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="pt-6 border-t border-[#E8E2DA]">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#181716]">
                  Price Bracket
                </h4>
                <span className="text-xs font-medium text-[#8F683D]">
                  {formatPrice(priceRange[0])} — {formatPrice(priceRange[1])}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1500000"
                step="25000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value, 10)])}
                className="w-full accent-[#181716] cursor-pointer"
              />
            </div>

            {/* Size Filter */}
            <div className="pt-6 border-t border-[#E8E2DA]">
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#181716] mb-3">
                Size
              </h4>
              <div className="flex flex-wrap gap-2">
                {allSizes.map((size) => {
                  const isSelected = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={() => toggleSizeFilter(size)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-sm border transition-all ${
                        isSelected
                          ? 'bg-[#181716] text-[#FAF8F5] border-[#181716]'
                          : 'bg-[#FAF8F5] text-[#4A453F] border-[#D5CDBD] hover:border-[#181716]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Swatch Filter */}
            <div className="pt-6 border-t border-[#E8E2DA]">
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#181716] mb-3">
                Color Palette
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {allColors.map((col) => {
                  const isSelected = selectedColors.includes(col.name);
                  return (
                    <button
                      key={col.name}
                      onClick={() => toggleColorFilter(col.name)}
                      className={`flex items-center gap-2 p-1.5 rounded-sm text-left transition-colors ${
                        isSelected ? 'bg-[#E8E2DA] font-semibold text-[#181716]' : 'text-[#5D5750] hover:bg-[#F2ECE3]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-[#D5CDBD] shrink-0"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span className="truncate">{col.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* In Stock Only Checkbox */}
            <div className="pt-6 border-t border-[#E8E2DA]">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[#181716]">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded border-[#D5CDBD] accent-[#181716] w-4 h-4 cursor-pointer"
                />
                <span className="font-medium">In Stock Only</span>
              </label>
            </div>

          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="py-24 text-center bg-[#F2EDE5] rounded-sm p-8">
                <p className="font-editorial text-2xl text-[#181716]">No creations match your current filters</p>
                <p className="text-xs text-[#7D7771] mt-2 max-w-sm mx-auto">
                  Try clearing selected sizes, color shades, or expanding your price range.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-6 bg-[#181716] text-[#FAF8F5] text-xs uppercase tracking-widest px-6 py-3 rounded-sm hover:bg-[#34302C]"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div 
                id="shop-product-grid"
                className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-6"
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Filters Slide-over Sheet */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-[#141312]/60 backdrop-blur-xs z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-[#FAF8F5] z-50 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto lg:hidden"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#E8E2DA]">
                  <h3 className="font-editorial text-lg text-[#181716] font-medium">Filter Catalog</h3>
                  <button onClick={() => setMobileFilterOpen(false)}>
                    <X className="w-5 h-5 text-[#7D7771]" />
                  </button>
                </div>

                <div className="py-6 space-y-6">
                  {/* Category */}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#181716] mb-2">Category</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {categories.map((c) => (
                        <button
                          key={c}
                          onClick={() => setActiveCategoryFilter(c)}
                          className={`text-xs px-3 py-1.5 rounded-sm border ${
                            activeCategoryFilter === c
                              ? 'bg-[#181716] text-[#FAF8F5] border-[#181716]'
                              : 'bg-[#FAF8F5] border-[#D5CDBD] text-[#4A453F]'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sizes */}
                  <div className="border-t border-[#E8E2DA] pt-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#181716] mb-2">Size</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {allSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => toggleSizeFilter(size)}
                          className={`text-xs px-3 py-1.5 rounded-sm border ${
                            selectedSizes.includes(size)
                              ? 'bg-[#181716] text-[#FAF8F5] border-[#181716]'
                              : 'bg-[#FAF8F5] border-[#D5CDBD] text-[#4A453F]'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Stock */}
                  <div className="border-t border-[#E8E2DA] pt-4">
                    <label className="flex items-center gap-2 text-xs text-[#181716]">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        className="w-4 h-4 accent-[#181716]"
                      />
                      <span>In Stock Only</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E2DA] space-y-2">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full bg-[#181716] text-[#FAF8F5] py-3 text-xs font-semibold uppercase tracking-widest rounded-sm"
                >
                  Apply Filters ({filteredProducts.length})
                </button>
                <button
                  onClick={clearAllFilters}
                  className="w-full text-center text-xs uppercase tracking-wider text-[#A85A44] py-2"
                >
                  Reset All
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
