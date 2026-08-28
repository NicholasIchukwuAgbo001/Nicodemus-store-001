import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { STORE_CONFIG } from '../../data/storeConfig';
import { formatPrice } from '../../utils/currency';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Heart, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck,
  Plus,
  Minus,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
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

  if (!isCartDrawerOpen) return null;

  const freeShippingThreshold = STORE_CONFIG.freeShippingThreshold;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

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

  const handleCheckoutClick = () => {
    setIsCartDrawerOpen(false);
    navigateTo('checkout');
  };

  const handleViewBagClick = () => {
    setIsCartDrawerOpen(false);
    navigateTo('cart');
  };

  return (
    <AnimatePresence>
      <div id="cart-drawer-overlay" className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartDrawerOpen(false)}
          className="absolute inset-0 bg-[#141312]/60 backdrop-blur-xs transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-5 sm:p-6 border-b border-[#E8E2DA] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#181716]" />
                <h3 className="font-editorial text-lg sm:text-xl font-medium tracking-wide text-[#181716]">
                  Shopping Bag ({cartCount})
                </h3>
              </div>
              <button
                id="close-cart-drawer-btn"
                onClick={() => setIsCartDrawerOpen(false)}
                className="p-1.5 text-[#7D7771] hover:text-[#181716] rounded-full hover:bg-[#F0EAE1] transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Meter */}
            <div className="bg-[#F2EDE5] px-6 py-3.5 border-b border-[#E8E2DA]">
              {remainingForFreeShipping > 0 ? (
                <div>
                  <p className="text-xs text-[#38332E]">
                    Add <strong className="text-[#181716] font-semibold">{formatPrice(remainingForFreeShipping)}</strong> more to unlock <span className="font-semibold text-[#8F683D]">Complimentary Nationwide Shipping</span>
                  </p>
                  <div className="w-full bg-[#DDD5C7] h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-[#C29E74] h-full rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs text-[#355E3B] font-medium">
                  <Sparkles className="w-4 h-4 text-[#C29E74]" />
                  <span>You've unlocked Complimentary Nationwide Express Shipping!</span>
                </div>
              )}
            </div>

            {/* Cart Items List or Empty State */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#F0EAE1] flex items-center justify-center mx-auto text-[#A88860] mb-4">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <h4 className="font-editorial text-2xl text-[#181716]">YOUR BAG IS EMPTY</h4>
                  <p className="text-xs text-[#7D7771] mt-2 max-w-xs mx-auto leading-relaxed">
                    Discover something beautiful to add to your collection.
                  </p>
                  <button
                    onClick={() => {
                      setIsCartDrawerOpen(false);
                      navigateTo('shop');
                    }}
                    className="mt-6 inline-block bg-[#181716] text-[#FAF8F5] text-xs font-semibold uppercase tracking-widest px-8 py-3.5 rounded-sm hover:bg-[#38332E] transition-colors"
                  >
                    Shop Collection
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    id={`cart-item-${item.id}`}
                    className="flex gap-4 pb-6 border-b border-[#E8E2DA] last:border-0"
                  >
                    <img
                      src={item.product.primaryImage}
                      alt={item.product.name}
                      className="w-20 h-26 object-cover rounded-sm bg-[#EAE4DB] shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h5 
                            onClick={() => {
                              setIsCartDrawerOpen(false);
                              navigateTo('product-detail', item.product.id);
                            }}
                            className="font-editorial text-sm font-medium text-[#181716] hover:text-[#8F683D] cursor-pointer line-clamp-1"
                          >
                            {item.product.name}
                          </h5>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#9E968B] hover:text-[#A85A44] transition-colors p-0.5"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-[11px] text-[#7D7771] mt-1 space-x-2">
                          <span>Color: <strong className="text-[#181716] font-normal">{item.selectedColor}</strong></span>
                          <span>•</span>
                          <span>Size: <strong className="text-[#181716] font-normal">{item.selectedSize}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#D5CDBD] rounded-sm bg-[#FAF8F5]">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-[#7D7771] hover:text-[#181716] hover:bg-[#F2ECE3] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 text-xs font-medium text-[#181716]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-[#7D7771] hover:text-[#181716] hover:bg-[#F2ECE3] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-sm font-semibold text-[#181716]">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer / Summary & Actions */}
            {cart.length > 0 && (
              <div className="p-6 bg-[#F4EFEA] border-t border-[#E8E2DA] space-y-4">
                {/* Promo Code Form */}
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-[#FAF8F5] border border-[#C29E74]/50 p-2.5 rounded-sm text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-[#C29E74]" />
                      <span className="font-semibold text-[#181716]">{appliedPromo.code}</span>
                      <span className="text-[#8F683D]">({appliedPromo.discountPercentage}% Off)</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-[#9E968B] hover:text-[#A85A44] text-[11px] underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="ENTER PROMO CODE (e.g. NICODEMUS10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-[#FAF8F5] border border-[#D5CDBD] text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-[#C29E74] uppercase placeholder:normal-case placeholder:text-[#A8A196]"
                    />
                    <button
                      type="submit"
                      className="bg-[#181716] text-[#FAF8F5] text-xs font-semibold px-4 py-2 rounded-sm uppercase tracking-wider hover:bg-[#34302C] transition-colors shrink-0"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {/* Subtotals & Total */}
                <div className="space-y-1.5 text-xs text-[#4A453F] pt-2 border-t border-[#E0D8CC]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-[#181716]">{formatPrice(cartSubtotal)}</span>
                  </div>
                  {cartDiscount > 0 && (
                    <div className="flex justify-between text-[#8F683D]">
                      <span>Privilege Discount</span>
                      <span>-{formatPrice(cartDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="text-[#355E3B] font-medium">
                      {remainingForFreeShipping === 0 ? 'Complimentary' : 'Calculated at Checkout'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-[#181716] pt-2 border-t border-[#E0D8CC]">
                    <span>Estimated Total</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="space-y-2 pt-2">
                  <button
                    id="cart-drawer-checkout-btn"
                    onClick={handleCheckoutClick}
                    className="w-full bg-[#181716] hover:bg-[#302C28] text-[#FAF8F5] py-3.5 px-4 rounded-sm text-xs font-semibold uppercase tracking-[0.2em] shadow-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    id="cart-drawer-view-bag-btn"
                    onClick={handleViewBagClick}
                    className="w-full bg-transparent hover:bg-[#FAF8F5] text-[#181716] border border-[#D5CDBD] py-3 px-4 rounded-sm text-xs font-semibold uppercase tracking-[0.15em] transition-colors"
                  >
                    View Bag Details
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
