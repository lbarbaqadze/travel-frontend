"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TOURS = [
  {
    id: "01",
    title: "Los Angeles",
    subTitle: "USA",
    des: "Discover the magic of the City of Angels, where Hollywood glamour meets the serene shores of the Pacific. Stroll along the Walk of Fame, witness breathtaking sunsets at the Santa Monica Pier, and enjoy the unforgettable urban panoramas from the Griffith Observatory.",
    img: "/tours/bg-losangeles.jpg",
    glow: "rgba(116, 186, 255, 0.165)"
  },
  {
    id: "02",
    title: "BALI",
    subTitle: "INDONESIA",
    des: "Embark on an exotic adventure to the Island of the Gods, featuring lush jungles, ancient temples, and crystal-clear coastlines. Bali is the ultimate sanctuary for spiritual peace, yoga practice, and marveling at the vibrant emerald greens of the Ubud rice terraces.",
    img: "/tours/bg-bali.jpg.avif",
    glow: "rgba(56, 255, 189, 0.137)"
  },
  {
    id: "03",
    title: "TOKYO",
    subTitle: "JAPAN",
    des: "Step into the future where ultra-modern technology and cyberpunk neon lights coexist in perfect harmony with centuries-old traditions. Taste the world's finest sushi, navigate the famous Shibuya Crossing, and experience the unique essence of Japanese hospitality and order.",
    img: "/tours/bg-tokyo.jpg",
    glow: "rgba(244, 63, 93, 0.117)"
  },
  {
    id: "04",
    title: "PARIS",
    subTitle: "FRANCE",
    des: "The City of Love and Light radiates art and history at every turn. From the iconic Eiffel Tower to the treasures of the Louvre and the winding streets of Montmartre, Paris offers sophisticated gastronomy, high fashion, and an incomparably romantic atmosphere.",
    img: "/tours/bg-paris.jpg",
    glow: "rgba(244, 229, 63, 0.117)"
  }
];

export default function ToursMainHero() {
  const [active, setActive] = useState(TOURS[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative w-full min-h-175 md:h-187.5 bg-white flex flex-col justify-center overflow-hidden font-sans pt-12 md:pt-0">

      <motion.div
        animate={{ backgroundColor: active.glow }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-87.5 md:w-225 h-87.5 md:h-225 rounded-full blur-[100px] md:blur-[150px] transition-colors duration-1000 z-0"
      />

      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center">

        <div className="md:hidden text-center z-20 mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`mob-${active.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col"
            >
              <span className="text-[10px] font-black tracking-[0.4em] text-neutral-400 uppercase">{active.subTitle}</span>
              <h1 className="text-5xl font-black tracking-tighter text-black">{active.title}</h1>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute inset-0 hidden md:flex flex-col items-center justify-center pointer-events-none z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.05 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center leading-[0.8] font-black uppercase text-black -mt-15"
            >
              <span className="text-[14vw] tracking-tighter">{active.title}</span>
              <span className="text-[7vw] font-light text-neutral-400 tracking-[0.2em]">{active.subTitle}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center items-center z-10 mb-8 md:mb-15">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -20 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-75 md:max-w-105 aspect-4/5 md:h-100"
            >
              <img
                src={active.img}
                alt={active.title}
                className="w-full h-full object-cover rounded-2xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] border-[6px] border-white"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-full flex flex-col md:flex-row items-center md:items-end justify-between gap-10 z-20 pb-10 md:pb-0 mt-auto md:mt-0">

          <div className="text-center md:text-left max-w-75">
            <AnimatePresence mode="wait">
              <motion.div
                key={`info-${active.id}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-3"
              >
                <span className="text-black text-[10px] font-black uppercase tracking-[0.4em] md:border-b border-black/10 pb-1.5 inline-block">
                  Featured Tour {active.id}
                </span>
                <p className="text-neutral-500 text-[12px] leading-relaxed font-medium">
                  {active.des}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-row md:flex-col gap-6 md:gap-4 items-center md:items-end">
            {TOURS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t)}
                className="group flex flex-col md:flex-row items-center gap-2 md:gap-3 transition-all active:scale-95"
              >
                <span className={`text-[10px] md:text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${active.id === t.id ? 'text-black font-bold scale-110' : 'text-neutral-300 group-hover:text-neutral-500'}`}>
                  {t.title}
                </span>
                <div className={`h-0.5 transition-all duration-500 rounded-full ${active.id === t.id ? 'w-10 md:w-14 bg-black' : 'w-3 md:w-5 bg-neutral-200 group-hover:bg-neutral-300'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}