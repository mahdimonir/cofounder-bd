import { CustomerService } from '@cofounder/database';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const brandId = searchParams.get('brandId');

    if (!brandId) {
        return NextResponse.json({ error: 'Brand ID required' }, { status: 400 });
    }

    try {
        const customers = await CustomerService.getCustomers(brandId);
        return NextResponse.json(customers);
    } catch (error) {
        console.error('Customers API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
