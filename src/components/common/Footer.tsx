import React, { useState } from 'react';
import { useStore, AppView } from '../../context/StoreContext';
import { 
  ArrowRight, 
  Instagram, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  RefreshCw, 
  Lock,
  Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, setActiveCategoryFilter, showToast, setIsSizeGuideOpen } = useStore();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      showToast('Invalid Email', 'Please enter a valid email address.', 'warning');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed to NICODEMUS 001 Privé', 'Use code NICODEMUS10 on your next order.', 'success');
  };

  const handleCategoryClick = (cat: string) => {
    setActiveCategoryFilter(cat);
    navigateTo('shop', undefined, cat);
  };

  return (
    <footer id="main-footer" className="bg-[#141312] text-[#E8E2DA] border-t border-[#292622] pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Perks / Value Pillars */}
        <div 
          id="footer-perks-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-14 border-b border-[#2C2925]"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#201D1A] rounded-lg text-[#C29E74] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold text-[#FAF8F5]">Nationwide Delivery</h4>
              <p className="text-xs text-[#A8A196] mt-1 leading-relaxed">
                Complimentary delivery on orders over ₦250,000. Same-day dispatch in Lagos & express interstate.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#201D1A] rounded-lg text-[#C29E74] shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold text-[#FAF8F5]">14-Day Concierge Exchange</h4>
              <p className="text-xs text-[#A8A196] mt-1 leading-relaxed">
                Seamless door-to-door courier pickups & bespoke size fittings across Nigeria.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#201D1A] rounded-lg text-[#C29E74] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold text-[#FAF8F5]">Haute Craftsmanship</h4>
              <p className="text-xs text-[#A8A196] mt-1 leading-relaxed">
                Individually tailored in numbered limited runs using premium certified natural materials.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-[#201D1A] rounded-lg text-[#C29E74] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold text-[#FAF8F5]">Secure NIP Settlement</h4>
              <p className="text-xs text-[#A8A196] mt-1 leading-relaxed">
                Direct corporate bank transfer with instant reference verification & receipt generation.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-14 border-b border-[#2C2925]">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <span className="font-brand text-2xl font-bold tracking-[0.24em] text-[#FAF8F5]">
                NICODEMUS<span className="text-[#C29E74] ml-1.5 font-normal">001</span>
              </span>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#A88860] mt-1 font-medium">
                Modern Women's Fashion & Lifestyle
              </p>
            </div>

            <p className="text-xs text-[#A8A196] leading-relaxed max-w-sm">
              Crafted for the discerning modern woman. NICODEMUS 001 unites architectural tailoring, sculptural accessories, fine jewelry, and contemporary lifestyle treasures into an uncompromising aesthetic statement.
            </p>

            {/* Newsletter form */}
            <div className="pt-2">
              <p className="text-xs uppercase tracking-wider font-semibold text-[#FAF8F5] mb-2">
                Join the Privé Guest List
              </p>
              {subscribed ? (
                <div className="bg-[#201D1A] border border-[#C29E74]/40 p-3 rounded-lg text-xs text-[#C29E74] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Welcome to the circle. Enjoy 10% off with promo code <strong>NICODEMUS10</strong></span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="bg-[#201D1A] border border-[#3A352F] text-xs text-[#FAF8F5] px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#C29E74] flex-1 placeholder:text-[#6C665F]"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#C29E74] text-[#141312] px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-[#D4B38C] transition-colors shrink-0"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#FAF8F5] mb-4">
              Shop Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A196]">
              <li>
                <button onClick={() => handleCategoryClick('Clothing')} className="hover:text-[#FAF8F5] transition-colors">
                  Women's Clothing & Dresses
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Shoes')} className="hover:text-[#FAF8F5] transition-colors">
                  Footwear & Heels
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Bags')} className="hover:text-[#FAF8F5] transition-colors">
                  Handbags & Crossbody
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Accessories')} className="hover:text-[#FAF8F5] transition-colors">
                  Accessories & Eyewear
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Jewelry')} className="hover:text-[#FAF8F5] transition-colors">
                  Fine & Demi-Fine Jewelry
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Lifestyle')} className="hover:text-[#FAF8F5] transition-colors">
                  Lifestyle & Fragrance
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('Sale')} className="text-[#D97762] hover:text-[#FFA390] transition-colors font-medium">
                  Seasonal Archive Sale
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care Column */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#FAF8F5] mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A196]">
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-[#FAF8F5] transition-colors">
                  Contact Private Concierge
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shipping-returns')} className="hover:text-[#FAF8F5] transition-colors">
                  Global Shipping Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shipping-returns')} className="hover:text-[#FAF8F5] transition-colors">
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button onClick={() => setIsSizeGuideOpen(true)} className="hover:text-[#FAF8F5] transition-colors">
                  Interactive Size Guide
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faqs')} className="hover:text-[#FAF8F5] transition-colors">
                  Client FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* About & Account Column */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#FAF8F5] mb-4">
              The Maison & Account
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A8A196]">
              <li>
                <button onClick={() => navigateTo('story')} className="hover:text-[#FAF8F5] transition-colors">
                  Our Atelier Story
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-[#FAF8F5] transition-colors">
                  Client Account Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-[#FAF8F5] transition-colors">
                  Track Existing Order
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('wishlist')} className="hover:text-[#FAF8F5] transition-colors">
                  Saved Wishlist
                </button>
              </li>
              <li>
                <span className="text-[#C29E74] block font-medium">
                  Privé Loyalty Tier: Active
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom / Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7D7771]">
          <div className="flex items-center gap-6">
            <span>© 2026 NICODEMUS 001. All rights reserved.</span>
            <button onClick={() => navigateTo('story')} className="hover:text-[#A8A196] transition-colors">Privacy Policy</button>
            <button onClick={() => navigateTo('story')} className="hover:text-[#A8A196] transition-colors">Terms of Service</button>
          </div>

          <div className="flex items-center gap-4 text-[#A8A196]">
            <span className="text-[10px] tracking-wider uppercase">Direct Wire • SWIFT • Certified Commercial</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
