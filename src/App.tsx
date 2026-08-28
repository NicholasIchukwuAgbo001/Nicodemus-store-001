import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';
import { SearchOverlay } from './components/common/SearchOverlay';
import { CartDrawer } from './components/common/CartDrawer';
import { QuickViewModal } from './components/common/QuickViewModal';
import { SizeGuideModal } from './components/common/SizeGuideModal';
import { AuthModal } from './components/account/AuthModal';

// Home Section Components
import { HeroSection } from './components/home/HeroSection';
import { CategoryGrid } from './components/home/CategoryGrid';
import { NewArrivals } from './components/home/NewArrivals';
import { TrendingNow } from './components/home/TrendingNow';
import { CampaignSection } from './components/home/CampaignSection';
import { BestSellers } from './components/home/BestSellers';
import { BrandStory } from './components/home/BrandStory';
import { SocialGallery } from './components/home/SocialGallery';
import { Newsletter } from './components/home/Newsletter';

// Views
import { ShopCatalog } from './components/shop/ShopCatalog';
import { ProductDetail } from './components/product/ProductDetail';
import { FullCartPage } from './components/cart/FullCartPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { OrderConfirmationPage } from './components/checkout/OrderConfirmationPage';
import { AccountDashboard } from './components/account/AccountDashboard';
import { WishlistPage } from './components/wishlist/WishlistPage';
import { StoryPage, ShippingReturnsPage, FaqPage, ContactPage } from './components/info/StaticPages';

const MainAppContent: React.FC = () => {
  const { activeView } = useStore();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#181716] antialiased selection:bg-[#C29E74]/30 selection:text-[#181716]">
      {/* Universal Header */}
      <Header />

      {/* Main Dynamic View Controller - Add padding to account for fixed header */}
      <main className="flex-1 pt-[120px] sm:pt-[115px]">
        {activeView === 'home' && (
          <div id="home-view">
            <HeroSection />
            <CategoryGrid />
            <NewArrivals />
            <TrendingNow />
            <CampaignSection />
            <BestSellers />
            <BrandStory />
            <SocialGallery />
            <Newsletter />
          </div>
        )}

        {activeView === 'shop' && <ShopCatalog />}
        {activeView === 'product-detail' && <ProductDetail />}
        {activeView === 'cart' && <FullCartPage />}
        {activeView === 'checkout' && <CheckoutPage />}
        {activeView === 'order-confirmation' && <OrderConfirmationPage />}
        {activeView === 'account' && <AccountDashboard />}
        {activeView === 'wishlist' && <WishlistPage />}
        {activeView === 'story' && <StoryPage />}
        {activeView === 'shipping-returns' && <ShippingReturnsPage />}
        {activeView === 'faqs' && <FaqPage />}
        {activeView === 'contact' && <ContactPage />}
      </main>

      {/* Universal Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <SearchOverlay />
      <CartDrawer />
      <QuickViewModal />
      <SizeGuideModal />
      <AuthModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainAppContent />
    </StoreProvider>
  );
}
