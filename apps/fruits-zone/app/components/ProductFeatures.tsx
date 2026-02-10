import { Check, ShieldCheck, Truck, Zap } from "lucide-react";

export const ProductFeatures = () => {
  const features = [
    { title: "খাঁটি ও প্রাকৃতিক", desc: "কোন প্রকার কেমিক্যাল বা প্রিজারভেটিভ ছাড়াই শতভাগ প্রাকৃতিক ও পুষ্টিকর খেজুর।", icon: ShieldCheck },
    { title: "ইফতার ডেলিভারি", desc: "রমজানে আপনার ইফতারের সতেজতা দোরগোড়ায় পৌঁছে দিতে আমরা বদ্ধপরিকর।", icon: Truck },
    { title: "সৌদি আরব থেকে সরাসরি", desc: "মদিনার সবচেয়ে সেরা বাগান থেকে বাছাইকৃত প্রিমিয়াম কোয়ালিটি পণ্য।", icon: Check },
    { title: "স্বাস্থ্যের জন্য সেরা", desc: "প্রাকৃতিক এনার্জি বুস্টার যা দীর্ঘ রোজা শেষে দ্রুত শক্তি ফিরিয়ে আনে।", icon: Zap },
  ];

  return (
    <section className="py-12 bg-white border-b border-brand-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-brand-accent font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">Our Excellence</span>
          <h2 className="text-3xl md:text-5xl font-black text-brand-text leading-tight">কেন ফ্রুটস জোন এর খেজুর খাবেন?</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group p-4 sm:p-6 md:p-8 rounded-[2.5rem] bg-brand-muted/30 border border-brand-muted hover:border-brand-primary/20 hover:bg-white hover:shadow-2xl hover:shadow-brand-primary/5 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-brand-text mb-3">{feature.title}</h3>
              <p className="text-brand-text/50 text-sm leading-relaxed font-medium">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductFeatures;
