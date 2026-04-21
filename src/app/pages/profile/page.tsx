'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';
import Navbar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faShieldHalved, faCalendarDays, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function ProfilePage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/pages/login');
        }
    }, [user, loading, router]);

    if (loading) return null; 

    return (
        <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
            <Navbar />
            
            <main className="grow flex items-center justify-center px-6 py-16 md:py-20">
                <div className="w-full max-w-2xl bg-white border border-neutral-200 rounded-[2.5rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                    
                    <div className="bg-slate-900 p-10 flex flex-col items-center text-white">
                        <div className="w-24 h-24 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-full flex items-center justify-center text-3xl font-black mb-4">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <h1 className="text-2xl font-bold">{user?.name}</h1>
                        <span className="text-slate-400 text-sm font-medium uppercase tracking-widest mt-1">
                            {user?.role || 'Traveler'}
                        </span>
                    </div>

                    <div className="p-10 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            
                            <div className="space-y-1">
                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <FontAwesomeIcon icon={faEnvelope} /> Email Address
                                </p>
                                <p className="text-slate-900 font-bold">{user?.email}</p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <FontAwesomeIcon icon={faShieldHalved} /> Account Status
                                </p>
                                <p className="text-green-500 font-bold flex items-center gap-2 text-sm">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span> Active
                                </p>
                            </div>
                        </div>

                        <hr className="border-slate-50" />

                        <div className="flex flex-wrap gap-4 pt-2">
                            <button 
                                onClick={() => router.push('/pages/change-password')}
                                className="cursor-pointer flex-1 min-w-50 h-13 border border-slate-200 hover:bg-slate-50 text-slate-900 rounded-2xl font-bold text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                Change Password
                            </button>
                            
                            <button 
                                onClick={logout}
                                className="flex-1 min-w-50 cursor-pointer h-13 bg-red-50 hover:bg-red-100 text-red-500 rounded-2xl font-bold text-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                <FontAwesomeIcon icon={faRightFromBracket} /> Logout Account
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}