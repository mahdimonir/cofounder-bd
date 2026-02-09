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
}

/**
 * Orders
 */
export interface Order {
    id: string;
    customerName: string;
    customerPhone: string;
    total: number;
    status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    createdAt: string;
}
