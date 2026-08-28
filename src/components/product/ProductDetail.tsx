import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { formatPrice } from '../../utils/currency';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  RefreshCw, 
  ShieldCheck, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Minus, 
  Ruler, 
  Sparkles,
  Share2,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProductDetail: React.FC = () => {
  const { 
    selectedProductId, 
    products, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    navigateTo, 
    setIsSizeGuideOpen,
    reviews,
    addReview,
    showToast
  } = useStore();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImage, setActiveImage] = useState(product?.primaryImage || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes.find((s) => s.inStock)?.size || product?.sizes[0]?.size || 'One Size'
  );
  const [quantity, setQuantity] = useState(1);
  
  // Accordion states
  const [openAccordion, setOpenAccordion] = useState<string | null>('desc');

  // Review Form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // If activeImage is out of sync when switching products
  React.useEffect(() => {
    if (product) {
      setActiveImage(product.primaryImage);
      setSelectedColor(product.colors[0]?.name || '');
      setSelectedSize(product.sizes.find((s) => s.inStock)?.size || product.sizes[0]?.size || 'One Size');
      setQuantity(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product?.id]);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  const productReviews = reviews.filter((r) => r.productId === product.id);
  const recommendations = products.filter((p) => p.id !== product.id && (p.category === product.category || p.isTrending)).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity, true);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity, false);
    navigateTo('checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Link Copied', 'Product link copied to your clipboard.', 'info');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor || !reviewTitle || !reviewComment) {
      showToast('Incomplete review', 'Please fill in all review fields.', 'warning');
      return;
    }
    addReview({
      productId: product.id,
      author: reviewAuthor,
      rating: reviewRating,
      title: reviewTitle,
      comment: reviewComment,
      verifiedPurchase: true,
      colorBought: selectedColor,
      sizeBought: selectedSize,
    });
    setReviewAuthor('');
    setReviewTitle('');
    setReviewComment('');
    setReviewSubmitted(true);
  };

  const toggleSection = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div id="product-detail-page" className="min-h-screen bg-[#FAF8F5] pb-24">
      
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 border-b border-[#E8E2DA]">
        <nav className="flex items-center text-xs tracking-wider uppercase text-[#7D7771] space-x-2">
          <button onClick={() => navigateTo('home')} className="hover:text-[#181716]">Home</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => navigateTo('shop', undefined, product.category)} className="hover:text-[#181716]">
            {product.category}
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#181716] font-medium truncate max-w-xs">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Left Column: Gallery & Vertical Thumbnails */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnail Column */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[640px] shrink-0 no-scrollbar">
              {product.gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`w-18 h-24 md:w-20 md:h-26 rounded-sm overflow-hidden border-2 transition-all shrink-0 bg-[#E8E2DA] ${
                    activeImage === img ? 'border-[#181716] shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} angle ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Stage Image */}
            <div className="flex-1 relative aspect-editorial bg-[#F2EDE5] rounded-sm overflow-hidden shadow-sm group">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                {product.isNew && (
                  <span className="bg-[#181716] text-[#FAF8F5] text-[10px] uppercase tracking-[0.2em] font-semibold px-3 py-1">
                    New Arrival
                  </span>
                )}
                {product.originalPrice && (
                  <span className="bg-[#A85A44] text-[#FAF8F5] text-[10px] uppercase tracking-[0.2em] font-semibold px-3 py-1">
                    Archive Privé
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Product Config, Purchasing & Details */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category & Ratings */}
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[#7D7771] mb-2">
                <span>{product.category} • {product.subCategory}</span>
                <div className="flex items-center gap-1.5">
                  <div className="flex text-[#C29E74]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-[#181716]">{product.rating.toFixed(1)}</span>
                  <span>({product.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-editorial text-3xl sm:text-4xl text-[#181716] font-normal leading-tight">
                {product.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-3 pb-6 border-b border-[#E8E2DA]">
                <span className="text-2xl sm:text-3xl font-semibold text-[#181716] tracking-tight">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-[#9E968B] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="text-xs text-[#A85A44] font-medium ml-auto">
                    Save {formatPrice(product.originalPrice - product.price)} (Privé Sale)
                  </span>
                )}
              </div>

              {/* Color Selector */}
              <div className="pt-6">
                <div className="flex justify-between text-xs mb-3">
                  <span className="text-[#7D7771] uppercase tracking-wider">Shade:</span>
                  <span className="font-semibold text-[#181716]">{selectedColor}</span>
                </div>
                <div className="flex gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-8 h-8 rounded-full p-0.5 border-2 transition-all cursor-pointer ${
                        selectedColor === c.name ? 'border-[#181716] scale-110' : 'border-transparent'
                      }`}
                      title={c.name}
                    >
                      <span
                        className="w-full h-full rounded-full block border border-[#D5CDBD]"
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="pt-6">
                <div className="flex justify-between text-xs mb-3">
                  <span className="text-[#7D7771] uppercase tracking-wider">Size:</span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[#8F683D] underline hover:text-[#181716] font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    Interactive Size Guide (NG/UK/EU)
                  </button>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s.size}
                      disabled={!s.inStock}
                      onClick={() => setSelectedSize(s.size)}
                      className={`h-11 text-xs font-semibold rounded-sm border transition-all cursor-pointer ${
                        !s.inStock
                          ? 'bg-[#EAE4DB] text-[#9E968B] border-[#D5CDBD] cursor-not-allowed line-through'
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

              {/* Stock Status & Quantity Stepper */}
              <div className="pt-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  {product.stockStatus === 'Low Stock' ? (
                    <span className="text-[#A85A44] font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Limited Availability (Only 3 crafted in Atelier)
                    </span>
                  ) : (
                    <span className="text-[#355E3B] font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> In Stock — Ready to Dispatch
                    </span>
                  )}
                </div>

                <div className="flex items-center border border-[#D5CDBD] rounded-sm bg-[#FAF8F5]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-[#7D7771] hover:text-[#181716] hover:bg-[#F2ECE3] cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-3 text-xs font-semibold text-[#181716]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-[#7D7771] hover:text-[#181716] hover:bg-[#F2ECE3] cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Primary Buttons */}
              <div className="pt-6 space-y-3">
                <div className="flex gap-3">
                  <button
                    id="pdp-add-to-bag-btn"
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#181716] hover:bg-[#34302C] text-[#FAF8F5] py-4 px-6 rounded-sm text-xs font-semibold uppercase tracking-[0.2em] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag — {formatPrice(product.price * quantity)}</span>
                  </button>

                  <button
                    id="pdp-wishlist-btn"
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-4 rounded-sm border transition-colors cursor-pointer ${
                      inWishlist
                        ? 'bg-[#181716] text-[#FAF8F5] border-[#181716]'
                        : 'bg-[#FAF8F5] text-[#181716] border-[#D5CDBD] hover:bg-[#F2ECE3]'
                    }`}
                    aria-label="Add to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#C29E74] text-[#C29E74]' : ''}`} />
                  </button>

                  <button
                    onClick={handleShare}
                    className="p-4 rounded-sm border border-[#D5CDBD] bg-[#FAF8F5] text-[#7D7771] hover:text-[#181716] hover:bg-[#F2ECE3] transition-colors cursor-pointer"
                    aria-label="Share product"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                <button
                  id="pdp-buy-now-btn"
                  onClick={handleBuyNow}
                  className="w-full bg-[#FAF8F5] hover:bg-[#EAE4DB] text-[#181716] border border-[#181716] py-3.5 px-6 rounded-sm text-xs font-semibold uppercase tracking-[0.18em] transition-colors cursor-pointer"
                >
                  Direct Bank Transfer Checkout
                </button>
              </div>

              {/* Trust Badges Bar */}
              <div className="mt-8 pt-6 border-t border-[#E8E2DA] grid grid-cols-3 gap-3 text-center text-[10px] uppercase tracking-wider text-[#615B54]">
                <div className="flex flex-col items-center gap-1.5 p-2 bg-[#F2EDE5] rounded-sm">
                  <Truck className="w-4 h-4 text-[#8F683D]" />
                  <span>Nationwide Express</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 bg-[#F2EDE5] rounded-sm">
                  <RefreshCw className="w-4 h-4 text-[#8F683D]" />
                  <span>14-Day Concierge Exchange</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 p-2 bg-[#F2EDE5] rounded-sm">
                  <ShieldCheck className="w-4 h-4 text-[#8F683D]" />
                  <span>Certified Authentic</span>
                </div>
              </div>

              {/* Collapsible Accordions */}
              <div className="mt-8 border-t border-[#E8E2DA] divide-y divide-[#E8E2DA] text-xs">
                
                {/* Description & Silhouette */}
                <div>
                  <button
                    onClick={() => toggleSection('desc')}
                    className="w-full py-4 flex items-center justify-between font-semibold uppercase tracking-wider text-[#181716] cursor-pointer"
                  >
                    <span>Description &amp; Silhouette</span>
                    {openAccordion === 'desc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordion === 'desc' && (
                    <div className="pb-4 text-[#5D5750] leading-relaxed space-y-3">
                      <p>{product.description}</p>
                      {product.features && product.features.length > 0 && (
                        <ul className="list-disc pl-4 space-y-1 text-[#4A453F]">
                          {product.features.map((feat, idx) => (
                            <li key={idx}>{feat}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>

                {/* Material & Artisan Care */}
                <div>
                  <button
                    onClick={() => toggleSection('care')}
                    className="w-full py-4 flex items-center justify-between font-semibold uppercase tracking-wider text-[#181716] cursor-pointer"
                  >
                    <span>Material &amp; Artisan Care</span>
                    {openAccordion === 'care' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordion === 'care' && (
                    <div className="pb-4 text-[#5D5750] leading-relaxed space-y-2">
                      <p><strong className="text-[#181716]">Fabrication:</strong> {product.material}</p>
                      <p><strong className="text-[#181716]">Care Instructions:</strong> {product.careInstructions}</p>
                      <p className="text-[11px] text-[#7D7771]">Each garment includes a protective dust cover and cedar sachet.</p>
                    </div>
                  )}
                </div>

                {/* Shipping & Returns */}
                <div>
                  <button
                    onClick={() => toggleSection('shipping')}
                    className="w-full py-4 flex items-center justify-between font-semibold uppercase tracking-wider text-[#181716] cursor-pointer"
                  >
                    <span>Delivery &amp; Returns</span>
                    {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openAccordion === 'shipping' && (
                    <div className="pb-4 text-[#5D5750] leading-relaxed space-y-2">
                      <p>Complimentary courier delivery across Lagos, Abuja, Port Harcourt &amp; nationwide on all orders over ₦250,000. Orders placed before 2:00 PM WAT dispatch same business day.</p>
                      <p>Returns and exchanges are accepted within 14 days of receipt in original, unworn condition with atelier tags intact.</p>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Customer Reviews Section */}
        <div id="product-reviews-section" className="mt-20 pt-16 border-t border-[#E8E2DA]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Reviews Summary & Submission Form */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8F683D]">
                  Client Feedback
                </span>
                <h3 className="font-editorial text-3xl text-[#181716] font-normal mt-1">
                  Reviews &amp; Reflections
                </h3>

                <div className="flex items-center gap-4 mt-4 p-4 bg-[#F2EDE5] rounded-sm">
                  <div className="text-center pr-4 border-r border-[#DED7CB]">
                    <span className="font-editorial text-4xl font-bold text-[#181716]">
                      {product.rating.toFixed(1)}
                    </span>
                    <div className="flex text-[#C29E74] mt-1 justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-[#5D5750]">
                    <p className="font-semibold text-[#181716]">100% of respondents recommend this piece</p>
                    <p className="text-[#7D7771] mt-0.5">Based on {product.reviewCount} verified client acquisitions.</p>
                  </div>
                </div>
              </div>

              {/* Write a Review Form */}
              <div className="p-6 bg-[#FAF8F5] border border-[#E8E2DA] rounded-sm">
                <h4 className="font-editorial text-lg text-[#181716] mb-3">Leave a Review</h4>

                {reviewSubmitted ? (
                  <div className="p-4 bg-[#EAF2EC] text-[#2C5234] rounded-sm text-xs">
                    Thank you. Your review has been recorded into the Maison directory.
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-[#7D7771] uppercase tracking-wider mb-1">Your Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setReviewRating(star)}
                            className="p-1 text-[#C29E74] cursor-pointer"
                          >
                            <Star className={`w-5 h-5 ${star <= reviewRating ? 'fill-[#C29E74]' : 'text-[#D5CDBD]'}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#7D7771] uppercase tracking-wider mb-1">Name</label>
                      <input
                        type="text"
                        value={reviewAuthor}
                        onChange={(e) => setReviewAuthor(e.target.value)}
                        placeholder="e.g. Amina O."
                        className="w-full bg-[#FAF8F5] border border-[#D5CDBD] p-2.5 rounded-sm text-xs text-[#181716]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[#7D7771] uppercase tracking-wider mb-1">Headline</label>
                      <input
                        type="text"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        placeholder="e.g. Masterful tailoring and stunning drape"
                        className="w-full bg-[#FAF8F5] border border-[#D5CDBD] p-2.5 rounded-sm text-xs text-[#181716]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[#7D7771] uppercase tracking-wider mb-1">Experience</label>
                      <textarea
                        rows={3}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Share your thoughts on fit, fabric weight, and styling..."
                        className="w-full bg-[#FAF8F5] border border-[#D5CDBD] p-2.5 rounded-sm text-xs text-[#181716]"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#181716] text-[#FAF8F5] py-3 text-xs font-semibold uppercase tracking-widest rounded-sm hover:bg-[#34302C] transition-colors cursor-pointer"
                    >
                      Submit Review
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Review Cards List */}
            <div className="lg:col-span-7 space-y-6">
              {productReviews.length === 0 ? (
                <div className="p-8 bg-[#F2EDE5] rounded-sm text-center text-xs text-[#7D7771]">
                  Be the first to share reflections on this creation.
                </div>
              ) : (
                productReviews.map((rev) => (
                  <div key={rev.id} className="p-6 bg-[#FAF8F5] border border-[#E8E2DA] rounded-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex text-[#C29E74]">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[11px] text-[#7D7771]">{rev.date}</span>
                    </div>

                    <h5 className="font-editorial text-base text-[#181716] font-medium">{rev.title}</h5>
                    <p className="text-xs text-[#5D5750] leading-relaxed">{rev.comment}</p>

                    <div className="pt-2 flex items-center justify-between text-[11px] text-[#7D7771] border-t border-[#E8E2DA]">
                      <span className="font-medium text-[#181716]">{rev.author}</span>
                      {rev.verifiedPurchase && (
                        <span className="text-[#355E3B] flex items-center gap-1 font-medium">
                          <CheckCircle2 className="w-3 h-3" /> Verified Client
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>

        {/* Complete the Look / Recommended Products */}
        <div className="mt-24 pt-16 border-t border-[#E8E2DA]">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8F683D]">
              Styling Inspiration
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl text-[#181716] font-normal mt-1">
              YOU MAY ALSO APPRECIATE
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {recommendations.map((rec) => (
              <ProductCard key={rec.id} product={rec} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
