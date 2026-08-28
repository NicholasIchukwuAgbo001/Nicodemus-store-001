import { StoreConfig } from '../types';

export const STORE_CONFIG: StoreConfig = {
  accountName: "NICODEMUS 001 LUXURY ATELIER NIGERIA LTD",
  accountNumber: "1019842750",
  bankName: "Zenith Bank Plc",
  swiftCode: "ZEIBNGLA",
  routingNumber: "057150013",
  paymentInstructions: "Transfer the exact order amount in Nigerian Naira (₦) via NIP Instant Transfer, mobile app, or USSD to the official NICODEMUS 001 corporate account above. Please use your Order ID as the narration/reference or submit your transaction reference/receipt below for instant reconciliation.",
  supportEmail: "concierge@nicodemus001.com",
  supportPhone: "+234 812 001 0001",
  conciergeHours: "Monday – Saturday: 8:00 AM – 8:00 PM (WAT / West Africa Time)",
  freeShippingThreshold: 250000,
  shippingRates: {
    standard: 4500,
    express: 9500,
    vip: 15000,
  },
};

export interface NigerianBankOption {
  bankName: string;
  accountName: string;
  accountNumber: string;
  bankCode?: string;
  branch?: string;
}

export const NIGERIAN_BANK_ACCOUNTS: NigerianBankOption[] = [
  {
    bankName: "Zenith Bank Plc",
    accountName: "NICODEMUS 001 LUXURY ATELIER NIGERIA LTD",
    accountNumber: "1019842750",
    bankCode: "057",
    branch: "Victoria Island Commercial Branch, Lagos",
  },
  {
    bankName: "Guaranty Trust Bank (GTBank)",
    accountName: "NICODEMUS 001 LUXURY ATELIER NIGERIA LTD",
    accountNumber: "0128495031",
    bankCode: "058",
    branch: "Adetokunbo Ademola Branch, V.I., Lagos",
  },
  {
    bankName: "Access Bank Plc",
    accountName: "NICODEMUS 001 LUXURY ATELIER NIGERIA LTD",
    accountNumber: "0723849102",
    bankCode: "044",
    branch: "Ikoyi Commercial Hub, Lagos",
  },
];

export const BANK_DETAILS = {
  bankName: "Zenith Bank Plc",
  accountName: "NICODEMUS 001 LUXURY ATELIER NIGERIA LTD",
  accountNumber: "1019842750",
  swiftCode: "ZEIBNGLA",
  routingCode: "057150013",
  branch: "Plot 14B Walter Carrington, Victoria Island, Lagos",
};

export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  description: string;
  estimatedDays: string;
}

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'lagos-standard',
    name: 'Lagos Standard Delivery',
    price: 4500,
    description: 'Bespoke hand-packaged delivery across Lagos Island & Mainland. Free on orders above ₦250,000.',
    estimatedDays: '1–2 Business Days',
  },
  {
    id: 'lagos-express',
    name: 'Lagos Same-Day Priority Dispatch',
    price: 9500,
    description: 'Dedicated private courier dispatch for orders placed before 2:00 PM WAT.',
    estimatedDays: 'Same Day (Lagos)',
  },
  {
    id: 'interstate-express',
    name: 'Nationwide Interstate Priority Express',
    price: 15000,
    description: 'Secured air & ground dispatch to Abuja, Port Harcourt, Ibadan, Kano, and all 36 States.',
    estimatedDays: '2–3 Business Days',
  },
  {
    id: 'atelier-pickup',
    name: 'Victoria Island Atelier Pick-up & Fitting',
    price: 0,
    description: 'Complimentary private collection and custom fitting at our flagship atelier in Victoria Island.',
    estimatedDays: 'Ready in 2 Hours',
  },
];

export interface PromoCode {
  code: string;
  discountPercentage: number;
  description: string;
  minimumOrder?: number;
}

export const VALID_PROMO_CODES: PromoCode[] = [
  {
    code: 'NICODEMUS10',
    discountPercentage: 10,
    description: '10% Privé Welcome Courtesy off all collections',
  },
  {
    code: 'WELCOME20',
    discountPercentage: 20,
    description: '20% Special Acquisition privilege for orders over ₦200,000',
    minimumOrder: 200000,
  },
  {
    code: 'LAGOS15',
    discountPercentage: 15,
    description: '15% Seasonal Runway Edit privilege',
  },
  {
    code: 'EDITORIAL15',
    discountPercentage: 15,
    description: '15% Seasonal Runway Edit privilege',
  },
];

export const SIZE_CHART = {
  clothing: [
    { size: 'UK 6 / XS (US 2)', bust: '32 in (81 cm)', waist: '24-25 in (61-64 cm)', hips: '34-35 in (86-89 cm)' },
    { size: 'UK 8 / S (US 4)', bust: '34 in (86 cm)', waist: '26-27 in (66-69 cm)', hips: '36-37 in (91-94 cm)' },
    { size: 'UK 10 / M (US 6)', bust: '36 in (91 cm)', waist: '28-29 in (71-74 cm)', hips: '38-39 in (96-99 cm)' },
    { size: 'UK 12 / L (US 8)', bust: '38 in (97 cm)', waist: '30-32 in (76-81 cm)', hips: '40-42 in (102-107 cm)' },
    { size: 'UK 14 / XL (US 10)', bust: '40 in (102 cm)', waist: '33-35 in (84-89 cm)', hips: '43-45 in (109-114 cm)' },
    { size: 'UK 16 / XXL (US 12)', bust: '42 in (107 cm)', waist: '36-38 in (91-97 cm)', hips: '46-48 in (117-122 cm)' },
    { size: 'UK 18 / 3XL (US 14)', bust: '44 in (112 cm)', waist: '39-41 in (99-104 cm)', hips: '49-51 in (124-130 cm)' },
  ],
  shoes: [
    { eu: '36', uk: '3.5', us: '6.0', cm: '23.0 cm' },
    { eu: '37', uk: '4.0', us: '6.5 - 7.0', cm: '23.5 cm' },
    { eu: '38', uk: '5.0', us: '7.5 - 8.0', cm: '24.5 cm' },
    { eu: '39', uk: '6.0', us: '8.5', cm: '25.0 cm' },
    { eu: '40', uk: '6.5', us: '9.0 - 9.5', cm: '25.5 cm' },
    { eu: '41', uk: '7.5', us: '10.0', cm: '26.5 cm' },
    { eu: '42', uk: '8.0', us: '10.5 - 11.0', cm: '27.0 cm' },
  ],
};

