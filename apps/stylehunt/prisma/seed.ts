import { PrismaClient } from '@prisma/client';
import { COMBOS } from '../app/constants';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding StyleHunt brand and products...');

    // Create StyleHunt brand if it doesn't exist
    await prisma.brand.upsert({
        where: { id: 'stylehunt' },
        update: {},
        create: {
            id: 'stylehunt',
            name: 'StyleHunt',
            slug: 'stylehunt',
        },
    });

    // Seed products from COMBOS
    for (const combo of COMBOS) {
        const product = {
            id: combo.id,
            brandId: 'stylehunt',
            name: combo.name,
            description: combo.description,
            price: combo.price,
            quantity: 100, // Default quantity
            imageUrl: combo.image,
            category: combo.isPack ? 'Package' : 'Individual',
            size: ['Free Size'],
            color: combo.color ? [combo.color] : [],
            isPack: combo.isPack,
            hasVariants: false,
        };

        await prisma.product.upsert({
            where: { id: product.id },
            update: product,
            create: product,
        });
        console.log(`✓ Seeded product: ${product.name}`);
    }

    console.log('Seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
