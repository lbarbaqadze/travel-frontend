'use client'
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { privateFetch } from "@/lib/api";
import toast from 'react-hot-toast';

export default function EditTour() {
    const { id } = useParams();
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '', price: '', location: '', duration: '', description: ''
    });

    useEffect(() => {
        const fetchTour = async () => {

            const apiUrl = process.env.NEXT_PUBLIC_API_URL

            try {
                const res = await privateFetch(`${apiUrl}/admin/tours/${id}`);
                const data = await res.json();
                setFormData(data);
            } catch (err) { console.error(err); }
        };
        fetchTour();
    }, [id]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        try {
            const res = await privateFetch(`${apiUrl}/admin/tours/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast.success("Tour updated successfully!");
                router.push('/admin/tours');
            }
        } catch (err) { console.error(err); }
    };

    return (
        <div className="max-w-2xl space-y-8">
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">
                Edit <span className="text-slate-400">Tour</span>
            </h1>

            <form onSubmit={handleUpdate} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Tour Title</label>
                    <input
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Price ($)</label>
                        <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Duration (Days)</label>
                        <input
                            type="number"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-bold"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">Description</label>
                    <textarea
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                    />
                </div>

                <div className="flex gap-4 pt-4">
                    <button type="submit" className="cursor-pointer flex-1 p-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-700 shadow-lg transition-all active:scale-95 uppercase tracking-widest text-xs">
                        Save Changes
                    </button>
                    <button type="button" onClick={() => router.back()} className="cursor-pointer px-8 p-4 bg-slate-100 text-slate-500 rounded-2xl font-bold hover:bg-slate-200 transition-all uppercase tracking-widest text-xs">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}