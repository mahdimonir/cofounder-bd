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
              {/* Image Section - First on Mobile via flex-col */}
              <div className="w-full flex-1 flex items-center justify-center relative mb-8 md:mb-0 order-1 md:order-2">
                <div className="relative w-full max-w-[280px] sm:max-w-md md:max-w-lg aspect-square">
                  {/* Decorative Backglow */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-brand-600/5 rounded-full blur-3xl animate-pulse"></div>
                  </div>
                  
                  {/* Actual Image Container */}
                  <div className="relative w-full h-full transition-transform duration-500 hover:rotate-2 hover:scale-105">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={currentSlide === featuredProducts.indexOf(product)}
                    />
                  </div>
                </div>
              </div>

              {/* Text Content - Second on Mobile */}
              <div className="w-full flex-1 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1 md:pr-8">
                {product.category && (
                  <span className="inline-block px-3 py-1 mb-4 bg-brand-600/10 text-brand-600 text-xs font-bold uppercase tracking-widest rounded-full">
                    {product.category}
                  </span>
                )}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-black text-gray-900 mb-4 leading-tight">
                  {product.name}
                </h1>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-md line-clamp-3 mb-8 font-medium leading-relaxed">
                  {parseDescription(product.description).summary}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                  <button
                    onClick={() => handleShopNow(product.id)}
                    className="w-full sm:w-auto px-10 py-4 bg-brand-600 text-white font-bold rounded-2xl hover:bg-gray-900 transition-all duration-300 shadow-lg shadow-brand-600/20 active:scale-95"
                  >
                    Shop Now
                  </button>
                  <button
                    onClick={handleExplore}
                    className="w-full sm:w-auto px-8 py-4 text-gray-700 font-bold hover:text-brand-600 transition-colors flex items-center justify-center gap-2"
                  >
                    View All
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>

                <div className="mt-8 flex items-baseline gap-2">
                  <span className="text-gray-400 text-sm font-medium">Starting at</span>
                  <span className="text-3xl sm:text-4xl font-black text-brand-600 truncate">
                    ৳{product.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-0 right-0 flex items-center justify-center gap-3 z-20">
        {featuredProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              currentSlide === index ? "bg-brand-600 w-12 shadow-sm shadow-brand-600/50" : "bg-gray-200 w-2.5 hover:bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductHeroSlider;
