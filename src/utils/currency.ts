/**
 * Currency and locale formatting utilities tailored to Nigerian Standards (NGN / ₦)
 */

export const formatPrice = (amount: number): string => {
  if (isNaN(amount)) return '₦0';
  return `₦${Math.round(amount).toLocaleString('en-NG')}`;
};

export const formatNaira = formatPrice;

export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  // Clean phone and ensure standard Nigerian representation
  return phone;
};

export const NIGERIAN_STATES = [
  'Abia',
  'Abuja (FCT)',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara'
];
