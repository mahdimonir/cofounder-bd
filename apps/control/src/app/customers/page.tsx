'use client';

import { useBrand } from "@/providers/BrandProvider";
import { PlatformUser } from "@cofounder/types";
import { Calendar, Mail, MoreHorizontal, Phone, Search, ShieldCheck, UserPlus } from "lucide-react";
import { useEffect, useState } from 'react';
import { toast } from "sonner";

export default function CustomersPage() {
    const { activeBrand } = useBrand();
    const [customers, setCustomers] = useState<PlatformUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchCustomers = async () => {
            if (!activeBrand) return;
            setIsLoading(true);
            try {
                const res = await fetch(`/api/customers?brandId=${activeBrand.id}`);
                const data = await res.json();
                setCustomers(data);
            } catch (error) {
                toast.error("Failed to fetch customers");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCustomers();
    }, [activeBrand]);

    const filteredCustomers = customers.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="max-w-6xl">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 leading-tight">
                        Customer Directory
                    </h1>
                    <p className="text-slate-500 mt-1">Manage users and permissions for {activeBrand?.name}.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text"
                            placeholder="Search customers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all w-64"
                        />
                    </div>
                    <button className="flex items-center gap-2 bg-slate-50 text-slate-900 border border-slate-200 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-100 transition-all active:scale-95">
                        <UserPlus size={18} />
                        Add User
                    </button>
                </div>
            </header>

            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/50">
                                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Customer</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Contact</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Brand Role</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Joined</th>
                                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {isLoading ? (
                                [1, 2, 3].map(i => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={5} className="px-6 py-4">
                                            <div className="h-8 bg-slate-50 rounded-lg w-full"></div>
                                        </td>
                                    </tr>
                                ))
                            ) : filteredCustomers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center text-slate-400">
                                        <p className="text-sm font-bold">No customers found for this brand.</p>
                                    </td>
                                </tr>
                            ) : filteredCustomers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-black text-xs">
                                                {user.name[0]}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-900">{user.name}</p>
                                                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">ID: {user.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                                <Mail size={12} className="text-slate-400" />
                                                {user.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                                <Phone size={12} className="text-slate-400" />
                                                01XXX-XXXXXX
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-wider border border-blue-100 flex items-center gap-1">
                                                <ShieldCheck size={10} />
                                                {user.brandAccess.find(a => a.brandId === activeBrand?.id)?.role || 'CUSTOMER'}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-500">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-slate-400" />
                                            Jan 12, 2024
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-900 transition-colors">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
