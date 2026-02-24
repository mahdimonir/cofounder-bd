export const RAMADAN_DISCOUNT = 0.2; // 20%

export function calculateDiscountedPrice(price: number): number {
  return price * (1 - RAMADAN_DISCOUNT);
}

export function formatPrice(price: number): string {
  return `৳${price.toLocaleString()}`;
}
