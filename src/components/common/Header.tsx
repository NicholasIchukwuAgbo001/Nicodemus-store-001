import React, { useState, useEffect } from 'react';
import { useStore, AppView } from '../../context/StoreContext';
import {
  Search,
  ShoppingBag,
  Heart,
  User as UserIcon,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  ArrowRight,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const {
    activeView,
    navigateTo,
    cartCount,
    wishlistCount,
    setIsSearchOpen,
    setIsCartDrawerOpen,
    currentUser,
    setIsAuthModalOpen,
    setAuthModalMode,
    logout,
    activeCategoryFilter,
    setActiveCategoryFilter
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', view: 'home' as AppView },
    { label: 'Shop All', view: 'shop' as AppView, category: 'All' },
    { label: 'Clothing', view: 'shop' as AppView, category: 'Clothing' },
    { label: 'Shoes', view: 'shop' as AppView, category: 'Shoes' },
    { label: 'Bags', view: 'shop' as AppView, category: 'Bags' },
    { label: 'Accessories', view: 'shop' as AppView, category: 'Accessories' },
    { label: 'New Arrivals', view: 'shop' as AppView, category: 'New Arrivals' },
    { label: 'Sale', view: 'shop' as AppView, category: 'Sale', isHighlight: true },
  ];

  const handleNavClick = (view: AppView, category?: string) => {
    if (category) {
      setActiveCategoryFilter(category);
    }
    navigateTo(view, undefined, category);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div
        id="announcement-bar"
        className="bg-[#181716] text-[#E8E2DA] text-[11px] font-medium tracking-[0.2em] py-2 px-4 text-center border-b border-[#2C2925] flex items-center justify-center gap-2"
      >
        <span className="hidden sm:inline">COMPLIMENTARY DELIVERY ACROSS NIGERIA ON ORDERS OVER ₦250,000</span>
        <span className="hidden sm:inline text-[#C29E74]">•</span>
        <span>LAGOS ATELIER &amp; NATIONWIDE CONCIERGE</span>
      </div>

      {/* Main Sticky Header */}
      <header
        id="main-header"
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm border-b border-[#E8E2DA] py-3.5'
            : 'bg-[#FAF8F5] border-b border-[#ECE6DC] py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Mobile Menu Trigger & Search */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 text-[#181716] hover:text-[#C29E74] transition-colors focus:outline-none"
              aria-label="Open mobile navigation"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              id="mobile-search-btn"
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-[#181716] hover:text-[#C29E74] transition-colors focus:outline-none"
              aria-label="Search products"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo / Wordmark */}
          <div className="flex items-center">
            <button
              id="brand-logo-btn"
              onClick={() => handleNavClick('home')}
              className="group text-left focus:outline-none"
            >
              <div className="flex flex-col items-start">
                <span className="font-brand text-xl sm:text-2xl font-bold tracking-[0.24em] text-[#181716] group-hover:text-[#38332E] transition-colors">
                  NICODEMUS<span className="text-[#C29E74] ml-1.5 font-normal tracking-[0.15em]">001</span>
                </span>
                <span className="text-[8px] uppercase tracking-[0.35em] text-[#7D7771] font-medium mt-0.5">
                  Women's Atelier & Lifestyle
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Center Navigation */}
          <nav
            id="desktop-nav"
            className="hidden lg:flex items-center space-x-7"
            aria-label="Main Navigation"
          >
            {navLinks.map((item) => {
              const isActive =
                item.view === 'home'
                  ? activeView === 'home'
                  : activeView === 'shop' &&
                  (item.category === 'All'
                    ? activeCategoryFilter === 'All' || !activeCategoryFilter
                    : activeCategoryFilter === item.category);

              return (
                <button
                  key={item.label}
                  id={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleNavClick(item.view, item.category)}
                  className={`text-xs uppercase tracking-[0.18em] font-medium transition-all duration-200 py-1 relative hover:text-[#C29E74] ${item.isHighlight
                      ? isActive
                        ? 'text-[#B8533E] font-bold'
                        : 'text-[#B8533E] font-semibold'
                      : isActive
                        ? 'text-[#181716] font-bold'
                        : 'text-[#4A453F]'
                    }`}
                >
                  {item.label}
                  {/* Active Indicator line */}
                  {isActive && (
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[1.5px] ${item.isHighlight ? 'bg-[#B8533E]' : 'bg-[#181716]'
                        }`}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-5">
            {/* Desktop Search Icon */}
            <button
              id="desktop-search-btn"
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 text-[#2E2B27] hover:text-[#C29E74] transition-colors text-xs tracking-wider"
              aria-label="Search catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account / User Menu */}
            <div className="relative">
              <button
                id="account-btn"
                onClick={() => {
                  if (currentUser) {
                    setAccountDropdownOpen(!accountDropdownOpen);
                  } else {
                    setAuthModalMode('login');
                    setIsAuthModalOpen(true);
                  }
                }}
                className="p-1.5 text-[#181716] hover:text-[#C29E74] transition-colors relative focus:outline-none flex items-center gap-1.5"
                aria-label="User Account"
              >
                <UserIcon className="w-5 h-5" />
                {currentUser && (
                  <span className="hidden xl:inline text-xs tracking-wider font-medium text-[#4A453F]">
                    {currentUser.firstName}
                  </span>
                )}
              </button>

              {/* Logged-In User Dropdown */}
              {currentUser && accountDropdownOpen && (
                <div
                  id="account-dropdown-menu"
                  className="absolute right-0 mt-3 w-56 bg-[#FAF8F5] border border-[#E8E2DA] shadow-xl rounded-md py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-4 py-2 border-b border-[#ECE6DC]">
                    <p className="text-xs text-[#7D7771]">Signed in as</p>
                    <p className="text-sm font-semibold text-[#181716] truncate">
                      {currentUser.firstName} {currentUser.lastName}
                    </p>
                    <span className="inline-block mt-1 text-[10px] bg-[#181716] text-[#FAF8F5] px-2 py-0.5 rounded tracking-widest uppercase">
                      {currentUser.memberTier}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      navigateTo('account');
                      setAccountDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs tracking-wider uppercase hover:bg-[#F2ECE3] transition-colors flex items-center justify-between"
                  >
                    Dashboard & Orders
                    <ChevronRight className="w-3.5 h-3.5 text-[#7D7771]" />
                  </button>

                  <button
                    onClick={() => {
                      navigateTo('wishlist');
                      setAccountDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs tracking-wider uppercase hover:bg-[#F2ECE3] transition-colors flex items-center justify-between"
                  >
                    My Saved Items
                    <span className="text-[11px] font-mono text-[#C29E74]">{wishlistCount}</span>
                  </button>

                  <div className="border-t border-[#ECE6DC] my-1" />

                  <button
                    onClick={() => {
                      logout();
                      setAccountDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs tracking-wider uppercase text-[#B8533E] hover:bg-[#FBEBE7] transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist Icon */}
            <button
              id="wishlist-header-btn"
              onClick={() => navigateTo('wishlist')}
              className="p-1.5 text-[#181716] hover:text-[#C29E74] transition-colors relative focus:outline-none"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span
                  id="wishlist-count-badge"
                  className="absolute -top-1 -right-1 bg-[#C29E74] text-[#FAF8F5] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs"
                >
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              id="shopping-bag-header-btn"
              onClick={() => setIsCartDrawerOpen(true)}
              className="p-1.5 text-[#181716] hover:text-[#C29E74] transition-colors relative focus:outline-none group flex items-center"
              aria-label="Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
                {cartCount > 0 && (
                  <span
                    id="cart-count-badge"
                    className="absolute -top-1.5 -right-2 bg-[#181716] text-[#FAF8F5] text-[10px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center shadow-xs"
                  >
                    {cartCount}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#141312]/60 backdrop-blur-xs z-50 lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              id="mobile-navigation-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-[#FAF8F5] z-50 shadow-2xl flex flex-col justify-between overflow-y-auto lg:hidden"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-[#E8E2DA] flex items-center justify-between">
                <div>
                  <span className="font-brand text-lg font-bold tracking-[0.2em] text-[#181716]">
                    NICODEMUS<span className="text-[#C29E74] ml-1">001</span>
                  </span>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-[#7D7771]">Atelier & Lifestyle</p>
                </div>
                <button
                  id="close-mobile-menu-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#7D7771] hover:text-[#181716] rounded-full hover:bg-[#F2ECE3] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Navigation Links */}
              <div className="p-6 space-y-4 flex-1">
                <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#A88860]">
                  Collections & Catalog
                </p>
                <div className="space-y-1">
                  {navLinks.map((link) => {
                    const isActive =
                      link.view === 'home'
                        ? activeView === 'home'
                        : activeView === 'shop' &&
                        (link.category === 'All'
                          ? activeCategoryFilter === 'All' || !activeCategoryFilter
                          : activeCategoryFilter === link.category);

                    return (
                      <button
                        key={link.label}
                        onClick={() => handleNavClick(link.view, link.category)}
                        className={`w-full flex items-center justify-between py-3 px-3 rounded-md text-xs tracking-widest uppercase transition-colors ${link.isHighlight
                            ? isActive
                              ? 'text-[#B8533E] font-bold bg-[#FAF1EF] border-l-2 border-[#B8533E]'
                              : 'text-[#B8533E] font-semibold bg-[#FAF1EF]'
                            : isActive
                              ? 'text-[#181716] font-bold bg-[#ECE6DC] border-l-2 border-[#181716]'
                              : 'text-[#181716] hover:bg-[#F2ECE3] font-medium'
                          }`}
                      >
                        <span>{link.label}</span>
                        <ChevronRight className="w-4 h-4 text-[#A8A196]" />
                      </button>
                    );
                  })}
                </div>

                <div className="pt-4 border-t border-[#E8E2DA] space-y-1">
                  <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#A88860] mb-2">
                    Client Services
                  </p>
                  <button
                    onClick={() => {
                      if (currentUser) {
                        navigateTo('account');
                      } else {
                        setAuthModalMode('login');
                        setIsAuthModalOpen(true);
                      }
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between py-2.5 px-2 text-xs tracking-wider uppercase text-[#4A453F] hover:bg-[#F2ECE3] rounded-lg"
                  >
                    <span>{currentUser ? `Account (${currentUser.firstName})` : 'Sign In / Register'}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#A8A196]" />
                  </button>

                  <button
                    onClick={() => {
                      navigateTo('wishlist');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between py-2.5 px-2 text-xs tracking-wider uppercase text-[#4A453F] hover:bg-[#F2ECE3] rounded-lg"
                  >
                    <span>Wishlist ({wishlistCount})</span>
                    <Heart className="w-3.5 h-3.5 text-[#C29E74]" />
                  </button>

                  <button
                    onClick={() => {
                      navigateTo('story');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between py-2.5 px-2 text-xs tracking-wider uppercase text-[#4A453F] hover:bg-[#F2ECE3] rounded-lg"
                  >
                    <span>Our Story & Craft</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#A8A196]" />
                  </button>

                  <button
                    onClick={() => {
                      navigateTo('shipping-returns');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between py-2.5 px-2 text-xs tracking-wider uppercase text-[#4A453F] hover:bg-[#F2ECE3] rounded-lg"
                  >
                    <span>Shipping & Returns</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#A8A196]" />
                  </button>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-6 bg-[#F4EFEA] border-t border-[#E8E2DA]">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-[#C29E74]" />
                  <p className="text-[11px] text-[#4A453F] font-medium">
                    Complimentary VIP packaging included with all orders.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
