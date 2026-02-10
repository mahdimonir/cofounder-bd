import { prisma } from '@cofounder/database';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const brands = await prisma.brand.findMany({
            orderBy: { name: 'asc' }
        });
        return NextResponse.json(brands);
    } catch (error) {
        console.error('Fetch Brands Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id, name, slug, domain } = body;

        if (!id || !name || !slug) {
            return NextResponse.json({ error: 'ID, Name and Slug are required' }, { status: 400 });
        }

        const brand = await prisma.brand.create({
            data: { id, name, slug, domain }
        });

        return NextResponse.json(brand);
    } catch (error: any) {
        console.error('Create Brand Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
