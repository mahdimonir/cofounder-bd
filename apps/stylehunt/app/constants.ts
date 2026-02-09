import { Gem, Maximize, Palette, Zap } from 'lucide-react';
import { Combo, FAQItem } from './types';

export const BRAND = {
  name: "StyleHunt",
  logo: "/stylehunt/logo.svg",
  tagline: "Find Your Style. Shop the Trend",
  currency: "৳",
  supportPhone: "+8801805543688",
}
export const HERO = {
  title: "Find Your Style. Shop the Trend",
  subtitle: "Best deals on trendy clothes, footwear & accessories",
  cta: "Shop Now",
}

export const HEJEL_PRODUCTS = [
  'Ash Graphite Grey', 'Blush Pink (2)', 'Blush Pink', 'Creamy White & Peach Floral',
  'Deep Plum Purple', 'Ice Blue', 'Lavender Beige', 'Lilac Lavender',
  'Mint Sage & Soft Coral', 'Mint Snow', 'Misty Grey Beige', 'Peach Rose',
  'Peach Sherbet', 'Pink', 'Powder Blue & Rose Mist', 'Sage Green Pastel',
  'Soft Beige & Pink Floral', 'Teal Green', 'Warm Taupe Mauve'
];

export const COMBOS: Combo[] = [
  {
    id: 'pack-6',
    name: '6 Piece Combo Pack',
    price: 6000,
    image: '/products/pack-6.png',
    description: 'Best Value Pack - Any 6 Pieces',
    isPack: true,
    color: 'Mixed'
  },
  {
    id: 'pack-3',
    name: '3 Piece Combo Pack',
    price: 3050,
    image: '/products/pack-3.png',
    description: 'Premium Dress Combo - Any 3 Pieces',
    isPack: true,
    color: 'Mixed'
  },
  ...HEJEL_PRODUCTS.map(name => ({
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: `${name} Hejel`,
    price: 1050,
    originalPrice: 1200,
    image: `/products/${name}.png`,
    description: 'Fabric: Cotton | Size: Free Size | Set: Kameez, Salwar & Dupatta',
    isPack: false,
    color: name
  }))
];

export const SIZES = ['Free Size'];

export const FEATURES = [
  { title: 'Premium Fabric', description: 'Soft & Comfortable Cotton Blend fabric.', icon: Gem },
  { title: 'Color Guarantee', description: 'No color fading even after multiple washes (90-95% color match).', icon: Palette },
  { title: 'Comfortable Fit', description: 'Perfect for summer and daily wear.', icon: Maximize },
  { title: 'Long-lasting Print', description: 'High-density quality print, durable and long-lasting.', icon: Zap },
];

export const FAQS: FAQItem[] = [
  { question: 'What kind of fabric is this T-shirt made of?', answer: 'It is made of premium quality soft & comfortable Cotton Blend fabric, which is comfortable for both summer and daily wear.' },
  { question: 'Is the print long-lasting?', answer: 'Yes, high-density quality print is used. It does not fade easily even after repeated washing.' },
  { question: 'Will the color remain the same?', answer: 'It will match 90–95% with the picture. There might be a slight difference due to lighting or screen resolution.' },
  { question: 'How long will delivery take?', answer: 'You will receive it within 2-3 days anywhere in Bangladesh.' },
  { question: 'How do I order?', answer: 'Just send your Name, Address, Phone Number, and Size to confirm your order (or order directly from the website).' },
  { question: 'How much is the delivery charge?', answer: '130 Taka nationwide, 80 Taka inside Chittagong. Delivery is completely FREE if you buy 3 pieces or more!' },
];
