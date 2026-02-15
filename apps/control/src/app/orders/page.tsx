'use client';

import { cn } from '@/lib/utils';
import { useBrand } from '@/providers/BrandProvider';
import { formatPrice } from '@cofounder/utils';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Calendar,
    ChevronDown,
    ChevronUp,
    CreditCard,
    Download,
    Loader2,
    MapPin,
    Package,
    Phone,
    Printer,
    Search,
    ShoppingBag,
    User
} from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function OrdersPage() {
    const { activeBrand } = useBrand();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

    const resolveImageUrl = (url: string | null | undefined, brandDomain?: string) => {
        if (!url) return null;
        if (url.startsWith('http')) return url;
        
        // Use the brand's domain if available
        if (brandDomain) {
            // Ensure protocol is present
            const protocol = brandDomain.includes('localhost') || brandDomain.includes('127.0.0.1') ? 'http://' : 'https://';
            const base = brandDomain.startsWith('http') ? brandDomain : `${protocol}${brandDomain}`;
            return `${base}${url.startsWith('/') ? '' : '/'}${url}`;
        }
        
        return url;
    };

    useEffect(() => {
        if (!activeBrand) return;

        const fetchOrders = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/orders?brandId=${activeBrand.id}`);
                const data = await res.json();
                setOrders(data);
            } catch (error) {
                console.error('Fetch Orders Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [activeBrand]);

    const handleStatusUpdate = async (orderId: string, newStatus: string) => {
        const originalOrders = [...orders];
        // Optimistic update
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));

        try {
            const res = await fetch('/api/orders', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderId, status: newStatus })
            });

            if (!res.ok) throw new Error('Failed to update');
            toast.success(`Order status updated to ${newStatus}`);
        } catch (error) {
            // Revert on failure
            setOrders(originalOrders);
            toast.error("Failed to update status");
        }
    };

    const toggleRow = (orderId: string) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'All' || order.status === filterStatus.toUpperCase();
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="max-w-7xl">
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-3">
                        <ShoppingBag size={12} />
                        Transaction Management
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 leading-none tracking-tight">
                        Orders <span className="text-slate-400">Portal</span>
                    </h1>
                    <p className="text-slate-500 mt-3 font-medium">Manage and track all customer transactions for {activeBrand?.name}.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-5 py-2.5 bg-white border border-slate-200/60 rounded-2xl text-xs font-black text-slate-900 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
                        <Calendar size={14} />
                        Date Range
                    </button>
                    <button className="px-5 py-2.5 bg-slate-900 rounded-2xl text-xs font-black text-white hover:scale-[1.02] shadow-xl shadow-slate-900/20 active:scale-[0.98] transition-all flex items-center gap-2">
                        <Download size={14} />
                        Export CSV
                    </button>
                </div>
            </header>

            <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
                <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-900 transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Search by Order ID or Customer..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-12 pr-6 py-3 bg-white border border-slate-200/60 rounded-2xl text-xs font-medium w-full md:w-80 focus:ring-2 focus:ring-slate-900/5 transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                        {['All', 'Pending', 'Shipping', 'Delivered', 'Cancelled'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                    filterStatus === status ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10" : "text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                                )}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <div className="py-40 flex flex-col items-center justify-center gap-4">
                                <Loader2 className="animate-spin text-blue-600" size={32} />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Accessing Ledger...</span>
                            </div>
                        ) : (
                            <motion.table
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full text-left"
                            >
                                <thead>
                                    <tr className="border-b border-slate-100">
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Details</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {filteredOrders.length > 0 ? (
                                        filteredOrders.map((order: any) => (
                                            <Fragment key={order.id}>
                                                <tr 
                                                    onClick={() => toggleRow(order.id)}
                                                    className={cn(
                                                        "group hover:bg-slate-50/50 transition-all cursor-pointer",
                                                        expandedOrderId === order.id && "bg-slate-50/80"
                                                    )}
                                                >
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
                                                                <ShoppingBag size={18} />
                                                            </div>
                                                            <div>
                                                                <span className="text-sm font-black text-slate-900 block truncate max-w-[150px]">#{order.id.slice(-8).toUpperCase()}</span>
                                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <div>
                                                            <span className="text-sm font-bold text-slate-700 block">{order.customerName}</span>
                                                            <span className="text-xs text-slate-400">{order.customerPhone}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <div 
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="flex items-center gap-3"
                                                        >
                                                            <select
                                                                value={order.status}
                                                                onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                                                className={cn(
                                                                    "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border-0 cursor-pointer outline-none transition-all appearance-none text-center min-w-[100px]",
                                                                    order.status === 'DELIVERED' ? "bg-emerald-100 text-emerald-600" : order.status === 'PENDING' ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"
                                                                )}
                                                            >
                                                                {['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map(s => (
                                                                    <option key={s} value={s}>{s}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5 text-right">
                                                        <div className="flex items-center justify-end gap-3">
                                                            <span className="text-sm font-black text-slate-900">{formatPrice(order.total)}</span>
                                                            <div className="text-slate-400 group-hover:text-slate-900 transition-colors">
                                                                {expandedOrderId === order.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {/* Expanded Content */}
                                                <AnimatePresence>
                                                    {expandedOrderId === order.id && (
                                                        <tr>
                                                            <td colSpan={4} className="p-0 border-b border-slate-100 bg-slate-50/30">
                                                                <motion.div
                                                                    initial={{ height: 0, opacity: 0 }}
                                                                    animate={{ height: 'auto', opacity: 1 }}
                                                                    exit={{ height: 0, opacity: 0 }}
                                                                    className="overflow-hidden"
                                                                >
                                                                    <div className="p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
                                                                        {/* Left: Customer & Details */}
                                                                        <div className="lg:col-span-4 space-y-8">
                                                                            <section>
                                                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Customer Profile</label>
                                                                                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
                                                                                    <div className="flex items-center gap-4">
                                                                                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                                                                                            <User size={20} />
                                                                                        </div>
                                                                                        <div>
                                                                                            <span className="text-sm font-black text-slate-900 block">{order.customerName}</span>
                                                                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Customer ID: {order.userId || 'Guest'}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="space-y-3 pt-4 border-t border-slate-100">
                                                                                        <div className="flex items-center gap-3">
                                                                                            <Phone size={14} className="text-slate-400" />
                                                                                            <span className="text-xs font-bold text-slate-700">{order.customerPhone}</span>
                                                                                        </div>
                                                                                        <div className="flex items-start gap-3">
                                                                                            <MapPin size={14} className="text-slate-400 mt-0.5" />
                                                                                            <div className="flex flex-col gap-1">
                                                                                                <span className="text-xs font-black text-slate-900 uppercase tracking-widest text-[10px]">{order.customerArea || 'Main Area'}</span>
                                                                                                <span className="text-xs text-slate-500 leading-relaxed italic">{order.customerAddress || 'Address not provided'}</span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </section>

                                                                            <section>
                                                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Meta Information</label>
                                                                                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
                                                                                    <div className="flex items-center justify-between">
                                                                                        <div className="flex items-center gap-2">
                                                                                            <CreditCard size={14} className="text-slate-400" />
                                                                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payment</span>
                                                                                        </div>
                                                                                        <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">{order.paymentMethod || 'COD'}</span>
                                                                                    </div>
                                                                                    <div className="flex items-center justify-between">
                                                                                        <div className="flex items-center gap-2">
                                                                                            <Search size={14} className="text-slate-400" />
                                                                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Brand</span>
                                                                                        </div>
                                                                                        <span className="text-xs font-black text-slate-900 uppercase tracking-widest">{activeBrand?.name}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </section>

                                                                            <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] transition-all shadow-xl shadow-slate-900/10">
                                                                                <Printer size={14} />
                                                                                Print Invoice
                                                                            </button>
                                                                        </div>

                                                                        {/* Right: Order Items & Financials */}
                                                                        <div className="lg:col-span-8 flex flex-col">
                                                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">Order Composition</label>
                                                                            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex-1">
                                                                                <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto no-scrollbar">
                                                                                    {order.items?.map((item: any) => (
                                                                                        <div key={item.id} className="flex gap-4 group">
                                                                                            <div className="w-16 h-20 rounded-xl bg-slate-100 overflow-hidden border border-slate-100 shrink-0">
                                                                                                {item.imageUrl ? (
                                                                                                    <img 
                                                                                                        src={resolveImageUrl(item.imageUrl, order.brandDomain) || ''} 
                                                                                                        alt={item.name} 
                                                                                                        className="w-full h-full object-cover" 
                                                                                                    />
                                                                                                ) : (
                                                                                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                                                                        <Package size={20} />
                                                                                                    </div>
                                                                                                )}
                                                                                            </div>
                                                                                            <div className="flex-1 py-1 flex flex-col justify-between">
                                                                                                <div className="flex items-start justify-between gap-4">
                                                                                                    <div>
                                                                                                        <h4 className="text-sm font-black text-slate-900 line-clamp-1">{item.name}</h4>
                                                                                                        <div className="flex items-center gap-2 mt-1">
                                                                                                            {item.selectedSize && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded">S: {item.selectedSize}</span>}
                                                                                                            {item.selectedColor && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded">C: {item.selectedColor}</span>}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <span className="text-sm font-black text-slate-900">{formatPrice(item.price)}</span>
                                                                                                </div>
                                                                                                <div className="flex items-center justify-between">
                                                                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Qty: {item.quantity}</span>
                                                                                                    <span className="text-xs font-black text-blue-600">{formatPrice(item.price * item.quantity)}</span>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                                
                                                                                <div className="p-8 bg-slate-50/50 border-t border-slate-100">
                                                                                    <div className="space-y-3 max-w-sm ml-auto">
                                                                                        <div className="flex justify-between items-center">
                                                                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subtotal</span>
                                                                                            <span className="text-sm font-bold text-slate-700">{formatPrice(order.items?.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0) || 0)}</span>
                                                                                        </div>
                                                                                        <div className="flex justify-between items-center">
                                                                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Delivery Charge</span>
                                                                                            <span className="text-sm font-bold text-slate-700">{formatPrice(order.deliveryCharge || 0)}</span>
                                                                                        </div>
                                                                                        <div className="h-px bg-slate-200 my-4" />
                                                                                        <div className="flex justify-between items-center">
                                                                                            <span className="text-xs font-black text-slate-900 uppercase tracking-[0.2em]">Grand Total</span>
                                                                                            <span className="text-xl font-black text-slate-900">{formatPrice(order.total)}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </motion.div>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </AnimatePresence>
                                            </Fragment>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="py-20 text-center">
                                                <p className="text-xs font-black text-slate-300 uppercase tracking-widest">No order history available for this brand</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </motion.table>
                        )}
                    </AnimatePresence>
                </div>

                <div className="p-8 bg-slate-50/30 flex items-center justify-between border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-400 underline underline-offset-4 decoration-slate-200">Total Records: {orders.length}</span>
                    <div className="flex items-center gap-2">
                        <button className="p-2 bg-white border border-slate-200/60 rounded-xl text-slate-400 hover:text-slate-900 transition-all font-black text-[10px] px-4 uppercase tracking-widest">
                            Previous
                        </button>
                        <button className="p-2 bg-slate-900 border border-slate-900 rounded-xl text-white hover:bg-black transition-all font-black text-[10px] px-4 uppercase tracking-widest">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
