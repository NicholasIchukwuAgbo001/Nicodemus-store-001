import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'Provide a complete email to receive our journal.', 'warning');
      return;
    }
    setIsSuccess(true);
    showToast('Privé Subscription Confirmed', 'Welcome to NICODEMUS 001. Check your inbox for your 10% welcome privilege.', 'success');
  };

  return (
    <section id="newsletter-section" className="py-20 lg:py-24 bg-[#181716] text-[#FAF8F5] relative overflow-hidden">
      {/* Subtle geometric lines in background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#FAF8F5]" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-[#FAF8F5]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-semibold text-[#C29E74] mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Privé Guest List</span>
        </div>

        <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#FAF8F5] font-normal leading-tight">
          JOIN THE WORLD OF NICODEMUS 001
        </h2>

        <p className="text-xs sm:text-sm text-[#BDB5A8] mt-3 max-w-md mx-auto leading-relaxed">
          Discover new collections, exclusive offers and the latest style inspiration.
        </p>

        {isSuccess ? (
          <div className="mt-8 p-6 bg-[#24211D] border border-[#C29E74]/40 rounded-sm max-w-md mx-auto">
            <Check className="w-6 h-6 text-[#C29E74] mx-auto mb-2" />
            <h4 className="font-editorial text-lg text-[#FAF8F5]">You are on the Guest List</h4>
            <p className="text-xs text-[#B5ACA0] mt-1">
              Your 10% welcome courtesy is active. Use promo code <strong className="text-[#C29E74]">NICODEMUS10</strong> at checkout.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="bg-[#24211D] border border-[#3E3A34] text-xs text-[#FAF8F5] px-4 py-3.5 rounded-sm focus:outline-none focus:border-[#C29E74] flex-1 placeholder:text-[#6C665F]"
              required
            />
            <button
              id="newsletter-subscribe-btn"
              type="submit"
              className="bg-[#FAF8F5] text-[#181716] hover:bg-[#DED7CC] px-7 py-3.5 rounded-sm text-xs font-semibold uppercase tracking-[0.2em] transition-colors shrink-0 flex items-center justify-center gap-2"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <p className="text-[10px] text-[#736D65] mt-4 tracking-wider uppercase">
          Respectful communication only. You may unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};
