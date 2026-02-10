import prisma from "@/lib/prisma";
import { Footer, Navbar } from "@cofounder/ui";
import HomeClient from "./HomeClient";
import Logo from "./components/Logo";

export const revalidate = 60; // ISR 60 seconds

export default async function Home() {
  const products = await prisma.product.findMany({
    where: { brandId: "fruits-zone" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-brand-muted/20 selection:bg-brand-primary selection:text-white pb-20 md:pb-0">
      <Navbar 
        ctaText="অর্ডার করুন"
        logoComponent={<Logo variant="full" />}
        className="glass-nav border-b border-white/5"
      />

      <HomeClient initialProducts={products} />

      <Footer
        variant="simple"
        supportPhone="+৮৮০ ১৮০৫-৫৩০২৮২" 
        logoComponent={<Logo variant="full" />}
        className="bg-brand-muted"
      />
    </div>
  );
}
