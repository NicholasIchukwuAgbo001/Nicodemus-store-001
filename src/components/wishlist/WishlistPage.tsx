import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, products, navigateTo } = useStore();

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  if (savedProducts.length === 0) {
    return (
      <div id="wishlist-empty" className="min-h-[70vh] bg-[#FAF8F5] flex flex-col items-center justify-center p-8">
        <div className="w-16 h-16 rounded-full bg-[#F2EDE5] text-[#8F683D] flex items-center justify-center mb-4">
          <Heart className="w-7 h-7" />
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#181716]">YOUR WISHLIST IS EMPTY</h1>
        <p className="text-xs text-[#7D7771] mt-2 max-w-sm text-center leading-relaxed">
          Save your favorite creations and seasonal arrivals to view them anytime.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="mt-6 bg-[#181716] text-[#FAF8F5] px-8 py-3.5 text-xs font-semibold uppercase tracking-widest rounded-sm hover:bg-[#34302C] transition-colors"
        >
          Discover Collections
        </button>
      </div>
    );
  }

  return (
    <div id="wishlist-page" className="min-h-screen bg-[#FAF8F5] py-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 border-b border-[#E8E2DA] mb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8F683D]">
              Client Privé
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl text-[#181716] font-normal mt-1">
              SAVED CREATIONS ({savedProducts.length})
            </h1>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="mt-4 sm:mt-0 text-xs font-semibold uppercase tracking-wider text-[#181716] underline hover:text-[#8F683D]"
          >
            Continue Shopping
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {savedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};
