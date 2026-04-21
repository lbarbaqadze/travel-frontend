'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { privateFetch } from "@/lib/api";
import toast from 'react-hot-toast';

export default function AddTour() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        location: '',
        duration: '',
        description: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const apiUrl = process.env.NEXT_PUBLIC_API_URL

        try {
            const res = await privateFetch(`${apiUrl}/admin/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast.success("New tour added successfully!");
                router.push('/admin/tours'); 
            } else {
                toast.error("Something went wrong!");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl space-y-8 p-4">
            <div>
                <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">
                    Add New <span className="text-slate-400">Package</span>
                </h1>
                <p className="text-slate-400 text-sm italic mt-1 font-medium">Create a new experience for your travelers.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8 text-slate-900">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Tour Title</label>
                    <input 
                        required
                        type="text"
                        placeholder="e.g. Alpine Weekend Getaway"
                        className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold placeholder:font-normal placeholder:text-slate-300"
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Location</label>
                        <input 
                            required
                            type="text"
                            placeholder="Switzerland"
                            className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Price ($)</label>
                        <input 
                            required
                            type="number"
                            placeholder="1200"
                            className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
                            onChange={(e) => setFormData({...formData, price: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Duration (Days)</label>
                        <input 
                            required
                            type="number"
                            placeholder="5"
                            className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
                            onChange={(e) => setFormData({...formData, duration: e.target.value})}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Description</label>
                    <textarea 
                        rows={5}
                        required
                        placeholder="Tell them about the journey..."
                        className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                    ></textarea>
                </div>

                <div className="flex gap-4 pt-6">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="cursor-pointer flex-1 p-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-700 shadow-xl shadow-slate-300 transition-all active:scale-95 uppercase tracking-widest text-xs disabled:opacity-50"
                    >
                        {loading ? 'Adding...' : 'Publish Tour'}
                    </button>
                    <button 
                        type="button" 
                        onClick={() => router.back()}
                        className="cursor-pointer px-10 p-5 bg-slate-100 text-slate-500 rounded-2xl font-bold hover:bg-slate-200 transition-all uppercase tracking-widest text-xs"
                    >
                        Back
                    </button>
                </div>
            </form>
        </div>
    );
}