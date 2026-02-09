import prisma from "@/lib/prisma";
import { Footer, Navbar } from "@cofounder/ui";
import HomeClient from "./HomeClient";
import Logo from "./components/Logo";
import { BRAND } from './constants';

export const revalidate = 60; // ISR 60 seconds

export default async function Home() {
  const products = await prisma.product.findMany({
    where: { brandId: "stylehunt" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-brand-muted text-brand-text selection:bg-brand-primary selection:text-white pb-20 md:pb-0">
      <Navbar 
        ctaText="Order Now"
        logoComponent={<Logo variant="full" />}
      />

      <HomeClient initialProducts={products} />

       <Footer 
        supportPhone={BRAND.supportPhone} 
        logoComponent={<Logo variant="full" />}
        variant="simple"
      />
    </div>
  );
}
