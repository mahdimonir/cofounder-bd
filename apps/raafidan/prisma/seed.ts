import prisma from '../lib/prisma';

async function main() {
    console.log("Seeding Raafidan brand and products...");

    // Create Raafidan brand if doesn't exist
    await prisma.brand.upsert({
        where: { id: 'raafidan' },
        update: {},
        create: {
            id: 'raafidan',
            name: 'Raafidan',
            slug: 'raafidan',
        },
    });

    // Seed products for Package 1, 2, 3
    const products = [
        {
            id: 'raafidan-package-1',
            brandId: 'raafidan',
            name: 'প্যাকেজ ১ (Best Seller)',
            description: 'এহসাস আল আরাবিয়া, আমির আল উদ, কুল ওয়াটার ব্লু, হোয়াইট উদ, ডানহিল ডিজায়ার',
            price: 390,
            quantity: 100,
            imageUrl: '/package-1.png', // TODO: Replace with Cloudinary URL
            category: 'Package',
            size: [],
            color: [],
        },
        {
            id: 'raafidan-package-2',
            brandId: 'raafidan',
            name: 'প্যাকেজ ২',
            description: 'গ্রিন আইরিশ,  আব্বাস, আল রহমত, নাগা, আর্মানি কোড',
            price: 390,
            quantity: 100,
            imageUrl: '/package-2.png', // TODO: Replace with Cloudinary URL
            category: 'Package',
            size: [],
            color: [],
        },
        {
            id: 'raafidan-package-3',
            brandId: 'raafidan',
            name: 'প্যাকেজ ৩',
            description: 'রাশা, আফনান টার্বী, ব্লু সিডাক্শন, লাল কাবাহ, ফোর হিম আজারো',
            price: 390,
            quantity: 100,
            imageUrl: '/package-3.png', // TODO: Replace with Cloudinary URL
            category: 'Package',
            size: [],
            color: [],
        },
    ];

    for (const product of products) {
        await prisma.product.upsert({
            where: { id: product.id },
            update: product,
            create: product,
        });
        console.log(`✓ Seeded product: ${product.name}`);
    }

    console.log("Seeding completed successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
