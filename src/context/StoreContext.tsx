import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  User, 
  Address, 
  Order, 
  OrderStatus, 
  Review, 
  FilterState, 
  Category 
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS } from '../data/products';
import { VALID_PROMO_CODES, PromoCode, STORE_CONFIG } from '../data/storeConfig';
import { formatPrice } from '../utils/currency';

export type AppView = 
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'account'
  | 'wishlist'
  | 'story'
  | 'shipping-returns'
  | 'faqs'
  | 'contact';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: number;
}

interface StoreContextType {
  // Navigation & Views
  activeView: AppView;
  selectedProductId: string | null;
  selectedProduct: Product | null;
  activeCategoryFilter: string;
  setActiveCategoryFilter: (cat: string) => void;
  selectedSubCategory: string | null;
  setSelectedSubCategory: (sub: string | null) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedSizes: string[];
  setSelectedSizes: (sizes: string[]) => void;
  toggleSizeFilter: (size: string) => void;
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
  toggleColorFilter: (color: string) => void;
  inStockOnly: boolean;
  setInStockOnly: (inStock: boolean) => void;
  sortBy: 'featured' | 'newest' | 'bestseller' | 'price-low' | 'price-high' | 'rating';
  setSortBy: (sort: 'featured' | 'newest' | 'bestseller' | 'price-low' | 'price-high' | 'rating') => void;
  clearAllFilters: () => void;
  navigateTo: (view: AppView, productId?: string, category?: string) => void;

  // Catalog & Reviews
  products: Product[];
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'verified'>) => void;

  // Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartTotal: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  addToCart: (product: Product, color: string, size: string, quantity?: number, openDrawer?: boolean) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  appliedPromo: PromoCode | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;

  // Wishlist
  wishlist: string[];
  wishlistCount: number;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Modals & Overlays
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register' | 'forgot';
  setAuthModalMode: (mode: 'login' | 'register' | 'forgot') => void;
  isQuickViewOpen: boolean;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;

  // Auth & User Account
  currentUser: User | null;
  login: (email: string, pass: string) => boolean;
  register: (data: { firstName: string; lastName: string; email: string; phone: string; password?: string }) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  editAddress: (address: Address) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;

  // Orders & Checkout
  orders: Order[];
  lastConfirmedOrder: Order | null;
  placeOrder: (orderData: {
    customer: { name: string; email: string; phone: string };
    deliveryAddress: Address;
    shippingMethod: { id: string; name: string; price: number; estimatedDays: string };
    paymentReference: string;
    paymentProofUrl?: string;
    paymentProofName?: string;
  }) => Order;
  trackOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Notifications
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  dismissToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Initial Demo User tailored for Nigerian Client Profile
const DEFAULT_DEMO_USER: User = {
  id: 'usr-nicodemus-01',
  firstName: 'Dr. Folashade',
  lastName: 'Adeleke',
  email: 'folashade.adeleke@luxegroup.ng',
  phone: '+234 803 555 0194',
  memberTier: 'Privé Noir',
  joinedDate: 'January 2026',
  defaultAddressId: 'addr-1',
  addresses: [
    {
      id: 'addr-1',
      title: 'Banana Island Residence (Default)',
      recipientName: 'Dr. Folashade Adeleke',
      street: 'Penthouse 4, Ocean Parade Towers, Banana Island',
      city: 'Ikoyi, Lagos',
      state: 'Lagos',
      postalCode: '101233',
      country: 'Nigeria',
      phone: '+234 803 555 0194',
      isDefault: true,
    },
    {
      id: 'addr-2',
      title: 'Abuja Diplomatic Residence',
      recipientName: 'Dr. Folashade Adeleke',
      street: 'Plot 18, Ontario Crescent, Off Mississippi Street',
      city: 'Maitama, Abuja',
      state: 'Abuja (FCT)',
      postalCode: '900271',
      country: 'Nigeria',
      phone: '+234 803 555 0194',
      isDefault: false,
    },
  ],
};

const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'NCD-829104',
    date: 'August 24, 2026',
    items: [
      {
        id: 'prod-satin-midi-Champagne Ochre-UK 8 (S)',
        product: INITIAL_PRODUCTS[0],
        selectedColor: 'Champagne Ochre',
        selectedSize: 'UK 8 (S)',
        quantity: 1,
      },
      {
        id: 'prod-structured-handbag-Tuscan Tan-One Size',
        product: INITIAL_PRODUCTS[7],
        selectedColor: 'Tuscan Tan',
        selectedSize: 'One Size',
        quantity: 1,
      },
    ],
    customer: {
      name: 'Dr. Folashade Adeleke',
      email: 'folashade.adeleke@luxegroup.ng',
      phone: '+234 803 555 0194',
    },
    deliveryAddress: {
      id: 'addr-1',
      title: 'Banana Island Residence',
      recipientName: 'Dr. Folashade Adeleke',
      street: 'Penthouse 4, Ocean Parade Towers, Banana Island',
      city: 'Ikoyi, Lagos',
      state: 'Lagos',
      postalCode: '101233',
      country: 'Nigeria',
      phone: '+234 803 555 0194',
      isDefault: true,
    },
    shippingMethod: {
      id: 'lagos-express',
      name: 'Lagos Same-Day Priority Dispatch',
      price: 9500,
      estimatedDays: 'Same Day (Lagos)',
    },
    subtotal: 1120000,
    discount: 112000,
    promoCode: 'NICODEMUS10',
    shippingFee: 9500,
    total: 1017500,
    paymentMethod: 'Bank Wire Transfer',
    paymentReference: 'NIP-ZENITH-99482103',
    paymentStatus: 'Confirmed',
    deliveryStatus: 'Processing',
    timeline: [
      {
        status: 'Pending',
        label: 'Order Registered',
        timestamp: 'Aug 24, 2026 - 10:14 AM WAT',
        description: 'Order logged and pieces allocated in Victoria Island luxury vault.',
        completed: true,
        current: false,
      },
      {
        status: 'Payment Verification',
        label: 'NIP Bank Transfer Verified',
        timestamp: 'Aug 24, 2026 - 11:30 AM WAT',
        description: 'Settlement confirmed by Zenith Bank Plc.',
        completed: true,
        current: false,
      },
      {
        status: 'Confirmed',
        label: 'Order Confirmed',
        timestamp: 'Aug 24, 2026 - 11:35 AM WAT',
        description: 'Dispatched to white-glove packaging department.',
        completed: true,
        current: false,
      },
      {
        status: 'Processing',
        label: 'Artisan Packaging & Inspection',
        timestamp: 'Aug 25, 2026 - 09:00 AM WAT',
        description: 'Pieces are undergoing quality inspection and signature packaging.',
        completed: true,
        current: true,
      },
      {
        status: 'Shipped',
        label: 'Priority Dispatch in Transit',
        timestamp: 'Estimated Aug 27, 2026',
        description: 'Transferred to dedicated Lagos VIP courier.',
        completed: false,
        current: false,
      },
      {
        status: 'Delivered',
        label: 'Delivered to Residence',
        timestamp: 'Estimated Aug 28, 2026',
        description: 'Hand-delivered with verification signature.',
        completed: false,
        current: false,
      },
    ],
  },
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [activeView, setActiveView] = useState<AppView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'bestseller' | 'price-low' | 'price-high' | 'rating'>('featured');

  const toggleSizeFilter = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColorFilter = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const clearAllFilters = () => {
    setActiveCategoryFilter('All');
    setSelectedSubCategory(null);
    setPriceRange([0, 1500000]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setInStockOnly(false);
    setSortBy('featured');
  };

  // Products & Reviews
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('nicodemus_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('nicodemus_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(() => {
    const saved = localStorage.getItem('nicodemus_promo');
    return saved ? JSON.parse(saved) : null;
  });
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('nicodemus_wishlist');
    return saved ? JSON.parse(saved) : ['prod-satin-midi', 'prod-structured-handbag'];
  });

  // Overlays
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [isQuickViewOpen, setIsQuickViewOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);

  // Auth User State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('nicodemus_user');
    return saved ? JSON.parse(saved) : DEFAULT_DEMO_USER;
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('nicodemus_orders');
    return saved ? JSON.parse(saved) : INITIAL_DEMO_ORDERS;
  });
  const [lastConfirmedOrder, setLastConfirmedOrder] = useState<Order | null>(() => {
    const saved = localStorage.getItem('nicodemus_last_order');
    return saved ? JSON.parse(saved) : null;
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('nicodemus_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('nicodemus_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('nicodemus_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('nicodemus_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (appliedPromo) {
      localStorage.setItem('nicodemus_promo', JSON.stringify(appliedPromo));
    } else {
      localStorage.removeItem('nicodemus_promo');
    }
  }, [appliedPromo]);

  useEffect(() => {
    localStorage.setItem('nicodemus_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Toast Helper
  const showToast = (
    title: string,
    message: string,
    type: 'success' | 'info' | 'warning' | 'error' = 'success'
  ) => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title,
      message,
      type,
      timestamp: Date.now(),
    };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation Helper
  const navigateTo = (view: AppView, productId?: string, category?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (productId) {
      setSelectedProductId(productId);
    }
    if (category) {
      setActiveCategoryFilter(category);
      setSelectedSubCategory(null);
    }
    setActiveView(view);
  };

  // Selected Product Resolver
  const selectedProduct = selectedProductId
    ? products.find((p) => p.id === selectedProductId || p.slug === selectedProductId) || products[0]
    : null;

  // Cart Computations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartDiscount = appliedPromo
    ? Math.round((cartSubtotal * appliedPromo.discountPercentage) / 100)
    : 0;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);

  // Cart Operations
  const addToCart = (
    product: Product,
    color: string,
    size: string,
    quantity: number = 1,
    openDrawer: boolean = true
  ) => {
    const itemId = `${product.id}-${color}-${size}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: itemId, product, selectedColor: color, selectedSize: size, quantity }];
    });

    showToast('Added to Shopping Bag', `${product.name} (${color}, ${size}) added.`, 'success');

    if (openDrawer) {
      setIsCartDrawerOpen(true);
    }
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    const item = cart.find((i) => i.id === itemId);
    setCart((prev) => prev.filter((i) => i.id !== itemId));
    if (item) {
      showToast('Item Removed', `${item.product.name} removed from your bag.`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const match = VALID_PROMO_CODES.find((p) => p.code === cleanCode);
    if (!match) {
      showToast('Invalid Promo Code', 'Please check the code and try again.', 'error');
      return { success: false, message: 'Invalid promo code' };
    }
    if (match.minimumOrder && cartSubtotal < match.minimumOrder) {
      showToast(
        'Minimum Order Required',
        `This promo code requires a minimum purchase of ${formatPrice(match.minimumOrder)}.`,
        'warning'
      );
      return { success: false, message: `Minimum order of ${formatPrice(match.minimumOrder)} required` };
    }
    setAppliedPromo(match);
    showToast('Privilege Applied', `${match.discountPercentage}% discount added to your order.`, 'success');
    return { success: true, message: `${match.discountPercentage}% off applied!` };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo Code Removed', 'The promotional discount has been removed.', 'info');
  };

  // Wishlist Operations
  const toggleWishlist = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', `${product?.name || 'Item'} removed.`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist', `${product?.name || 'Item'} saved to your private collection.`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);
  const wishlistCount = wishlist.length;

  // Quick View Operations
  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  // Auth Operations
  const login = (email: string, _pass: string): boolean => {
    const nameFromEmail = email.split('@')[0];
    const capitalized = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
    const loggedInUser: User = {
      id: `usr-${Date.now()}`,
      firstName: currentUser?.firstName || capitalized,
      lastName: currentUser?.lastName || 'Client',
      email: email,
      phone: currentUser?.phone || '+1 (555) 019-2830',
      memberTier: 'Privé Gold',
      joinedDate: 'August 2026',
      addresses: currentUser?.addresses && currentUser.addresses.length > 0 ? currentUser.addresses : DEFAULT_DEMO_USER.addresses,
      defaultAddressId: 'addr-1',
    };
    setCurrentUser(loggedInUser);
    setIsAuthModalOpen(false);
    showToast('Welcome to NICODEMUS 001', `Signed in as ${loggedInUser.firstName} ${loggedInUser.lastName}.`, 'success');
    return true;
  };

  const register = (data: { firstName: string; lastName: string; email: string; phone: string }): boolean => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      memberTier: 'Privé Silver',
      joinedDate: 'August 2026',
      addresses: [],
    };
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    showToast('Account Created', `Welcome to the world of NICODEMUS 001, ${data.firstName}.`, 'success');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Signed Out', 'You have been signed out successfully.', 'info');
    if (activeView === 'account') {
      setActiveView('home');
    }
  };

  const updateProfile = (data: Partial<User>) => {
    if (!currentUser) return;
    setCurrentUser((prev) => (prev ? { ...prev, ...data } : null));
    showToast('Profile Updated', 'Your profile details have been saved.', 'success');
  };

  const addAddress = (addrData: Omit<Address, 'id'>) => {
    if (!currentUser) return;
    const newAddr: Address = {
      ...addrData,
      id: `addr-${Date.now()}`,
    };
    let updatedAddresses = [...currentUser.addresses];
    if (newAddr.isDefault || updatedAddresses.length === 0) {
      updatedAddresses = updatedAddresses.map((a) => ({ ...a, isDefault: false }));
      newAddr.isDefault = true;
    }
    updatedAddresses.push(newAddr);
    setCurrentUser({
      ...currentUser,
      addresses: updatedAddresses,
      defaultAddressId: newAddr.isDefault ? newAddr.id : currentUser.defaultAddressId,
    });
    showToast('Address Saved', 'New delivery address added successfully.', 'success');
  };

  const editAddress = (address: Address) => {
    if (!currentUser) return;
    let updated = currentUser.addresses.map((a) => (a.id === address.id ? address : a));
    if (address.isDefault) {
      updated = updated.map((a) => (a.id === address.id ? { ...a, isDefault: true } : { ...a, isDefault: false }));
    }
    setCurrentUser({
      ...currentUser,
      addresses: updated,
      defaultAddressId: address.isDefault ? address.id : currentUser.defaultAddressId,
    });
    showToast('Address Updated', 'Address changes have been saved.', 'success');
  };

  const deleteAddress = (id: string) => {
    if (!currentUser) return;
    const filtered = currentUser.addresses.filter((a) => a.id !== id);
    setCurrentUser({
      ...currentUser,
      addresses: filtered,
    });
    showToast('Address Removed', 'Delivery address has been removed.', 'info');
  };

  const setDefaultAddress = (id: string) => {
    if (!currentUser) return;
    const updated = currentUser.addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    setCurrentUser({
      ...currentUser,
      addresses: updated,
      defaultAddressId: id,
    });
    showToast('Default Address Set', 'Primary delivery address updated.', 'success');
  };

  // Orders & Checkout
  const placeOrder = (orderData: {
    customer: { name: string; email: string; phone: string };
    deliveryAddress: Address;
    shippingMethod: { id: string; name: string; price: number; estimatedDays: string };
    paymentReference: string;
    paymentProofUrl?: string;
    paymentProofName?: string;
  }): Order => {
    const randomOrderNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `NCD-${randomOrderNum}`;
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    const calculatedSubtotal = cartSubtotal;
    const calculatedDiscount = cartDiscount;
    const calculatedShipping = orderData.shippingMethod.price;
    const finalTotal = calculatedSubtotal - calculatedDiscount + calculatedShipping;

    const newOrder: Order = {
      id: orderId,
      date: dateFormatted,
      items: [...cart],
      customer: orderData.customer,
      deliveryAddress: orderData.deliveryAddress,
      shippingMethod: orderData.shippingMethod,
      subtotal: calculatedSubtotal,
      discount: calculatedDiscount,
      promoCode: appliedPromo?.code,
      shippingFee: calculatedShipping,
      total: finalTotal,
      paymentMethod: 'Bank Wire Transfer',
      paymentReference: orderData.paymentReference || `REF-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      paymentProofUrl: orderData.paymentProofUrl,
      paymentProofName: orderData.paymentProofName,
      paymentStatus: 'Pending Verification',
      deliveryStatus: 'Payment Verification',
      timeline: [
        {
          status: 'Pending',
          label: 'Order Registered',
          timestamp: `${dateFormatted} - Just Now`,
          description: 'Order registered in NICODEMUS 001 system.',
          completed: true,
          current: false,
        },
        {
          status: 'Payment Verification',
          label: 'Verifying Bank Reference',
          timestamp: 'Under Review',
          description: `Client services reviewing reference: ${orderData.paymentReference}`,
          completed: true,
          current: true,
        },
        {
          status: 'Confirmed',
          label: 'Order Confirmation',
          timestamp: 'Pending Transfer Audit',
          description: 'Allocation of atelier pieces to client order.',
          completed: false,
          current: false,
        },
        {
          status: 'Processing',
          label: 'Bespoke Packaging',
          timestamp: 'Estimated +24h',
          description: 'White-glove wrapping and security sealing.',
          completed: false,
          current: false,
        },
        {
          status: 'Shipped',
          label: 'Dispatched in Transit',
          timestamp: `Estimated +${orderData.shippingMethod.estimatedDays}`,
          description: 'Handed to priority courier.',
          completed: false,
          current: false,
        },
        {
          status: 'Delivered',
          label: 'Delivered',
          timestamp: 'Estimated Delivery Window',
          description: 'Direct handoff with recipient verification.',
          completed: false,
          current: false,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastConfirmedOrder(newOrder);
    localStorage.setItem('nicodemus_last_order', JSON.stringify(newOrder));
    clearCart();
    navigateTo('order-confirmation');
    showToast('Order Placed Successfully', `Order #${orderId} received. Verification in progress.`, 'success');
    return newOrder;
  };

  const trackOrderById = (orderId: string): Order | undefined => {
    return orders.find((o) => o.id.toUpperCase() === orderId.trim().toUpperCase());
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const updatedTimeline = order.timeline.map((event) => {
            if (event.status === status) {
              return { ...event, completed: true, current: true };
            }
            return event;
          });
          return { ...order, deliveryStatus: status, timeline: updatedTimeline };
        }
        return order;
      })
    );
    showToast('Order Status Updated', `Order #${orderId} status set to ${status}.`, 'info');
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'date' | 'verified'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      verified: true,
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast('Review Submitted', 'Thank you for sharing your experience.', 'success');
  };

  return (
    <StoreContext.Provider
      value={{
        activeView,
        selectedProductId,
        selectedProduct,
        activeCategoryFilter,
        setActiveCategoryFilter,
        selectedSubCategory,
        setSelectedSubCategory,
        priceRange,
        setPriceRange,
        selectedSizes,
        setSelectedSizes,
        toggleSizeFilter,
        selectedColors,
        setSelectedColors,
        toggleColorFilter,
        inStockOnly,
        setInStockOnly,
        sortBy,
        setSortBy,
        clearAllFilters,
        navigateTo,

        products,
        reviews,
        addReview,

        cart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        cartTotal,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        appliedPromo,
        applyPromoCode,
        removePromoCode,

        wishlist,
        wishlistCount,
        toggleWishlist,
        isInWishlist,

        isSearchOpen,
        setIsSearchOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        isQuickViewOpen,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isSizeGuideOpen,
        setIsSizeGuideOpen,

        currentUser,
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        editAddress,
        deleteAddress,
        setDefaultAddress,

        orders,
        lastConfirmedOrder,
        placeOrder,
        trackOrderById,
        updateOrderStatus,

        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
