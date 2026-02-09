/**
 * Shared utility functions for order processing, pricing, and formatting.
 */

export type CheckoutMode = 'SIMPLE' | 'WHATSAPP' | 'ONLINE';

export interface BrandConfig {
    id: string;
    name: string;
    slug: string;
    checkoutMode: CheckoutMode;
    supportPhone?: string;
    freeThreshold?: number;
}

/**
 * Formats a number into a Bangla currency string (Taka).
 * @param amount Number to format
 * @returns Formatted string (e.g., ৳১,০০০)
 */
export const formatPrice = (amount: number): string => {
    return `৳${amount.toLocaleString('en-BD')}`;
};

/**
 * Calculates delivery charges based on subtotal and location.
 * @param subtotal Order subtotal
 * @param area 'inside' or 'outside'
 * @param options Calculation options like freeThreshold or forceFree override
 * @returns Delivery charge amount
 */
export const calculateDeliveryCharge = (
    subtotal: number,
    area: 'inside' | 'outside' | null,
    options: {
        freeThreshold?: number;
        isFree?: boolean;
    } = {}
): number => {
    if (options.isFree) return 0;
    if (options.freeThreshold && subtotal >= options.freeThreshold) return 0;
    if (!options.freeThreshold && subtotal >= 5000) return 0; // Default
    if (!area) return 0;
    return area === 'inside' ? 80 : 130;
};

/**
 * Generates a WhatsApp message string for order placement.
 * @param orderData Object containing customer and order details
 * @returns Formatted WhatsApp message string
 */
export interface OrderItem {
    name: string;
    variant?: string;
    price: number;
    quantity: number;
}

export interface OrderData {
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    deliveryArea: string;
    items: OrderItem[];
    subtotal: number;
    deliveryCharge: number;
    total: number;
    promoCode?: string;
    savings?: number;
    brandName?: string;
}

/**
 * Calculates total savings from a list of items with old prices.
 * @param items List of items with price and optional oldPrice
 * @returns Total savings amount
 */
export interface SavingsItem {
    price: number;
    oldPrice?: number;
    quantity: number;
}

export const calculateSavings = (items: SavingsItem[]): number => {
    return items.reduce((acc, item) => {
        const original = item.oldPrice || item.price;
        return acc + (original - item.price) * item.quantity;
    }, 0);
};

export const generateWhatsAppMessage = (data: OrderData): string => {
    const brandHeader = data.brandName ? `*[${data.brandName}]* ` : '';
    const itemsList = data.items
        .map(item => `• ${item.name}${item.variant ? ` (${item.variant})` : ''} x ${item.quantity} = ${formatPrice(item.price * item.quantity)}`)
        .join('\n');

    const message = `
${brandHeader}*নতুন অর্ডার* 🛍️
-----------------------------
*কাস্টমার ডিটেইলস:*
নাম: ${data.customerName}
ফোন: ${data.customerPhone}
 ঠিকানা: ${data.customerAddress}
এরিয়া: ${data.deliveryArea}

*অর্ডার ডিটেইলস:*
${itemsList}

-----------------------------
সাবটোটাল: ${formatPrice(data.subtotal)}
ডেলিভারি চার্জ: ${data.deliveryCharge === 0 ? 'FREE' : formatPrice(data.deliveryCharge)}
${data.savings ? `ডিসকাউন্ট: -${formatPrice(data.savings)}\n` : ''}*মোট বিল: ${formatPrice(data.total)}*
-----------------------------
ধন্যবাদ! 👋
  `.trim();

    return encodeURIComponent(message);
};

/**
 * Rate limiting utility for API routes.
 * Implementation from Bengolsale - Map-based tracking with expiration.
 */
type RateLimitOptions = {
    limit: number;
    windowMs: number;
};

const trackers = new Map<string, { count: number; expiresAt: number }>();

export function isRateLimited(key: string, options: RateLimitOptions): boolean {
    const now = Date.now();
    const record = trackers.get(key);

    if (!record) {
        trackers.set(key, {
            count: 1,
            expiresAt: now + options.windowMs,
        });
        return false;
    }

    if (now > record.expiresAt) {
        trackers.set(key, {
            count: 1,
            expiresAt: now + options.windowMs,
        });
        return false;
    }

    record.count++;

    return record.count > options.limit;
}

/**
 * Validates Bangladeshi phone numbers.
 * Implementation from Bengolsale.
 */
export function validateBDPhoneNumber(phone: string): boolean {
    const regex = /^(?:\+?88)?01[3-9]\d{8}$/;
    return regex.test(phone);
}

/**
 * Formats phone numbers to a consistent +880 format.
 * Implementation from Bengolsale.
 */
export function formatBDPhoneNumber(phone: string): string {
    let cleaned = phone.replace(/\D/g, '');

    if (cleaned.startsWith('8801')) {
        return '+' + cleaned;
    }
    if (cleaned.startsWith('01')) {
        return '+88' + cleaned;
    }
    if (cleaned.startsWith('1')) {
        return '+880' + cleaned;
    }
    return phone;
}
