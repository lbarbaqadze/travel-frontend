"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/cartContext";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface HeroProps {
  allTours?: any[];
}

export default function Hero({ allTours = [] }: HeroProps) {
  const { addToCart } = useCart();

  const locations = [
    "Georgia", "Paris, France", "Italy, Rome", "New York, USA",
    "London, UK", "Barcelona, Spain", "Amsterdam", "Iceland"
  ];

  const [searchData, setSearchData] = useState({
    location: "Georgia",
    checkIn: "2026-06-24",
    checkOut: "2026-06-30",
    people: "2"
  });

  const handleSearchAndAdd = () => {
    const foundTour = allTours.find(tour =>
      tour.location.toLowerCase().includes(searchData.location.toLowerCase())
    );

    if (foundTour) {
      addToCart(foundTour);
    } else {
      toast.error("ტური ვერ მოიძებნა");
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-white px-4 md:px-16 py-6 md:py-12 flex flex-col items-center overflow-x-hidden">
      <div className="w-full max-w-7xl mt-6 md:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start text-center lg:text-left">
        <div className="lg:col-span-8">
          <h1 className="text-[42px] sm:text-[60px] md:text-[100px] font-bold leading-none md:leading-[0.85] tracking-tighter text-slate-700 mb-4 md:mb-6 select-none">
            Your Next <br className="hidden md:block" /> Adventure Awaits
          </h1>
        </div>
        <div className="lg:col-span-4 pt-0 lg:pt-16">
          <p className="text-sm md:text-lg text-neutral-500 leading-relaxed font-medium px-2 lg:px-0">
            Explore stunning destinations, unique experiences, and unforgettable journeys.
          </p>
        </div>
      </div>

      <div className="w-full max-w-7xl mt-10 md:mt-16 relative flex flex-col items-center">
        <div className="relative w-full h-80 sm:h-112.5 md:h-150 rounded-[30px] md:rounded-[45px] overflow-hidden shadow-2xl border-2 md:border-4 border-white shrink-0">
          <Image
            src="/tours/background.jpg"
            alt="Adventure Landscape"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute -bottom-55 sm:-bottom-16 md:-bottom-10 left-1/2 -translate-x-1/2 w-[92%] sm:w-[90%] md:w-[90%] lg:w-[85%] bg-white rounded-[25px] md:rounded-[35px] p-5 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-neutral-100 flex flex-col md:flex-row gap-3 md:gap-2 items-center justify-between z-20">

          <div className="flex flex-col gap-0.5 md:gap-1 w-full md:w-auto md:flex-1 px-1 border-b md:border-b-0 md:border-r border-neutral-100 pb-2 md:pb-0">
            <span className="text-[10px] md:text-[11px] font-bold text-neutral-400 uppercase tracking-tighter">📍 Location</span>
            <select
              className="text-xs sm:text-sm font-black text-neutral-800 bg-transparent outline-none cursor-pointer w-full p-0"
              value={searchData.location}
              onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
            >
              {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-0.5 md:gap-1 w-full md:w-auto md:flex-1 px-1 border-b md:border-b-0 md:border-r border-neutral-100 pb-2 md:pb-0">
            <span className="text-[10px] md:text-[11px] font-bold text-neutral-400 uppercase tracking-tighter">📅 Check In</span>
            <input
              type="date"
              className="text-xs sm:text-sm font-black text-neutral-800 bg-transparent outline-none cursor-pointer w-full p-0"
              value={searchData.checkIn}
              onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-0.5 md:gap-1 w-full md:w-auto md:flex-1 px-1 border-b md:border-b-0 md:border-r border-neutral-100 pb-2 md:pb-0">
            <span className="text-[10px] md:text-[11px] font-bold text-neutral-400 uppercase tracking-tighter">📅 Check Out</span>
            <input
              type="date"
              className="text-xs sm:text-sm font-black text-neutral-800 bg-transparent outline-none cursor-pointer w-full p-0"
              value={searchData.checkOut}
              onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-0.5 md:gap-1 w-full md:w-auto md:flex-1 px-1 pb-2 md:pb-0">
            <span className="text-[10px] md:text-[11px] font-bold text-neutral-400 uppercase tracking-tighter">👥 People</span>
            <select
              className="text-xs sm:text-sm font-black text-neutral-800 bg-transparent outline-none cursor-pointer w-full p-0"
              value={searchData.people}
              onChange={(e) => setSearchData({ ...searchData, people: e.target.value })}
            >
              {[1, 2, 3, 4, 5, 6].map(num => <option key={num} value={num.toString()}>{num} Person</option>)}
            </select>
          </div>

          <button
            onClick={handleSearchAndAdd}
            className="cursor-pointer w-full md:w-14 h-12 md:h-14 mt-1 md:mt-0 bg-slate-700 text-white rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-slate-900 transition-all shadow-lg shrink-0 active:scale-95"
          >
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </button>
        </div>
      </div>
      <div className="h-32 md:h-24 w-full" />
    </section>
  );
}