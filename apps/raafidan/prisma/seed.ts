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
            name: 'Oudh Signature',
            description: 'এহসাস আল আরাবিয়া, আমির আল উদ, কুল ওয়াটার ব্লু, হোয়াইট উদ, ডানহিল ডিজায়ার',
            price: 390,
            quantity: 100,
            imageUrl: '/package-1.png',
            category: 'Package',
            size: [],
            color: [],
        },
        {
            id: 'raafidan-package-2',
            brandId: 'raafidan',
            name: 'Modern Fresh',
            description: 'ভ্যাম্পায়ার ব্লাড, সুলতান, ফ্যান্টাসি, জোপি, সিলভার স্টোন',
            price: 390,
            quantity: 100,
            imageUrl: '/package-2.png',
            category: 'Package',
            size: [],
            color: [],
        },
        {
            id: 'raafidan-package-3',
            brandId: 'raafidan',
            name: 'Traditional Oriental',
            description: 'জান্নাতুল ফেরদাউস, রয়েল বাখুর, প্যারিস হিলটন, সিকে ওয়ান, বাকারাত রোজ',
            price: 390,
            quantity: 100,
            imageUrl: '/package-3.png',
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
