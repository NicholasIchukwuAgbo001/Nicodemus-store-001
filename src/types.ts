export type Category = 
  | 'Clothing'
  | 'Shoes'
  | 'Bags'
  | 'Accessories'
  | 'Jewelry'
  | 'Lifestyle';

export interface ProductColor {
  name: string;
  hex: string;
  inStock: boolean;
}

export interface ProductSize {
  size: string;
  inStock: boolean;
  stockCount?: number;
}

export interface ProductDetails {
  materials: string;
  fit: string;
  shipping: string;
  returns: string;
  care: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: Category;
  subCategory: string;
  price: number;
  originalPrice?: number;
  isNew?: boolean;
  isSale?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  details: ProductDetails;
  primaryImage: string;
  secondaryImage: string;
  gallery: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  stockStatus: 'In Stock' | 'Low Stock' | 'Sold Out';
  tags: string[];
  createdAt: string;
}

export interface CartItem {
  id: string; // unique item id composed of productId-color-size
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface Address {
  id: string;
  title?: string;
  recipientName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addresses: Address[];
  defaultAddressId?: string;
  memberTier: 'Privé Silver' | 'Privé Gold' | 'Privé Noir';
  joinedDate: string;
}

export type OrderStatus =
  | 'Pending'
  | 'Payment Verification'
  | 'Confirmed'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export interface OrderTimelineEvent {
  status: OrderStatus;
  label: string;
  timestamp: string;
  description: string;
  completed: boolean;
  current: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  deliveryAddress: Address;
  shippingMethod: {
    id: string;
    name: string;
    price: number;
    estimatedDays: string;
  };
  subtotal: number;
  discount: number;
  promoCode?: string;
  shippingFee: number;
  total: number;
  paymentMethod: 'Bank Wire Transfer' | 'Commercial Account' | 'Direct Deposit';
  paymentReference: string;
  paymentProofUrl?: string;
  paymentProofName?: string;
  paymentStatus: 'Pending Verification' | 'Confirmed' | 'Paid';
  deliveryStatus: OrderStatus;
  timeline: OrderTimelineEvent[];
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  fit: 'True to size' | 'Runs small' | 'Runs large';
}

export interface FilterState {
  category: string;
  subCategory?: string;
  minPrice: number;
  maxPrice: number;
  sizes: string[];
  colors: string[];
  onlyInStock: boolean;
  onlySale: boolean;
  searchQuery: string;
  sortBy: 'featured' | 'newest' | 'bestseller' | 'price-low' | 'price-high' | 'rating';
}

export interface StoreConfig {
  accountName: string;
  accountNumber: string;
  bankName: string;
  swiftCode: string;
  routingNumber: string;
  paymentInstructions: string;
  supportEmail: string;
  supportPhone: string;
  conciergeHours: string;
  freeShippingThreshold: number;
  shippingRates?: {
    standard: number;
    express: number;
    vip: number;
  };
}
