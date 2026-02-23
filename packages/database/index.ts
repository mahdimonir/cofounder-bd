import { Order, PlatformUser, Product } from '@cofounder/types';
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from '@prisma/client';
import { Pool } from "pg";

/**
 * Shared Prisma Client Initialization (Singleton Pattern)
 */
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Use type casting to handle Prisma 7 adapter property if types are lagging
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter } as any);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/**
 * Universal Order Service
 */
export interface OrderFilter {
    brandId?: string;
    status?: Order['status'];
    startDate?: Date;
    endDate?: Date;
}

export const OrderService = {
    async getOrders(filter: OrderFilter): Promise<Order[]> {
        const where: any = {};
        if (filter.brandId) where.brandId = filter.brandId;
        if (filter.status) where.status = filter.status;

        const data = await prisma.order.findMany({
            where,
            include: {
                items: true,
                brand: {
                    select: {
                        domain: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
            take: 100
        });

        return data.map(o => ({
            id: o.id,
            customerName: o.customerName || 'Unknown',
            customerPhone: o.customerPhone || 'N/A',
            customerAddress: o.customerAddress || undefined,
            customerArea: o.customerArea || undefined,
            total: o.total,
            deliveryCharge: o.deliveryCharge,
            status: o.status as Order['status'],
            paymentMethod: o.paymentMethod,
            shippingAddress: o.shippingAddress,
            createdAt: o.createdAt.toISOString(),
            brandId: o.brandId || undefined,
            brandDomain: o.brand?.domain || undefined,
            items: o.items.map(item => ({
                id: item.id,
                productId: item.productId || '',
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                selectedSize: item.selectedSize,
                selectedColor: item.selectedColor,
                imageUrl: item.imageUrl
            }))
        })) as Order[];
    },

    async updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
        await prisma.order.update({
            where: { id: orderId },
            data: { status: status as any }
        });
    }
};

/**
 * Universal Product/Inventory Service
 */
export const ProductService = {
    async getProducts(brandId?: string): Promise<Product[]> {
        const where: any = {};
        if (brandId) where.brandId = brandId;

        const data = await prisma.product.findMany({
            where,
            include: {
                brand: {
                    select: {
                        domain: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return data.map(p => ({
            id: String(p.id),
            name: p.name,
            price: p.price,
            description: p.description,
            image: p.imageUrl,
            category: p.category || 'General',
            brandId: p.brandId || undefined,
            brandDomain: p.brand?.domain || undefined
        }));
    },

    async updateStock(productId: string, quantity: number): Promise<void> {
        await prisma.product.update({
            where: { id: productId },
            data: { quantity }
        });
    }
};

/**
 * Universal Customer/User Service
 */
export const CustomerService = {
    async getCustomers(brandId: string): Promise<PlatformUser[]> {
        const where: any = { role: 'CUSTOMER' };
        if (brandId === 'zest-wear') {
            // Zest Wear has real users
            const data = await prisma.user.findMany({
                where: { ...where },
                take: 100
            });

            return data.map(u => ({
                id: u.id,
                name: u.name || 'Anonymous',
                email: u.email || 'N/A',
                role: 'CUSTOMER',
                brandAccess: [{ brandId: 'zest-wear', role: 'CUSTOMER' }]
            }));
        }

        // For other brands, customers are derived from Orders (for now)
        const orders = await prisma.order.findMany({
            where: { brandId },
            distinct: ['customerPhone'],
            orderBy: { createdAt: 'desc' },
            take: 50
        });

        return orders.map(o => ({
            id: `cust-${o.customerPhone}`,
            name: o.customerName || 'Guest',
            email: 'N/A',
            role: 'CUSTOMER',
            brandAccess: [{ brandId: o.brandId || brandId, role: 'CUSTOMER' }]
        }));
    }
};
