"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const partners = [
  { name: "Airbnb", rotate: "-2deg", y: "0px", msg: "Exclusive 15% discount on boutique lofts." },
  { name: "WizzAir", rotate: "3deg", y: "10px", msg: "Priority boarding for our premium members." },
  { name: "Booking", rotate: "-1deg", y: "-5px", msg: "Zero-fee cancellations on all routes." },
  { name: "Adobe", rotate: "2deg", y: "15px", msg: "Creative presets for your travel photos." },
  { name: "Discord", rotate: "-3deg", y: "5px", msg: "Join our private community of travelers." },
  { name: "Hertz", rotate: "1deg", y: "0px", msg: "Free upgrade to SUV for mountain trips." },
];

export default function PartnerSection() {
  const [activeMsg, setActiveMsg] = useState<string | null>(null);

  const showMessage = (msg: string) => {
    setActiveMsg(msg);
    setTimeout(() => setActiveMsg(null), 4000); 
  };

  return (
    <section className="md:pb-20 md:pt-10 py-10 bg-white overflow-hidden relative">
      <div className="max-w-8xl mx-auto px-6 md:px-16">
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <h2 className="italic text-3xl md:text-4xl font-light text-slate-700 tracking-tight">
            Work with <span className="font-black italic text-slate-400">the best</span>
          </h2>          
          <p className="text-[12px] font-bold uppercase tracking-[0.3em] text-slate-300">
            500+ Global Partners
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {partners.map((partner, index) => (
            <motion.div 
              key={index}
              style={{ rotate: partner.rotate, y: partner.y }}
              whileHover={{ y: -15, rotate: "0deg", scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => showMessage(partner.msg)}
              className="group relative px-8 py-6 rounded-3xl bg-slate-900 border shadow-xl shadow-slate-900/20 flex items-center justify-center cursor-pointer transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white/3 rounded-3xl" />
              <span className="font-black uppercase tracking-tighter text-lg text-slate-400 group-hover:text-white transition-colors">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeMsg && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-10 left-1/2 z-200 bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl border border-slate-800 text-sm font-medium flex items-center gap-4 min-w-75 justify-center text-center"
          >
            {activeMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}