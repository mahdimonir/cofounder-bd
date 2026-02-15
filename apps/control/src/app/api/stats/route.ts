import { prisma } from '@cofounder/database';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const brandId = searchParams.get('brandId');

    const where = brandId ? { brandId } : {};

    try {
        const totalOrders = await prisma.order.count({ where });
        const recentOrders = await prisma.order.findMany({
            where,
            take: 5,
            orderBy: { createdAt: 'desc' }
        });

        const revenue = await prisma.order.aggregate({
            where: { ...where, status: 'DELIVERED' },
            _sum: { total: true }
        });

        const activeOrders = await prisma.order.count({
            where: {
                ...where,
                status: { in: ['PENDING', 'PROCESSING', 'SHIPPED'] }
            }
        });

        const totalProducts = await prisma.product.count({ where });

        return NextResponse.json({
            revenue: revenue._sum.total || 0,
            activeOrders,
            totalOrders,
            totalProducts,
            recentOrders: recentOrders.map((o: any) => ({
                id: o.id,
                customer: o.customerName || 'Guest',
                total: o.total,
                status: o.status,
                createdAt: o.createdAt
            }))
        });
    } catch (error) {
        console.error('Stats API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
