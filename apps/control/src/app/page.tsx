'use client';

import { cn } from "@/lib/utils";
import { useBrand } from "@/providers/BrandProvider";
import { formatPrice } from '@cofounder/utils';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Activity,
    ArrowUpRight,
    ChevronRight,
    ExternalLink,
    Package,
    ShoppingBag,
    Target,
    TrendingUp,
    Users
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const { activeBrand } = useBrand();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!activeBrand) return;
        
        const fetchStats = async () => {
            setLoading(true);
            setStats(null);
            try {
                const res = await fetch(`/api/stats?brandId=${activeBrand.id}`);
                const data = await res.json();
                setStats(data);
            } catch (error) {
                console.error('Fetch Stats Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [activeBrand]);

    return (
        <div className="max-w-7xl relative pb-20">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <header className="mb-12">
                <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-4">
                    <Activity size={12} className={cn(loading && "animate-pulse")} />
                    Neural Sync: {loading ? 'Fetching...' : 'Active'}
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div>
                        <h1 className="text-5xl font-black text-slate-900 leading-none tracking-tight">
                            {activeBrand?.name} <span className="text-slate-400 font-light underline decoration-blue-500/20 underline-offset-8">Dashboard</span>
                        </h1>
                        <p className="text-slate-500 mt-5 font-medium text-lg max-w-xl">
                            Unified management for your brand ecosystems. Real-time insights, delivered with precision.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="h-14 px-8 bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl text-xs font-black text-slate-900 hover:bg-white/60 transition-all flex items-center gap-2 shadow-sm">
                            <ExternalLink size={16} />
                            Launch Site
                        </button>
                        <button className="h-14 px-8 bg-slate-900 border-b-4 border-slate-950 rounded-3xl text-xs font-black text-white hover:translate-y-0.5 active:translate-y-1 active:border-b-0 transition-all shadow-xl shadow-slate-900/20">
                            Command Center
                        </button>
                    </div>
                </div>
            </header>

            <AnimatePresence mode="wait">
                {loading && !stats ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-6">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Activity size={24} className="text-blue-500 animate-pulse" />
                            </div>
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] animate-pulse">Synchronizing Data Modules...</span>
                    </div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        key={activeBrand?.id}
                    >
                        {/* Glassmorphic Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            <GlassStatCard 
                                label="Aggregated Revenue" 
                                value={formatPrice(stats?.revenue || 0)} 
                                trend="+12.5%" 
                                icon={TrendingUp} 
                                variant="blue"
                            />
                            <GlassStatCard 
                                label="Active Fulfillment" 
                                value={stats?.activeOrders || 0} 
                                trend="+5" 
                                icon={ShoppingBag} 
                                variant="emerald"
                            />
                            <GlassStatCard 
                                label="Ecosystem Orders" 
                                value={stats?.totalOrders || 0} 
                                trend="+18%" 
                                icon={Users} 
                                variant="purple"
                            />
                            <GlassStatCard 
                                label="Catalog Depth" 
                                value={stats?.totalProducts || 0} 
                                trend="+8%" 
                                icon={Package} 
                                variant="amber"
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Activity Portal */}
                            <div className="lg:col-span-2 bg-white/60 backdrop-blur-2xl rounded-[3rem] p-10 border border-white/80 shadow-[0_32px_64px_rgba(0,0,0,0.03)] overflow-hidden">
                                <div className="flex items-center justify-between mb-12">
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">Streamed Activity</h3>
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-2">Live transaction pipeline</p>
                                    </div>
                                    <button className="h-10 px-5 bg-slate-900/5 hover:bg-slate-900/10 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                                        Open Ledger
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {stats?.recentOrders?.length > 0 ? (
                                        stats.recentOrders.map((order: any, i: number) => (
                                            <motion.div 
                                                key={order.id}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                className="group flex items-center justify-between p-5 rounded-[2.5rem] bg-white/40 hover:bg-white border border-transparent hover:border-slate-100 transition-all cursor-pointer shadow-sm hover:shadow-xl hover:shadow-slate-200/40"
                                            >
                                                <div className="flex items-center gap-6">
                                                    <div className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center text-lg font-black group-hover:scale-110 transition-transform">
                                                        {order.customer[0]}
                                                    </div>
                                                    <div>
                                                        <p className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">
                                                            {order.customer} 
                                                            <span className="text-slate-300 ml-2 font-medium">#{order.id.slice(-6).toUpperCase()}</span>
                                                        </p>
                                                        <div className="flex items-center gap-3 mt-1.5">
                                                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Store Order</span>
                                                            <div className="w-1.5 h-1.5 bg-slate-200 rounded-full" />
                                                            <span className="text-[10px] text-slate-400 font-bold">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right flex items-center gap-8">
                                                    <div>
                                                        <p className="text-lg font-black text-slate-900">{formatPrice(order.total)}</p>
                                                        <div className={cn(
                                                            "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.2em] mt-2 inline-block shadow-sm",
                                                            order.status === 'PENDING' ? "bg-amber-400 text-white" : "bg-blue-500 text-white"
                                                        )}>
                                                            {order.status}
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="text-slate-200 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" size={24} />
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div className="py-24 text-center border-4 border-dashed border-slate-50 rounded-[3rem]">
                                            <div className="inline-flex p-6 bg-slate-50 text-slate-200 rounded-full mb-6">
                                                <Activity size={40} />
                                            </div>
                                            <p className="text-xs font-black text-slate-300 uppercase tracking-[0.4em]">Zero Active Streams</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Optimization & Metrics Sidebar */}
                            <div className="space-y-8">
                                <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-slate-900/40 min-h-[440px] flex flex-col group">
                                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full -mr-48 -mt-48 blur-[100px] border border-white/5" />
                                    
                                    <div className="relative z-10 flex-1">
                                        <div className="flex items-center gap-3 mb-8">
                                            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-xl border border-white/10">
                                                <Target size={20} className="text-blue-400" />
                                            </div>
                                            <h3 className="text-xl font-black tracking-tight uppercase tracking-[0.1em]">Performance Index</h3>
                                        </div>

                                        <div className="space-y-10">
                                            <MetricProgress label="Monthly Revenue" current={78} trend="+12%" color="bg-blue-500" />
                                            <MetricProgress label="Order Accuracy" current={94} trend="Stable" color="bg-emerald-500" />
                                            <MetricProgress label="Customer Retention" current={62} trend="+4%" color="bg-purple-500" />
                                        </div>
                                    </div>

                                    <button className="relative z-10 w-full h-16 bg-white/10 hover:bg-white/20 border border-white/10 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all mt-10 backdrop-blur-xl">
                                        Optimize Ecosystem
                                    </button>
                                </div>

                                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-[3rem] p-10 text-white relative overflow-hidden group shadow-xl">
                                    <div className="absolute -bottom-10 -right-20 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                                        <TrendingUp size={280} />
                                    </div>
                                    <div className="relative z-10">
                                        <h4 className="text-2xl font-black mb-2">Expansion Pack</h4>
                                        <p className="text-blue-100/60 text-sm font-medium mb-8">Deploying new nodes to your brand edge network.</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex -space-x-4">
                                                {[1,2,3,4].map(i => (
                                                    <div key={i} className="w-10 h-10 rounded-full border-4 border-blue-600 bg-slate-900 flex items-center justify-center font-black text-[10px] shadow-lg">
                                                        {i*2}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="h-10 px-5 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-[10px] font-black uppercase tracking-[0.2em] border border-white/10">
                                                System v2.4
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function GlassStatCard({ label, value, trend, icon: Icon, variant }: any) {
    const colors: any = {
        blue: "text-blue-500 border-blue-500/10 bg-blue-500/5",
        emerald: "text-emerald-500 border-emerald-500/10 bg-emerald-500/5",
        purple: "text-purple-500 border-purple-500/10 bg-purple-500/5",
        amber: "text-amber-500 border-amber-500/10 bg-amber-500/5"
    };

    return (
        <div className="relative group perspective-1000">
            <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white shadow-[0_8px_32px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2">
                <div className="flex items-start justify-between mb-8">
                    <div className={cn("p-4 rounded-3xl transition-transform duration-500 group-hover:scale-110 shadow-sm", colors[variant])}>
                        <Icon size={28} />
                    </div>
                    <div className="flex items-center gap-1 font-black px-4 py-1.5 bg-slate-50 rounded-full text-[10px] text-emerald-600 shadow-inner">
                        <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        {trend}
                    </div>
                </div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-3">{label}</p>
                <p className="text-4xl font-black text-slate-900 tracking-tighter leading-none">{value}</p>
            </div>
        </div>
    );
}

function MetricProgress({ label, current, trend, color }: any) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end">
                <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block">{label}</span>
                    <span className="text-2xl font-black tracking-tight">{current}% <span className="text-slate-500 font-light font-body text-sm">Efficiency</span></span>
                </div>
                <div className="px-3 py-1 bg-white/5 rounded-xl text-[10px] font-black text-blue-400 border border-white/5">
                    {trend}
                </div>
            </div>
            <div className="h-3 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10 shadow-inner">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${current}%` }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className={cn("h-full rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] relative overflow-hidden", color)}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-30deg] animate-[shimmer_2s_infinite]" />
                </motion.div>
            </div>
        </div>
    );
}
