import Logo from "@/components/sections/Logo";
import prisma from "@/lib/prisma";
import { Footer } from "@cofounder/ui";
import HomeClient from "./HomeClient";

export const revalidate = 60; // ISR 60 seconds

export default async function Home() {
  const products = await prisma.product.findMany({
    where: { brandId: "raafidan" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-brand-offwhite selection:bg-brand-gold selection:text-brand-black">
      <HomeClient initialProducts={products} />
      
      <Footer 
        variant="simple" 
        className="bg-brand-darkgray text-white border-white/5" 
        brandName="RAAFIDAN"
        supportPhone="+880 1805-530282"
        logoComponent={<Logo />}
      />
    </div>
  );
}
