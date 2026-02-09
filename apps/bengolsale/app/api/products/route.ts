import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            where: { brandId: "bengolsale" },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ success: true, products });
    } catch (error: any) {
        console.error("Failed to fetch products:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
