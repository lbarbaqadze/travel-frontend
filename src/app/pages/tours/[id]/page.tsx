'use client'
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation"; 
import Image from "next/image";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/cartContext";

export default function SingleTourPage() {
    const { id } = useParams();
    const searchParams = useSearchParams(); 
    const { addToCart } = useCart()
    const [tour, setTour] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const category = searchParams.get("category");

                const url = `${apiUrl}/tours/${id}${category ? `?category=${category}` : ''}`;
                
                console.log("Fetching from URL:", url); 

                const res = await fetch(url);
                const data = await res.json();
                setTour(data);
            } catch (err) {
                console.error("Error:", err);
            } finally {
                setLoading(false);
            }
        };
        
        if (id) fetchTour();
    }, [id, searchParams]);

    if (loading) return <div className="p-20 text-center font-bold italic">Loading Adventure...</div>;
    if (!tour) return <div className="p-20 text-center">Tour not found.</div>;


    return (

        <>
            <Navbar />
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    <div className="relative h-125 rounded-[3rem] overflow-hidden shadow-2xl">
                        <Image
                            src={tour.image_url}
                            alt={tour.title}
                            fill
                            priority
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>

                    <div className="flex flex-col justify-center space-y-6">
                        <div className="space-y-2">
                            <span className="text-gray-600 font-bold uppercase tracking-widest text-sm italic">
                                {tour.title}
                            </span>
                            <h1 className="text-5xl font-black italic uppercase tracking-tighter text-slate-800 leading-none">
                                {tour.location}
                            </h1>
                        </div>

                        <p className="text-slate-500 leading-relaxed text-lg italic">
                            {tour.description}
                        </p>

                        <div className="flex items-center gap-8 py-4 border-y border-slate-100">
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Duration</p>
                                <p className="text-xl font-black text-slate-900">{tour.duration} Days</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Price</p>
                                <p className="text-xl font-black text-slate-900">${tour.price}</p>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button onClick={() => addToCart(tour)}
                            className="cursor-pointer flex-1 bg-slate-600 text-white py-5 rounded-2xl font-black italic uppercase hover:bg-slate-900 transition-all shadow-lg shadow-slate-200">
                                Add To Cart
                            </button>                            
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}