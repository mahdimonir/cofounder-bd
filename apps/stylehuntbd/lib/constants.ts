export const RAMADAN_DISCOUNT = 0.30; // 30%

export function calculateDiscountedPrice(price: number): number {
  return price * (1 - RAMADAN_DISCOUNT);
}

export function formatPrice(price: number): string {
  return `৳${price.toLocaleString()}`;
}
