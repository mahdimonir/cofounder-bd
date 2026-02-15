/**
 * Platform Roles
 */
export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'STAFF' | 'CUSTOMER';

/**
 * Brand Definition
 */
export interface Brand {
    id: string;
    name: string;
    slug: string;
    domain?: string;
}

/**
 * User Profile (Platform Level)
 */
export interface PlatformUser {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    brandAccess: BrandPermission[];
}

/**
 * Brand-specific Permissions
 */
export interface BrandPermission {
    brandId: string;
    role: 'OWNER' | 'MANAGER' | 'SUPPORT' | 'CUSTOMER';
}

/**
 * Products & Collections
 */
export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category?: string;
    isPack?: boolean;
    brandId?: string;
    brandDomain?: string;
}

/**
 * Orders
 */
export interface OrderItem {
    id: string;
    productId: string;
    name: string | null;
    quantity: number;
    price: number;
    selectedSize: string | null;
    selectedColor: string | null;
    imageUrl: string | null;
}

export interface Order {
    id: string;
    customerName: string;
    customerPhone: string;
    customerAddress?: string;
    customerArea?: string;
    total: number;
    deliveryCharge?: number;
    status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    paymentMethod?: string;
    shippingAddress?: any;
    brandId?: string;
    brandDomain?: string;
    createdAt: string;
    items?: OrderItem[];
}
