"use client";
import { calculateDiscountedPrice } from "@/lib/constants";
import { parseDescription } from "@/lib/utils";
import { Moon, Sparkles } from "lucide-react";
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
        {featuredProducts.map((product) => {
          const discountedPrice = calculateDiscountedPrice(product.price);
          return (
            <div
              key={product.id}
              className="min-w-full px-2 sm:px-0"
            >
              <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 sm:p-10 md:p-16 rounded-[40px] shadow-2xl border border-white/50 relative overflow-hidden">
                {/* Festive Background Accents */}
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <Moon className="w-32 h-32 text-blue-600 fill-blue-600 rotate-12" />
                </div>
                
                {/* Image Section - First on Mobile */}
                <div className="w-full flex-1 flex items-center justify-center relative mb-10 md:mb-0 order-1 md:order-2">
                  <div className="relative w-full max-w-[280px] sm:max-w-md md:max-w-lg aspect-square">
                    <div className="absolute inset-0 bg-blue-400/10 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="relative w-full h-full transition-all duration-700 group-hover:scale-110">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.2)]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={currentSlide === featuredProducts.indexOf(product)}
                      />
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="w-full flex-1 flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-1 md:pr-12 relative z-10">
                  <div className="flex items-center gap-2 mb-4 bg-white/80 backdrop-blur px-4 py-1.5 rounded-full border border-blue-100 shadow-sm">
                    <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500 animate-bounce" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Ramadan Collection</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-gray-950 mb-6 leading-[1.1] tracking-tighter">
                    {product.name}
                  </h1>

                  <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-md line-clamp-3 mb-8 font-medium leading-relaxed bg-white/20 backdrop-blur-sm rounded-xl p-1">
                    {parseDescription(product.description).summary}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-8">
                    <button
                      onClick={() => handleShopNow(product.id)}
                      className="w-full sm:w-auto px-12 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-black rounded-3xl hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] transition-all duration-500 hover:scale-105 active:scale-95 text-lg"
                    >
                      Buy Now — 20% OFF
                    </button>
                    <button
                      onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
                      className="w-full sm:w-auto px-8 py-5 text-gray-900 font-bold hover:text-blue-600 transition-colors flex items-center justify-center gap-2 group"
                    >
                      View Deals
                      <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-45" />
                    </button>
                  </div>

                  <div className="flex flex-col items-center md:items-start">
                    <span className="text-sm font-bold text-gray-400 line-through mb-1">
                      ৳{product.price.toLocaleString()}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-emerald-700 tracking-tight">
                        ৳{discountedPrice.toLocaleString()}
                      </span>
                      <div className="bg-amber-400 text-emerald-950 text-[10px] font-black px-2 py-1 rounded-lg shadow-sm">
                        SAVE 20%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-0 right-0 flex items-center justify-center gap-3 z-20">
        {featuredProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-3 rounded-full transition-all duration-500 ${
              currentSlide === index ? "bg-blue-600 w-16 shadow-lg shadow-blue-500/20" : "bg-gray-200 w-3 hover:bg-blue-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductHeroSlider;
