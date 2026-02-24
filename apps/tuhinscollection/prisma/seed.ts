import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import { Pool } from 'pg';

/**
 * Tuhin's Collection Dynamic Seed Script
 * Scans public/products directory and creates category-based grouped products
 */

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const BRAND_ID = 'tuhinscollection';
const BRAND_NAME = "Tuhin's Collection";
const PRODUCTS_ROOT = path.join(__dirname, '../public/products');

const CATEGORY_PRICES: Record<string, number> = {
  'Antic': 280,
  'Stone': 250,
  'Cherry': 300,
  'Georgette': 250,
  'Rings': 250
};

async function scanDirectory(dir: string, baseDir: string = PRODUCTS_ROOT): Promise<any[]> {
  const result: any[] = [];
  if (!fs.existsSync(dir)) return result;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const subDirProducts = await scanDirectory(fullPath, baseDir);
      result.push(...subDirProducts);
    } else if (entry.isFile() && (entry.name.toLowerCase().endsWith('.png') || entry.name.toLowerCase().endsWith('.jpg'))) {
      const relativePath = path.relative(path.join(__dirname, '../public'), fullPath).replace(/\\/g, '/');
      const fileName = entry.name.replace(/\.[^/.]+$/, "");
      const folderName = path.basename(path.dirname(fullPath));

      result.push({
        name: fileName,
        category: folderName,
        path: `/${relativePath}`,
      });
    }
  }
  return result;
}

async function main() {
  console.log(`Starting dynamic re-seed for ${BRAND_NAME}...`);

  // 1. Upsert Brand
  await prisma.brand.upsert({
    where: { id: BRAND_ID },
    update: { name: BRAND_NAME, slug: BRAND_ID },
    create: { id: BRAND_ID, name: BRAND_NAME, slug: BRAND_ID },
  });

  // 2. Clear existing products
  const existingProducts = await prisma.product.findMany({
    where: { brandId: BRAND_ID },
    select: { id: true }
  });
  const productIds = existingProducts.map(p => p.id);

  if (productIds.length > 0) {
    await prisma.productImage.deleteMany({
      where: { productId: { in: productIds } }
    });
    await prisma.product.deleteMany({
      where: { brandId: BRAND_ID }
    });
  }
  console.log(`Cleared ${productIds.length} existing products for ${BRAND_ID}.`);

  // 3. Scan and Group
  const files = await scanDirectory(PRODUCTS_ROOT);
  console.log(`Found ${files.length} images across all categories.`);

  const groupedByCategory: Record<string, any[]> = {};
  files.forEach(f => {
    if (!groupedByCategory[f.category]) groupedByCategory[f.category] = [];
    groupedByCategory[f.category].push(f);
  });

  // 4. Create Grouped Products
  for (const [categoryName, items] of Object.entries(groupedByCategory)) {
    if (categoryName === 'Georgette') {
      // Special logic for Georgette: One product for the entire collection
      const productId = `tuhin-cat-georgette-hijab`;
      const allVariants: any[] = [];
      const allColors: string[] = [];

      items.forEach((item: any) => {
        const colorNames = item.name.replace(/_/g, ', ').split(/[,&]+/).map((c: string) => c.trim()).filter(Boolean);
        colorNames.forEach((colorName: string) => {
          allVariants.push({
            color: colorName,
            imageUrl: item.path,
            combo: item.name.replace(/_/g, ' '),
            quantity: 20
          });
          allColors.push(colorName);
        });
      });

      const sizes = ['30" x 90"'];
      const price = CATEGORY_PRICES[categoryName] || 250;

      await prisma.product.create({
        data: {
          id: productId,
          brandId: BRAND_ID,
          name: `Georgette Hijab Collection`,
          description: `[Specifications]\nCategory: ${categoryName}\nSize: ${sizes.join(', ')}\nBrand: ${BRAND_NAME}\n\n[Description]\nDiscover our premium Georgette Hijab Collection. Each image contains three distinct colors. Select your preferred set and then pick your specific color variant. High-quality georgette fabric, perfect for any occasion.`,
          price: price,
          quantity: allVariants.length * 20,
          imageUrl: items[0].path,
          category: categoryName,
          size: sizes,
          color: Array.from(new Set(allColors)),
          hasVariants: true,
          variants: allVariants as any,
          images: {
            create: items.map((item, i) => ({
              id: `${productId}-set-${i}`,
              url: item.path,
              color: item.name.replace(/_/g, ' ') // We use the combo name as the "color" for metadata
            }))
          }
        },
      });
      console.log(`✓ Created Unified Georgette Collection (${allVariants.length} variants)`);
    } else {
      const productId = `tuhin-cat-${categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

      // Flatten variants: split multi-color filenames into separate variants
      const variantsData: any[] = [];
      items.forEach((item: any) => {
        const colorNames = item.name.split(/[,&]+/).map((c: string) => c.trim()).filter(Boolean);
        colorNames.forEach((colorName: string) => {
          variantsData.push({
            color: colorName,
            imageUrl: item.path,
            quantity: 20
          });
        });
      });

      const totalQuantity = variantsData.reduce((sum, v) => sum + v.quantity, 0);
      const firstImage = variantsData[0].imageUrl;
      const colors = Array.from(new Set(variantsData.map(v => v.color)));
      const price = CATEGORY_PRICES[categoryName] || 250;

      // Size logic
      let sizes = ['Standard'];
      if (categoryName === 'Cherry') {
        sizes = ['30" x 90"'];
      }

      await prisma.product.create({
        data: {
          id: productId,
          brandId: BRAND_ID,
          name: `${categoryName} Collection`,
          description: `[Specifications]\nCategory: ${categoryName}\nSize: ${sizes.join(', ')}\nBrand: ${BRAND_NAME}\n\n[Description]\nDiscover our elegant ${categoryName} Collection. Each piece is selected for its unique design and quality. Perfect for gifting or personal style.`,
          price: price,
          quantity: totalQuantity,
          imageUrl: firstImage,
          category: categoryName,
          size: sizes,
          color: colors,
          hasVariants: true,
          variants: variantsData as any,
          images: {
            create: variantsData.map((v, i) => ({
              id: `${productId}-img-${i}`,
              url: v.imageUrl,
              color: v.color
            }))
          }
        },
      });
      console.log(`✓ Created Collection: ${categoryName} (${variantsData.length} variants total from ${items.length} files)`);
    }
  }

  console.log('Dynamic seed completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error during seed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });