import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Star, Heart, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatPrice } from '../../utils/currency';

export const QuickViewModal: React.FC = () => {
  const { 
    isQuickViewOpen, 
    closeQuickView, 
    quickViewProduct, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    navigateTo,
    setIsSizeGuideOpen 
  } = useStore();

  if (!isQuickViewOpen || !quickViewProduct) return null;

  const [selectedColor, setSelectedColor] = useState(quickViewProduct.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(
    quickViewProduct.sizes.find((s) => s.inStock)?.size || quickViewProduct.sizes[0]?.size || 'One Size'
  );
  const [activeImage, setActiveImage] = useState(quickViewProduct.primaryImage);
  const inWishlist = isInWishlist(quickViewProduct.id);

  // Sync state whenever active quick view product changes
  React.useEffect(() => {
    if (quickViewProduct) {
      setActiveImage(quickViewProduct.primaryImage);
      setSelectedColor(quickViewProduct.colors[0]?.name || '');
      setSelectedSize(
        quickViewProduct.sizes.find((s) => s.inStock)?.size || quickViewProduct.sizes[0]?.size || 'One Size'
      );
    }
  }, [quickViewProduct?.id]);

  const handleAdd = () => {
    addToCart(quickViewProduct, selectedColor, selectedSize, 1, true);
    closeQuickView();
  };

  const handleFullDetails = () => {
    closeQuickView();
    navigateTo('product-detail', quickViewProduct.id);
  };

  return (
    <AnimatePresence>
      <div id="quick-view-overlay" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="fixed inset-0 bg-[#141312]/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-[#FAF8F5] rounded-lg shadow-2xl max-w-3xl w-full overflow-hidden z-10 border border-[#E8E2DA]"
        >
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 p-2 text-[#7D7771] hover:text-[#181716] bg-[#FAF8F5]/80 backdrop-blur-xs rounded-full hover:bg-[#F2ECE3] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Column */}
            <div className="p-6 bg-[#F2EDE5] flex flex-col items-center justify-center">
              <div className="relative w-full aspect-editorial rounded-sm overflow-hidden bg-[#FAF8F5]">
                <img
                  src={activeImage}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {quickViewProduct.gallery.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto max-w-full pb-1">
                  {quickViewProduct.gallery.slice(0, 4).map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(img)}
                      className={`w-14 h-16 rounded-sm overflow-hidden border-2 shrink-0 transition-colors ${
                        activeImage === img ? 'border-[#181716]' : 'border-transparent opacity-70'
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info & Options Column */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[#7D7771] mb-2">
                  <span>{quickViewProduct.category} • {quickViewProduct.subCategory}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#C29E74] text-[#C29E74]" />
                    <span className="font-medium text-[#181716]">{quickViewProduct.rating.toFixed(1)}</span>
                  </div>
                </div>

                <h3 className="font-editorial text-2xl text-[#181716] font-medium leading-tight">
                  {quickViewProduct.name}
                </h3>

                <div className="flex items-baseline gap-3 mt-3">
                  <span className="text-xl font-semibold text-[#181716]">
                    {formatPrice(quickViewProduct.price)}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-sm text-[#9E968B] line-through">
                      {formatPrice(quickViewProduct.originalPrice)}
                    </span>
                  )}
                  {quickViewProduct.stockStatus === 'Low Stock' && (
                    <span className="text-xs text-[#A85A44] font-medium ml-auto">
                      Limited Allocation
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#5D5750] mt-4 leading-relaxed line-clamp-3">
                  {quickViewProduct.description}
                </p>

                {/* Color Selection */}
                <div className="mt-5">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-[#7D7771] uppercase tracking-wider">Shade:</span>
                    <span className="font-medium text-[#181716]">{selectedColor}</span>
                  </div>
                  <div className="flex gap-2">
                    {quickViewProduct.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-7 h-7 rounded-full border-2 p-0.5 transition-all ${
                          selectedColor === color.name ? 'border-[#181716] scale-110' : 'border-transparent'
                        }`}
                        title={color.name}
                      >
                        <span
                          className="w-full h-full rounded-full block border border-[#D5CDBD]"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mt-5">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-[#7D7771] uppercase tracking-wider">Size:</span>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-[#8F683D] underline hover:text-[#181716] font-medium"
                    >
                      Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.sizes.map((s) => (
                      <button
                        key={s.size}
                        disabled={!s.inStock}
                        onClick={() => setSelectedSize(s.size)}
                        className={`min-w-10 h-10 px-3 text-xs font-semibold rounded-sm border transition-all ${
                          !s.inStock
                            ? 'bg-[#EAE5DC] text-[#A8A196] border-[#D5CDBD] cursor-not-allowed line-through'
                            : selectedSize === s.size
                            ? 'bg-[#181716] text-[#FAF8F5] border-[#181716]'
                            : 'bg-[#FAF8F5] text-[#181716] border-[#D5CDBD] hover:border-[#181716]'
                        }`}
                      >
                        {s.size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 space-y-3">
                <div className="flex gap-3">
                  <button
                    onClick={handleAdd}
                    className="flex-1 bg-[#181716] hover:bg-[#34302C] text-[#FAF8F5] text-xs font-semibold uppercase tracking-[0.18em] py-3.5 px-4 rounded-sm shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className={`p-3.5 rounded-sm border transition-colors ${
                      inWishlist
                        ? 'bg-[#181716] text-[#FAF8F5] border-[#181716]'
                        : 'bg-[#FAF8F5] text-[#181716] border-[#D5CDBD] hover:bg-[#F2ECE3]'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#C29E74] text-[#C29E74]' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={handleFullDetails}
                  className="w-full text-center text-xs font-medium text-[#7D7771] hover:text-[#181716] uppercase tracking-wider py-1 flex items-center justify-center gap-1"
                >
                  View Full Product Details & Reviews <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
