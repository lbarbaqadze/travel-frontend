'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { privateFetch } from "@/lib/api";
import toast from 'react-hot-toast';

export default function ManageTours() {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    useEffect(() => {
        const fetchTours = async () => {
            const token = document.cookie
                .split('; ')
                .find(row => row.startsWith('token='))
                ?.split('=')[1];

            console.log("Token sent:", token)

            try {
                const res = await fetch(`${apiUrl}/admin/tours`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!res.ok) {
                    console.log("Status:", res.status);
                    throw new Error('Failed to fetch tours');
                }

                const data = await res.json();
                setTours(data);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTours();
    }, []);

    const handleDelete = async (id: number) => {
        const confirmed = confirm("Are you sure you want to delete this tour?");

        if (!confirmed) {
            return;
        }

        try {
            const res = await privateFetch(`${apiUrl}/admin/tours/${id}`, { method: "DELETE" })
            if (res.ok) {
                setTours(tours.filter((tour: any) => tour.id !== id));
                toast.success("Tour deleted successfully!");
            } else {
                toast.error("Failed to delete the tour.");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("An error occurred while deleting.");
        }

    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">
                    Manage <span className="text-slate-400">Tours</span>
                </h1>
                <Link href="/admin/tours/add">
                    <button className="cursor-pointer bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-700 transition-all shadow-lg active:scale-95 uppercase text-xs tracking-widest">
                        + Add New Tour
                    </button>
                </Link>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-20 text-center italic text-slate-400 animate-pulse">Loading tours database...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-50 text-slate-400 text-xs font-bold uppercase tracking-widest">
                                    <th className="p-6">Tour Title</th>
                                    <th className="p-6">Price</th>
                                    <th className="p-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {tours.map((tour: any) => (
                                    <tr key={tour.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-6 font-bold text-slate-900">{tour.location}</td>
                                        <td className="p-6 font-black text-slate-900">${tour.price}</td>
                                        <td className="p-6 text-right">
                                            <Link
                                                href={`/admin/tours/edit/${tour.id}`}
                                                className="cursor-pointer text-xs font-bold text-slate-400 hover:text-blue-600 mr-4 uppercase transition-colors"
                                            >
                                                Edit
                                            </Link>
                                            <button onClick={() => handleDelete(tour.id)} className="cursor-pointer text-xs font-bold text-slate-400 hover:text-red-500 uppercase">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}