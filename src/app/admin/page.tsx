'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { privateFetch } from "@/lib/api";

export default function AdminDashboard() {
    const [data, setData] = useState({
        stats: { tours: 0, users: 0, messages: 0 },
        recentUsers: [],
        recentMessages: []
    });
    const [loading, setLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
    const timer = setInterval(() => {
        setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        setIsMounted(true); 

        const fetchStats = async () => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            try {
                const res = await privateFetch(`${apiUrl}/admin/statstwo`);
                if (!res.ok) throw new Error('Network response was not ok');
                const result = await res.json();
                
                setData({
                    stats: result.stats || { tours: 0, users: 0, messages: 0 },
                    recentUsers: result.recentUsers || [],
                    recentMessages: result.recentMessages || []
                });
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const stats = [
        { label: 'Total Tours', value: data.stats.tours, icon: '🌍', bg: 'bg-blue-50' },
        { label: 'Active Users', value: data.stats.users, icon: '👤', bg: 'bg-purple-50' },
        { label: 'New Messages', value: data.stats.messages, icon: '📩', bg: 'bg-amber-50' },
    ];

    if (!isMounted) return null;

    return (
        <div className="space-y-10 pb-10">

            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">
                        Welcome back, <span className="text-slate-400">Admin</span>
                    </h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">
                        {loading ? "Syncing with database..." : "System is live and updated."}
                    </p>
                </div>
                <div className="hidden md:block text-right">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Server Time</p>
                    <p className="font-mono text-sm font-bold text-slate-900">
                        {currentTime}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-all">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
                            <h3 className="text-4xl font-black text-slate-900">{stat.value}</h3>
                        </div>
                        <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center text-2xl`}>
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold italic tracking-tight">Latest Messages</h3>
                        <Link href="/admin/messages" className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 px-3 py-1.5 rounded-full">
                            View All
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {data.recentMessages.length > 0 ? data.recentMessages.map((msg: any) => (
                            <div key={msg.id} className="p-5 bg-slate-50 rounded-3xl border border-transparent hover:border-slate-200 transition-all">
                                <div className="flex justify-between items-start mb-1">                                
                                    <span className="font-bold text-slate-900 text-sm">{msg.sender_name}</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">New</span>
                                </div>
                                <p className="text-xs text-slate-500 line-clamp-1 italic">"{msg.message}"</p>
                            </div>
                        )) : (
                            <div className="py-10 text-center border-2 border-dashed border-slate-100 rounded-4xl">
                                <p className="text-slate-400 text-sm italic text-center mx-auto">No new messages to display.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-slate-500 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200">
                        <h3 className="text-slate-100 text-lg font-bold mb-6 italic">Quick Actions</h3>
                        <div className="space-y-3">
                            <Link href="/admin/tours/add" className="flex items-center justify-center p-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all text-sm">
                                + Create New Tour
                            </Link>
                            <Link href="/admin/users" className="flex items-center justify-center p-4 bg-slate-700 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all text-sm">
                                Manage Accounts
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <h3 className="text-lg font-bold mb-6 italic text-center">Recent Users</h3>
                        <div className="space-y-4">
                            {data.recentUsers.length > 0 ? data.recentUsers.map((user: any) => (
                                <div key={user.id} className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 uppercase">
                                        {user.name?.charAt(0) || "U"}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-slate-900 truncate w-32">{user.name}</span>
                                        <span className="text-[10px] text-slate-400 truncate w-32">{user.email}</span>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-slate-400 text-xs italic text-center">No new registrations.</p>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}