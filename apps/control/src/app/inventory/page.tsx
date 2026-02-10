'use client';

import { useBrand } from '@/providers/BrandProvider';
import { formatPrice } from '@cofounder/utils';
import { AnimatePresence, motion } from 'framer-motion';
import {
    AlertCircle,
    CloudLightning,
    Database,
    Edit3,
    Loader2,
    MoreVertical,
    Package,
    Plus,
    Search,
    Trash2,
    X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function InventoryPage() {
    const { activeBrand } = useBrand();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Form State
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!activeBrand) return;
        
        const fetchInventory = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/inventory?brandId=${activeBrand.id}`);
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error('Fetch Inventory Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
    }, [activeBrand]);

    const handleCreateProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!activeBrand) return;
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/inventory', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newProduct, brandId: activeBrand.id })
            });

            if (!res.ok) throw new Error('Failed to create');

            const createdProduct = await res.json();
            setProducts([createdProduct, ...products]);
            setIsCreateModalOpen(false);
            setNewProduct({ name: '', description: '', price: '', category: '', image: '' });
            toast.success("Product registered successfully");
        } catch (error) {
            toast.error("Failed to register product");
        } finally {
            setIsSubmitting(false);
        }
    };

    const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             product.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="max-w-7xl relative">
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-3">
                        <Database size={12} />
                        Global Inventory Control
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 leading-none tracking-tight">
                        Product <span className="text-slate-400">Library</span>
                    </h1>
                    <p className="text-slate-500 mt-3 font-medium">Synchronized stock management for {activeBrand?.name}.</p>
                </div>
                <button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="px-6 py-3 bg-slate-900 rounded-2xl text-xs font-black text-white hover:scale-[1.02] shadow-xl shadow-slate-900/20 active:scale-[0.98] transition-all flex items-center gap-2"
                >
                    <Plus size={16} />
                    Register New Product
                </button>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                <div className="xl:col-span-3 space-y-6">
                    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200/60 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 overflow-hidden">
                        <div className="relative group w-full md:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={16} />
                            <input 
                                type="text" 
                                placeholder="Search by name or ID..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 pr-6 py-3 bg-slate-50 border border-slate-200/60 rounded-2xl text-xs font-medium w-full focus:ring-2 focus:ring-slate-900/5 transition-all outline-none"
                            />
                        </div>
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                             {categories.map(cat => (
                                <button 
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 ${selectedCategory === cat ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}
                                >
                                    {cat}
                                </button>
                             ))}
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {loading ? (
                            <div className="py-40 flex flex-col items-center justify-center gap-4">
                                <Loader2 className="animate-spin text-blue-600" size={32} />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Querying Inventory Hub...</span>
                            </div>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <div key={product.id} className="group bg-white rounded-[2.5rem] p-6 border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300">
                                            <div className="flex gap-6">
                                                <div className="w-24 h-24 rounded-3xl bg-slate-100 overflow-hidden relative shrink-0">
                                                    <img 
                                                        src={product.image} 
                                                        alt={product.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-white/90 backdrop-blur rounded-lg text-[8px] font-black text-slate-900 uppercase">
                                                        {product.category}
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <h3 className="font-black text-slate-900 text-sm truncate uppercase tracking-tight">{product.name}</h3>
                                                        <button className="p-1 text-slate-300 hover:text-slate-600 transition-colors">
                                                            <MoreVertical size={16} />
                                                        </button>
                                                    </div>
                                                    <p className="text-xs text-slate-400 font-medium mb-4 line-clamp-1">{product.description}</p>
                                                    
                                                    <div className="flex items-end justify-between">
                                                        <div>
                                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Current Value</span>
                                                            <span className="text-lg font-black text-slate-900 leading-none">{formatPrice(product.price)}</span>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button className="p-2.5 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                                                                <Edit3 size={16} />
                                                            </button>
                                                            <button className="p-2.5 bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">In Stock</span>
                                                </div>
                                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                    ID: {product.id.slice(-6).toUpperCase()}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="md:col-span-2 py-20 text-center border-2 border-dashed border-slate-100 rounded-[2rem]">
                                        <p className="text-xs font-black text-slate-300 uppercase tracking-widest">No products found in the catalog</p>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="space-y-8">
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full -mr-16 -mt-16 blur-[40px]"></div>
                        <h3 className="text-lg font-black mb-6 flex items-center gap-2 italic">
                            <CloudLightning size={18} className="text-blue-400" />
                            Stock Sync
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Last Sync</p>
                                    <p className="text-xs font-bold leading-none">Just now</p>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Variants</p>
                                    <p className="text-xs font-bold leading-none">124 Options</p>
                                </div>
                                <Package size={16} className="text-slate-500" />
                            </div>
                        </div>
                        <button className="w-full mt-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all">
                            Force Infrastructure Refresh
                        </button>
                    </div>

                    <div className="p-8 bg-amber-500/10 border border-amber-500/20 rounded-[2.5rem]">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-amber-500 rounded-xl text-white">
                                <AlertCircle size={20} />
                            </div>
                            <h4 className="font-black text-amber-900 text-sm uppercase tracking-tight">Stock Warnings</h4>
                        </div>
                        <p className="text-xs text-amber-800 font-medium leading-relaxed mb-6">
                            The following systems have detected low stock levels for 8 products. Please review replenishment plans.
                        </p>
                        <button className="text-[10px] font-black uppercase text-amber-600 hover:text-amber-700 transition-colors underline underline-offset-4 decoration-amber-200">
                            View Critical Items
                        </button>
                    </div>
                </div>
            </div>

            {/* Create Product Modal */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setIsCreateModalOpen(false)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={e => e.stopPropagation()}
                            className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden"
                        >
                            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                                <h2 className="text-2xl font-black text-slate-900">New Product</h2>
                                <button 
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            
                            <form onSubmit={handleCreateProduct} className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Product Name</label>
                                    <input 
                                        required
                                        type="text" 
                                        value={newProduct.name}
                                        onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-300"
                                        placeholder="e.g. Premium Cotton Shirt"
                                    />
                                </div>
                                
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Price (ETB)</label>
                                        <input 
                                            required
                                            type="number" 
                                            value={newProduct.price}
                                            onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-300"
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                                        <input 
                                            required
                                            type="text" 
                                            value={newProduct.category}
                                            onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-300"
                                            placeholder="e.g. Apparel"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                                    <textarea 
                                        rows={3}
                                        value={newProduct.description}
                                        onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-300 resize-none"
                                        placeholder="Brief product description..."
                                    />
                                </div>

                                <div className="pt-4">
                                    <button 
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Creating...' : 'Create Product'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
