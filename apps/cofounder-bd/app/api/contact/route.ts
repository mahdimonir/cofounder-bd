import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, brand, needs } = body;

        // Simulate validation
        if (!name || !email || !brand) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // In a real scenario, we would save to DB (e.g., Prisma) or send an email
        console.log("Lead Received:", { name, email, brand, needs, timestamp: new Date() });

        // Simulate work
        await new Promise((resolve) => setTimeout(resolve, 800));

        return NextResponse.json({
            success: true,
            message: "Lead synchronized successfully",
            syncId: Math.random().toString(36).substring(7).toUpperCase(),
        });
    } catch (error) {
        console.error("Contact API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
