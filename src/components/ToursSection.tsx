"use client";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faPlus, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@/context/cartContext";
import { useRouter } from "next/navigation";

interface ToursSectionProps {
  tours?: any[];
  onTourClick?: (tour: any) => void;
  title?: string;
  style?: string;
}

export default function ToursSection({ tours = [], onTourClick, title, style }: ToursSectionProps) {

  const router = useRouter()
  const { addToCart } = useCart()

  const handleBooking = (item: any) => {
    const url = `/pages/tours/${item.id}?category=${item.category || 'tours'}`;
    router.push(url);
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const move = direction === "left" ? -clientWidth * 0.4 : clientWidth * 0.4;
      scrollRef.current.scrollTo({ left: scrollLeft + move, behavior: "smooth" });
    }
  };

  const paddingStyle = style ? style : "pt-15";

  return (
    <section className={`w-full ${paddingStyle} bg-white text-[#1d1d1f]`}>
      <div className="max-w-375 mx-auto px-6 relative">

        <h2 className="text-3xl text-center md:text-4xl text-slate-700 mb-8 md:text-left tracking-tighter font-extrabold italic">{title}</h2>

        <div className="relative group">

          <button
            onClick={() => scroll("left")}
            className="cursor-pointer hover:bg-black
            absolute left-0 top-[40%] -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center -ml-2 md:group-hover:flex transition-all active:scale-90"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="text-gray-400 text-sm" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-10 scroll-smooth"
          >
            {tours.map((item: any) => (

              <div
                key={item.id}
                className="min-w-70 md:min-w-75 bg-white rounded-4xl p-6 flex flex-col shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-gray-50 snap-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="h-48 w-full flex items-center justify-center mb-6 overflow-hidden rounded-2xl">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold leading-tight mb-1">{item.location}</h3>
                    <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                      {item.description || "Premium Tour Package"}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <p className="text-lg font-bold mb-5">{item.price} $</p>

                    <div className="flex items-center gap-2">
                      
                        <button
                          onClick={() => handleBooking(item)}
                          className="w-46 cursor-pointer flex-1 h-9 bg-slate-700 text-white rounded-full text-xs font-bold hover:bg-slate-900 transition-colors">
                          Book Now
                        </button>
                      <button
                        onClick={() => addToCart(item)}
                        className="cursor-pointer w-9 h-9 border border-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all">
                        <FontAwesomeIcon icon={faPlus} size="xs" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="cursor-pointer hover:bg-black
            absolute right-0 top-[40%] -translate-y-1/2 z-40 w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center -mr-2 md:group-hover:flex transition-all active:scale-90"
          >
            <FontAwesomeIcon icon={faChevronRight} className="text-gray-400 text-sm" />
          </button>

        </div>
      </div>
    </section>
  );
}