import { ProductService, prisma } from '@cofounder/database';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const brandId = searchParams.get('brandId');

    if (!brandId) {
        return NextResponse.json({ error: 'Brand ID required' }, { status: 400 });
    }

    try {
        const products = await ProductService.getProducts(brandId);
        return NextResponse.json(products);
    } catch (error) {
        console.error('Inventory API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, description, price, category, image, brandId } = body;

        if (!name || !price || !brandId) {
            return NextResponse.json({ error: 'Name, Price and Brand ID required' }, { status: 400 });
        }

        const product = await prisma.product.create({
            data: {
                id: `${brandId}-${Date.now()}`,
                name,
                description,
                price: parseFloat(price),
                category,
                imageUrl: image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80', // Default image
                brandId
            }
        });

        return NextResponse.json({
            ...product,
            image: product.imageUrl
        });
    } catch (error) {
        console.error('Create Product Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
