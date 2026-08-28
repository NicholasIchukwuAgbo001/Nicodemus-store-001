import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { STORE_CONFIG } from '../../data/storeConfig';
import { formatPrice } from '../../utils/currency';
import { 
  Trash2, 
  Heart, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck,
  Tag,
  ChevronLeft
} from 'lucide-react';

export const FullCartPage: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    updateCartQuantity,
    removeFromCart,
    toggleWishlist,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    navigateTo,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [giftNote, setGiftNote] = useState('');

  const freeShippingThreshold = STORE_CONFIG.freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput) return;
    const res = applyPromoCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FAF8F5] flex flex-col items-center justify-center px-4 py-20">
        <div className="w-20 h-20 rounded-full bg-[#F2EDE5] flex items-center justify-center text-[#8F683D] mb-6">
          <ShoppingBag className="w-9 h-9" />
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl text-[#181716]">YOUR SHOPPING BAG IS EMPTY</h1>
        <p className="text-xs sm:text-sm text-[#7D7771] mt-2 max-w-sm text-center leading-relaxed">
          Discover our latest creations and add timeless elegance to your wardrobe.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="mt-8 bg-[#181716] text-[#FAF8F5] px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] rounded-sm hover:bg-[#34302C] transition-colors"
        >
          Explore Collections
        </button>
      </div>
    );
  }

  return (
    <div id="full-cart-page" className="min-h-screen bg-[#FAF8F5] py-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-8 border-b border-[#E8E2DA]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8F683D]">
              Shopping Bag
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl text-[#181716] font-normal mt-1">
              REVIEW YOUR SELECTION ({cartCount})
            </h1>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="text-xs uppercase tracking-wider text-[#7D7771] hover:text-[#181716] flex items-center gap-1 font-medium"
          >
            <ChevronLeft className="w-4 h-4" /> Continue Shopping
          </button>
        </div>

        {/* Free Shipping Alert */}
        <div className="mt-6 p-4 bg-[#F2EDE5] rounded-sm border border-[#E8E2DA] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#8F683D]" />
            {remainingForFreeShipping > 0 ? (
              <span>
                Add <strong className="text-[#181716]">{formatPrice(remainingForFreeShipping)}</strong> more to qualify for <strong className="text-[#8F683D]">Complimentary Nationwide Express Delivery</strong>.
              </span>
            ) : (
              <span className="text-[#355E3B] font-semibold">
                You have qualified for Complimentary Nationwide Express Shipping.
              </span>
            )}
          </div>
        </div>

        {/* 2-Column Bag Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mt-8">
          
          {/* Left Column: Items Table */}
          <div className="lg:col-span-8 space-y-6">
            <div className="divide-y divide-[#E8E2DA] border-y border-[#E8E2DA]">
              {cart.map((item) => (
                <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-6">
                  {/* Item Image */}
                  <img
                    src={item.product.primaryImage}
                    alt={item.product.name}
                    className="w-24 h-32 object-cover rounded-sm bg-[#EAE4DB] shrink-0 cursor-pointer"
                    onClick={() => navigateTo('product-detail', item.product.id)}
                  />

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-[#7D7771]">
                            {item.product.category}
                          </span>
                          <h3
                            onClick={() => navigateTo('product-detail', item.product.id)}
                            className="font-editorial text-lg text-[#181716] font-medium hover:text-[#8F683D] cursor-pointer"
                          >
                            {item.product.name}
                          </h3>
                        </div>
                        <span className="text-base font-semibold text-[#181716]">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>

                      <div className="text-xs text-[#5D5750] mt-2 space-y-0.5">
                        <p>Selected Shade: <strong className="text-[#181716]">{item.selectedColor}</strong></p>
                        <p>Size: <strong className="text-[#181716]">{item.selectedSize}</strong></p>
                        <p>Unit Price: {formatPrice(item.product.price)}</p>
                      </div>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E8E2DA]">
                      <div className="flex items-center border border-[#D5CDBD] rounded-sm bg-[#FAF8F5]">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1.5 text-[#7D7771] hover:text-[#181716]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-semibold text-[#181716]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1.5 text-[#7D7771] hover:text-[#181716]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4 text-xs">
                        <button
                          onClick={() => toggleWishlist(item.product.id)}
                          className="text-[#7D7771] hover:text-[#181716] flex items-center gap-1"
                        >
                          <Heart className="w-3.5 h-3.5" />
                          <span>Move to Wishlist</span>
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#A85A44] hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Gift Note Accordion / Box */}
            <div className="p-5 bg-[#F2EDE5] rounded-sm border border-[#E8E2DA]">
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#181716] mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8F683D]" />
                <span>Complimentary Hand-Written Gift Card</span>
              </h4>
              <textarea
                rows={2}
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                placeholder="Include a personalized gift note to be hand-inscribed by the atelier..."
                className="w-full bg-[#FAF8F5] border border-[#D5CDBD] text-xs p-3 rounded-sm focus:outline-none focus:border-[#181716]"
              />
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-[#F2EDE5] p-6 sm:p-8 rounded-sm border border-[#E8E2DA] sticky top-28 space-y-6">
              <h3 className="font-editorial text-xl text-[#181716] font-medium border-b border-[#D8D0C4] pb-4">
                Order Summary
              </h3>

              {/* Promo Code Box */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7D7771] mb-2">
                  Privé Privilege Code
                </label>
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-[#FAF8F5] border border-[#C29E74] p-3 rounded-sm text-xs">
                    <div>
                      <span className="font-semibold text-[#181716]">{appliedPromo.code}</span>
                      <span className="text-[#8F683D] ml-2">({appliedPromo.discountPercentage}% Off)</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-[#A85A44] hover:underline text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. NICODEMUS10"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-[#FAF8F5] border border-[#D5CDBD] text-xs px-3 py-2.5 rounded-sm uppercase placeholder:normal-case focus:outline-none focus:border-[#181716]"
                    />
                    <button
                      type="submit"
                      className="bg-[#181716] text-[#FAF8F5] px-4 py-2.5 rounded-sm text-xs font-semibold uppercase tracking-wider hover:bg-[#34302C]"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="text-[11px] text-[#A85A44] mt-1">{promoError}</p>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-2.5 text-xs text-[#5D5750] border-t border-[#D8D0C4] pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#181716]">{formatPrice(cartSubtotal)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#8F683D]">
                    <span>Privilege Discount</span>
                    <span>-{formatPrice(cartDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Nationwide Shipping</span>
                  <span className="text-[#355E3B] font-semibold">
                    {remainingForFreeShipping === 0 ? 'Complimentary' : formatPrice(4500)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>VAT &amp; Packaging</span>
                  <span className="text-[#355E3B]">Included</span>
                </div>

                <div className="flex justify-between text-base font-semibold text-[#181716] border-t border-[#D8D0C4] pt-4">
                  <span>Estimated Total</span>
                  <span>{formatPrice(cartTotal + (remainingForFreeShipping === 0 ? 0 : 4500))}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                id="cart-page-proceed-btn"
                onClick={() => navigateTo('checkout')}
                className="w-full bg-[#181716] hover:bg-[#34302C] text-[#FAF8F5] py-4 px-6 rounded-sm text-xs font-semibold uppercase tracking-[0.22em] transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[10px] uppercase tracking-wider text-[#7D7771] flex items-center justify-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8F683D]" />
                <span>Audited Direct Wire &amp; NIP Settlement</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
