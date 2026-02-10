'use client';

import { cn } from '@/lib/utils';
import { useBrand } from '@/providers/BrandProvider';
import { formatPrice } from '@cofounder/utils';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Calendar,
    Download,
    Eye,
    Loader2,
    MoreHorizontal,
    Search,
    ShoppingBag
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function OrdersPage() {
    const { activeBrand } = useBrand();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

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
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {filteredOrders.length > 0 ? (
                                        filteredOrders.map((order: any) => (
                                            <tr key={order.id} className="group hover:bg-slate-50/50 transition-all">
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
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
                                                </td>
                                                <td className="px-8 py-5 text-sm font-black text-slate-900">
                                                    {formatPrice(order.total)}
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                                                            <Eye size={18} />
                                                        </button>
                                                        <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
                                                            <MoreHorizontal size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="py-20 text-center">
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
