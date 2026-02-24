import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const brands = await prisma.brand.findMany();
        const productCount = await prisma.product.count({
            where: { brandId: "stylehuntbd" }
        });
        const sampleProducts = await prisma.product.findMany({
            where: { brandId: "stylehuntbd" },
            take: 5,
            select: { id: true, name: true }
        });

        return NextResponse.json({
            message: "Database Diagnostic",
            brands: brands.map(b => ({ id: b.id, name: b.name })),
            stylehuntProductCount: productCount,
            sampleProducts,
            env: {
                hasDatabaseUrl: !!process.env.DATABASE_URL,
            }
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
