import { existsSync } from 'fs';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

const ORDERS_DIR = path.join(process.cwd(), 'data');
const ORDERS_FILE = path.join(ORDERS_DIR, 'orders.json');

interface OrderItem {
    name: string;
    variant: string;
    price: number;
    quantity: number;
}

interface OrderData {
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    deliveryArea: string;
    items: OrderItem[];
    subtotal: number;
    deliveryCharge: number;
    total: number;
}

interface StoredOrder extends OrderData {
    id: string;
    createdAt: string;
    status: 'pending' | 'confirmed' | 'delivered';
}

async function ensureDataDir() {
    if (!existsSync(ORDERS_DIR)) {
        await mkdir(ORDERS_DIR, { recursive: true });
    }
}

async function readOrders(): Promise<StoredOrder[]> {
    try {
        await ensureDataDir();
        if (!existsSync(ORDERS_FILE)) {
            return [];
        }
        const data = await readFile(ORDERS_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading orders:', error);
        return [];
    }
}

async function writeOrders(orders: StoredOrder[]): Promise<void> {
    await ensureDataDir();
    await writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
}

export async function POST(request: NextRequest) {
    try {
        const orderData: OrderData = await request.json();

        // Validation
        if (!orderData.customerName || !orderData.customerPhone || !orderData.customerAddress) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        if (!orderData.items || orderData.items.length === 0) {
            return NextResponse.json(
                { error: 'No items in order' },
                { status: 400 }
            );
        }

        // Create order
        const orders = await readOrders();
        const newOrder: StoredOrder = {
            id: `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            ...orderData,
            createdAt: new Date().toISOString(),
            status: 'pending',
        };

        orders.push(newOrder);
        await writeOrders(orders);

        return NextResponse.json({
            success: true,
            orderId: newOrder.id,
            message: 'Order created successfully',
        });
    } catch (error) {
        console.error('Error creating order:', error);
        return NextResponse.json(
            { error: 'Failed to create order' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const orders = await readOrders();
        return NextResponse.json({ orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        return NextResponse.json(
            { error: 'Failed to fetch orders' },
            { status: 500 }
        );
    }
}
