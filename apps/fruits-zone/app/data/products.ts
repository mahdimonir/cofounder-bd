export type ProductVariant = {
    weight: string;
    price: number;
    oldPrice?: number;
};

export type ProductFamily = {
    id: string;
    name: string;
    description: string;
    image: string;
    category?: string;
    variants: ProductVariant[];
};

export const products: ProductFamily[] = [
    {
        id: "ajwa-dates",
        name: "Ajwa Dates (Premium Grade)",
        description: "মদিনার বিখ্যাত আজওয়া খেজুর। নরম ও মিষ্টি স্বাদের এই খেজুর স্বাস্থ্যের জন্য অত্যন্ত উপকারী।",
        image: "/products/ajwa.png",
        category: "Saudi Arabia",
        variants: [
            { weight: "500g", price: 950, oldPrice: 1100 },
            { weight: "1kg", price: 1800, oldPrice: 2100 },
            { weight: "3kg", price: 5200, oldPrice: 6000 },
        ],
    },
    {
        id: "mashruk-dates",
        name: "Mashruk Dates",
        description: "বিশাল আকৃতির আম্বার খেজুর। মাংসল ও সুস্বাদু এই খেজুর আভিজাত্যের প্রতীক।",
        image: "/products/mashruk.png",
        category: "Saudi Arabia",
        variants: [
            { weight: "500g", price: 1200, oldPrice: 1400 },
            { weight: "1kg", price: 2300, oldPrice: 2700 },
        ],
    },
    {
        id: "sukkeri-dates",
        name: "Sukkeri Dates",
        description: "সু্ক্রি খেজুর অত্যন্ত মিষ্টি ও নরম। যারা খুব মিষ্টি খেজুর পছন্দ করেন তাদের জন্য এটি সেরা।",
        image: "/products/sukkari.png",
        category: "Saudi Arabia",
        variants: [
            { weight: "500g", price: 700, oldPrice: 850 },
            { weight: "1kg", price: 1300, oldPrice: 1600 },
        ],
    },
];
