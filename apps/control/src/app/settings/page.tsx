'use client';

import { useBrand } from "@/providers/BrandProvider";
import {
    Bell,
    Globe,
    Loader2,
    Mail,
    Plus,
    Save,
    Shield,
    Smartphone,
    Store
} from 'lucide-react';
import { useState } from 'react';
import { toast } from "sonner";

export default function SettingsPage() {
    const { activeBrand, brands, refreshBrands } = useBrand();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('General');
    
    // Brand Form State
    const [newBrand, setNewBrand] = useState({
        id: '',
        name: '',
        slug: '',
        domain: ''
    });
    const [isCreatingBrand, setIsCreatingBrand] = useState(false);

    const handleSave = () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            toast.success("Settings saved successfully");
        }, 1000);
    };

    const handleCreateBrand = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsCreatingBrand(true);
        try {
            const res = await fetch('/api/brands', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBrand)
            });
            if (res.ok) {
                toast.success("Brand registered successfully. Ecosystem synchronized.");
                setNewBrand({ id: '', name: '', slug: '', domain: '' });
                await refreshBrands();
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to register brand");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsCreatingBrand(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <header className="mb-10">
                <h1 className="text-3xl font-black text-slate-900 leading-tight">
                    Settings & Configuration
                </h1>
                <p className="text-slate-500 mt-2 font-medium">Manage preferences for your ecosystem.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sidebar Navigation */}
                <div className="space-y-2">
                    {['General', 'Brands', 'Notifications', 'Security', 'Team'].map((tab) => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`w-full text-left px-5 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Main Settings Area */}
                <div className="lg:col-span-2 space-y-8">
                    {activeTab === 'General' && (
                        <section className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                    <Store size={24} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-black text-slate-900">Brand Profile</h2>
                                    <p className="text-xs text-slate-500 font-medium">Public facing information for {activeBrand?.name}.</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Brand Name</label>
                                        <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl">
                                            <Store size={16} className="text-slate-400" />
                                            <input 
                                                type="text" 
                                                defaultValue={activeBrand?.name} 
                                                className="bg-transparent border-0 outline-none text-sm font-bold text-slate-900 w-full"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Support Email</label>
                                        <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl">
                                            <Mail size={16} className="text-slate-400" />
                                            <input 
                                                type="email" 
                                                defaultValue={`support@${activeBrand?.slug}.com`} 
                                                className="bg-transparent border-0 outline-none text-sm font-bold text-slate-900 w-full"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Storefront URL</label>
                                    <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-400">
                                        <Globe size={16} />
                                        <span className="text-sm font-medium">https://</span>
                                        <input 
                                            type="text" 
                                            defaultValue={`${activeBrand?.slug}.com`} 
                                            className="bg-transparent border-0 outline-none text-sm font-bold text-slate-900 w-full"
                                        />
                                    </div>
                                </div>
                                
                                <div className="flex justify-end pt-4">
                                    <button 
                                        onClick={handleSave}
                                        disabled={loading}
                                        className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-slate-900/20 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Saving...' : (
                                            <>
                                                <Save size={18} />
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </section>
                    )}

                    {activeTab === 'Brands' && (
                        <div className="space-y-8">
                            <section className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl">
                                        <Plus size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-black text-slate-900">Register New Brand</h2>
                                        <p className="text-xs text-slate-500 font-medium">Expand your ecosystem by adding a new brand storefront.</p>
                                    </div>
                                </div>

                                <form onSubmit={handleCreateBrand} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unique ID</label>
                                            <input 
                                                required
                                                type="text" 
                                                placeholder="e.g. brand-name"
                                                value={newBrand.id}
                                                onChange={e => setNewBrand({...newBrand, id: e.target.value})}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-purple-500/20"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Display Name</label>
                                            <input 
                                                required
                                                type="text" 
                                                placeholder="e.g. Brand Name"
                                                value={newBrand.name}
                                                onChange={e => setNewBrand({...newBrand, name: e.target.value})}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-purple-500/20"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">URL Slug</label>
                                            <input 
                                                required
                                                type="text" 
                                                placeholder="e.g. brandname"
                                                value={newBrand.slug}
                                                onChange={e => setNewBrand({...newBrand, slug: e.target.value})}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-purple-500/20"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Domain (Optional)</label>
                                            <input 
                                                type="text" 
                                                placeholder="brand.com"
                                                value={newBrand.domain}
                                                onChange={e => setNewBrand({...newBrand, domain: e.target.value})}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-purple-500/20"
                                            />
                                        </div>
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={isCreatingBrand}
                                        className="w-full py-4 bg-purple-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-purple-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                                    >
                                        {isCreatingBrand ? <Loader2 size={18} className="animate-spin" /> : "Access Brand Provisioning"}
                                    </button>
                                </form>
                            </section>

                            <section className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Active Brand Ecosystem</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {brands.map(brand => (
                                        <div key={brand.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-[10px] font-black uppercase">
                                                    {brand.name[0]}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-slate-900">{brand.name}</p>
                                                    <p className="text-[9px] text-slate-400 font-medium">{brand.slug}.com</p>
                                                </div>
                                            </div>
                                            <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-full">Active</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    )}

                    {activeTab === 'Notifications' && (
                        <section className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                                    <Bell size={24} />
                                </div>
                                <div>
                                    <h2 className="text-lg font-black text-slate-900">Notifications</h2>
                                    <p className="text-xs text-slate-500 font-medium">Manage how you receive alerts.</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { label: "New Order Alerts", desc: "Get notified when a customer places an order.", icon: Smartphone },
                                    { label: "Low Stock Warnings", desc: "Receive alerts when inventory drops below threshold.", icon: Shield },
                                    { label: "Weekly Reports", desc: "Digest of your store's performance.", icon: Mail }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <item.icon size={18} className="text-slate-400" />
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">{item.label}</p>
                                                <p className="text-[10px] text-slate-500">{item.desc}</p>
                                            </div>
                                        </div>
                                        <div className="relative inline-block w-10 h-6 transition duration-200 ease-in-out bg-slate-200 rounded-full cursor-pointer">
                                            <span className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 shadow-sm ${i !== 2 ? 'translate-x-4 bg-indigo-600' : ''}`}></span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {['Security', 'Team'].includes(activeTab) && (
                        <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[2rem]">
                            <p className="text-xs font-black text-slate-300 uppercase tracking-widest">Modular section coming soon</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
