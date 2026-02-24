"use client";
import { parseDescription } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  category: string | null;
}

interface ProductHeroSliderProps {
  products: Product[];
}

const ProductHeroSlider = ({ products }: ProductHeroSliderProps) => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredProducts = products
    .filter((product) => product.imageUrl && product.quantity > 0)
    .slice(0, 5);

  useEffect(() => {
    if (featuredProducts.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredProducts.length]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const handleShopNow = (productId: string) => {
    router.push(`/shop/${productId}`);
  };

  const handleExplore = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full px-2 sm:px-4 md:px-6 py-4 md:py-8 overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="min-w-full px-2 sm:px-0"
          >
            <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-gray-50 via-white to-gray-50 p-6 sm:p-10 md:p-16 rounded-3xl shadow-xl border border-gray-100 transition-all duration-300">
              {/* Image Section - Prioritized for Mobile */}
              <div className="w-full flex-1 flex items-center justify-center relative mb-8 md:mb-0 order-1 md:order-2">
                <div className="relative w-full max-w-[280px] sm:max-w-md md:max-w-lg aspect-square">
                  {/* Backdrop Glow */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-blue-600/5 rounded-full blur-3xl animate-pulse"></div>
                  </div>
                  
                  {/* Hero Image */}
                  <div className="relative w-full h-full transition-transform duration-500 hover:scale-105">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={currentSlide === featuredProducts.indexOf(product)}
                    />
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <div className="w-full flex-1 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1 md:pr-8">
                {product.category && (
                  <span className="inline-block px-4 py-1.5 mb-4 bg-gray-900 text-white text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] rounded-full shadow-sm">
                    {product.category}
                  </span>
                )}
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-black text-gray-900 mb-4 leading-tight tracking-tight">
                  {product.name}
                </h1>
                
                <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-md line-clamp-3 mb-8 font-medium leading-relaxed">
                  {parseDescription(product.description).summary}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8">
                  <button
                    onClick={() => handleShopNow(product.id)}
                    className="w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg shadow-blue-500/20 active:scale-95 text-lg"
                  >
                    Shop Now
                  </button>
                  <button
                    onClick={handleExplore}
                    className="w-full sm:w-auto px-8 py-4 text-gray-700 font-bold hover:text-blue-600 transition-colors flex items-center justify-center gap-2 group"
                  >
                    View All
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center gap-3 bg-white/50 backdrop-blur rounded-2xl p-3 border border-gray-100 shadow-sm">
                  <div className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black rounded-lg">BDT</div>
                  <span className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tighter">
                    ৳{product.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modern Slide Indicators */}
      <div className="absolute bottom-10 left-0 right-0 flex items-center justify-center gap-3 z-20">
        {featuredProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              currentSlide === index ? "bg-blue-600 w-12 shadow-sm shadow-blue-500/30" : "bg-gray-200 w-2.5 hover:bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductHeroSlider;
