import React, { useState } from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { formatPrice } from '../../utils/currency';

interface ProductCardProps {
  product: Product;
  aspectRatio?: 'editorial' | 'square' | 'portrait';
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  aspectRatio = 'editorial' 
}) => {
  const { 
    navigateTo, 
    toggleWishlist, 
    isInWishlist, 
    addToCart, 
    openQuickView 
  } = useStore();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const inWishlist = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultColor = product.colors[0]?.name || 'Standard';
    const defaultSize = product.sizes.find(s => s.inStock)?.size || product.sizes[0]?.size || 'One Size';
    addToCart(product, defaultColor, defaultSize, 1, true);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openQuickView(product);
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => navigateTo('product-detail', product.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer flex flex-col bg-transparent transition-all duration-300 relative"
    >
      {/* Product Image Container */}
      <div className="relative w-full overflow-hidden bg-[#F2EDE6] rounded-sm aspect-editorial">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.isNew && (
            <span 
              id={`badge-new-${product.id}`}
              className="bg-[#181716] text-[#FAF8F5] text-[9px] uppercase tracking-[0.2em] font-semibold px-2.5 py-1 shadow-xs"
            >
              New Arrival
            </span>
          )}
          {hasDiscount && (
            <span 
              id={`badge-sale-${product.id}`}
              className="bg-[#A85A44] text-[#FAF8F5] text-[9px] uppercase tracking-[0.2em] font-semibold px-2.5 py-1 shadow-xs"
            >
              Archive Privé
            </span>
          )}
          {product.stockStatus === 'Low Stock' && (
            <span 
              id={`badge-lowstock-${product.id}`}
              className="bg-[#C29E74] text-[#181716] text-[9px] uppercase tracking-[0.2em] font-semibold px-2.5 py-1 shadow-xs"
            >
              Limited Pieces
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          id={`wishlist-toggle-${product.id}`}
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
            inWishlist 
              ? 'bg-[#181716] text-[#FAF8F5] shadow-md' 
              : 'bg-[#FAF8F5]/80 text-[#181716] hover:bg-[#FAF8F5] hover:scale-105 shadow-xs'
          }`}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            className={`w-4 h-4 transition-colors ${inWishlist ? 'fill-[#C29E74] text-[#C29E74]' : ''}`} 
          />
        </button>

        {/* Primary & Secondary Images with Smooth Crossfade and Zoom */}
        <div className="w-full h-full relative">
          <img
            src={product.primaryImage}
            alt={product.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
              isHovered && product.secondaryImage ? 'opacity-0' : 'opacity-100'
            }`}
          />
          {product.secondaryImage && (
            <img
              src={product.secondaryImage}
              alt={`${product.name} alternate view`}
              loading="lazy"
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover object-center absolute inset-0 transition-all duration-700 ease-out group-hover:scale-105 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
        </div>

        {/* Quick Actions Hover Overlay */}
        <div 
          className={`absolute bottom-3 inset-x-3 z-10 flex gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <button
            id={`quick-add-btn-${product.id}`}
            onClick={handleQuickAdd}
            className="flex-1 bg-[#181716]/95 hover:bg-[#181716] text-[#FAF8F5] text-xs font-semibold uppercase tracking-widest py-2.5 px-3 rounded-sm shadow-md transition-colors flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick Add</span>
          </button>
          
          <button
            id={`quick-view-btn-${product.id}`}
            onClick={handleQuickViewClick}
            className="bg-[#FAF8F5] hover:bg-[#F2ECE3] text-[#181716] p-2.5 rounded-sm shadow-md transition-colors flex items-center justify-center"
            aria-label="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="pt-3 pb-1 flex flex-col flex-1">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-[11px] text-[#7D7771] tracking-wider uppercase mb-1">
          <span>{product.category} • {product.subCategory}</span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-[#C29E74] text-[#C29E74]" />
            <span className="font-medium text-[#181716]">{product.rating.toFixed(1)}</span>
            <span className="text-[#A8A196]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="font-editorial text-base text-[#181716] font-medium leading-snug group-hover:text-[#8F683D] transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Color Swatches preview */}
        {product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2 mb-1.5">
            {product.colors.map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="w-3 h-3 rounded-full border border-[#D5CDBD] inline-block shrink-0 shadow-2xs"
                style={{ backgroundColor: c.hex }}
              />
            ))}
            {product.colors.length > 1 && (
              <span className="text-[10px] text-[#7D7771] ml-1">
                {product.colors.length} shades
              </span>
            )}
          </div>
        )}

        {/* Price display */}
        <div className="flex items-baseline gap-2 mt-auto pt-1">
          <span className="text-sm font-semibold text-[#181716] tracking-tight">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && product.originalPrice && (
            <span className="text-xs text-[#9E968B] line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          {hasDiscount && product.originalPrice && (
            <span className="text-[10px] text-[#A85A44] font-medium ml-auto">
              Save {formatPrice(product.originalPrice - product.price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
