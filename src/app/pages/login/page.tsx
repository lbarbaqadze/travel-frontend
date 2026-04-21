"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';

export default function LoginPage() {

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const { login } = useAuth()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        try {
            const res = await fetch(`${apiUrl}/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })

            const data = await res.json();

            if (res.ok) {                

                Cookies.set('token', data.token, { expires: 7 });
                Cookies.set('userRole', data.user.role, { expires: 7 });
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                login(data.user, data.token);
                router.push('/');
            } else {
                toast.error(data.message || "Invalid data")
            }
        } catch (err) {
            console.error("An error occurred while logging in")
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#F8F9FA] p-6 text-[#1A1D1F]">
            <div className="w-full max-w-105">

                <div className="mb-10 flex flex-col items-center">
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
                    <p className="text-neutral-500 mt-2 text-sm">Enter your details to access your account</p>
                </div>

                <div className="bg-white border border-neutral-200/60 rounded-[2.5rem] p-8 md:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)]">
                    <form className="space-y-5" onSubmit={handleLogin}>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold ml-1 text-neutral-700">Email Address</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="name@company.com"
                                className="w-full h-13 bg-[#F4F4F4]/50 border border-transparent rounded-2xl px-5 text-sm outline-none focus:bg-white focus:border-neutral-200 focus:ring-4 focus:ring-black/5 transition-all placeholder:text-neutral-300"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-sm font-semibold text-neutral-700">Password</label>
                                <Link href="/pages/forgotpassword" className="text-xs font-medium text-neutral-400 hover:text-black transition-colors">Forgot Password?</Link>
                            </div>
                            <div className="relative">
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="w-full h-13 bg-[#F4F4F4]/50 border border-transparent rounded-2xl px-5 text-sm outline-none focus:bg-white focus:border-neutral-200 focus:ring-4 focus:ring-black/5 transition-all placeholder:text-neutral-300"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-300 hover:text-black transition-colors"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                </button>
                            </div>
                        </div>

                        <button className="w-full h-13 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white rounded-2xl font-bold text-sm transition-all active:scale-[0.98] shadow-lg shadow-blue-600/20 mt-2">
                            Sign In
                        </button>
                    </form>

                    <div className="mt-8 flex items-center gap-4">
                        <div className="h-px flex-1 bg-neutral-100"></div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Social Login</span>
                        <div className="h-px flex-1 bg-neutral-100"></div>
                    </div>

                    <button
                        type="button"
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                        className="cursor-pointer w-full h-13 mt-6 border border-neutral-200 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold hover:bg-neutral-50 transition-all active:scale-[0.98]">
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>
                </div>

                <p className="mt-8 text-center text-sm text-neutral-500 font-medium">
                    Don't have an account?
                    <Link href="/pages/register" className="ml-2 text-black underline underline-offset-4 hover:text-neutral-600 transition-colors">
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    );
}