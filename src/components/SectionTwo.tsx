"use client"; 
import Image from "next/image";

export default function SectionTwo() {
    const dealsData = [
        { 
            label: "Special Offer", 
            title: "New York City", 
            description: "Explore the city that never sleeps with our exclusive weekly discount packages.", 
            image: "/tours/new-york.jpg" 
        },
        { 
            label: "Summer Deal", 
            title: "Barcelona, Spain", 
            description: "From Sagrada Familia to the sunny beaches, discover the heart of Catalonia.", 
            image: "/tours/spain.jpg" 
        },
        { 
            label: "Romantic Week", 
            title: "Paris, France", 
            description: "Experience the magic of the Eiffel Tower and world-class French cuisine.", 
            image: "/tours/paris.jpg" 
        }
    ];

    return (
        <div className="py-0 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 relative">
                
                <h2 className="text-3xl md:text-5xl text-slate-700 mb-20 text-center tracking-tighter font-extrabold italic">
                    Seasonal Price Drops
                </h2>

                <div className="relative">
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2" />

                    <div className="space-y-24 md:space-y-15">
                        {dealsData.map((item, index) => (
                            <div key={index} className="relative flex items-center justify-center w-full">
                                
                                <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-800 z-20" />

                                <div className={`flex items-center w-full gap-8 md:gap-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                    
                                    <div className={`w-1/2 flex flex-col ${index % 2 === 0 ? 'items-end text-right' : 'items-start text-left'}`}>
                                        <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">
                                            {item.label}
                                        </span>
                                        <h3 className="text-base md:text-3xl font-black text-slate-800 italic leading-tight uppercase mt-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-[12px] md:text-sm text-slate-500 mt-2 max-w-70 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className="w-1/2 flex justify-center">
                                        <div className="relative w-full max-w-112.5 aspect-4/3 rounded-2xl overflow-hidden border border-slate-100 shadow-lg">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}