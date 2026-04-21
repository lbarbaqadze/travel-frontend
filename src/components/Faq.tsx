"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image"; 

const FAQ_DATA = [
  {
    id: "01",
    question: "What is included in the premium tours?",
    answer: "Our premium packages include luxury accommodation, private transportation, professional guides, and curated dining experiences. We handle every detail so you can focus on the journey."
  },
  {
    id: "02",
    question: "Can I customize my itinerary?",
    answer: "Absolutely. We specialize in tailor-made travel. Our experts will work with you to adjust schedules, locations, and activities to match your personal preferences."
  },
  {
    id: "03",
    question: "What is your cancellation policy?",
    answer: "We offer flexible booking options. Cancellations made 30 days prior to the trip are fully refundable, and we provide travel insurance support for unforeseen circumstances."
  },
  {
    id: "04",
    question: "Do you provide airport transfers?",
    answer: "Yes, all our tours include private airport pick-up and drop-off services. A professional driver will meet you at the arrival hall to ensure a smooth start to your adventure."
  },
  {
    id: "05",
    question: "Are there discounts for group bookings?",
    answer: "We offer special rates for groups of 6 or more. Whether it's a family reunion or a corporate retreat, contact our team for a personalized group quote."
  }
];

export default function FAQ() {
  const [activeId, setActiveId] = useState<string | null>("01");

  return (
    <section className="w-full py-12 md:pt-30 bg-white font-sans text-neutral-900">
      <div className="container mx-auto px-6 max-w-6xl"> 
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center"> 
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden relative max-w-105 mx-auto lg:mx-0 lg:flex items-center justify-center h-full w-full self-start"
          >
            <div className="relative w-full aspect-4/5 rounded-sm overflow-hidden">
              <Image 
                src="/tours/faq.jpg" 
                alt="Travel Information"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 600px"
              />
            </div>
          </motion.div>

          <div className="w-full space-y-8">
            <div className="space-y-2 text-center lg:text-left">
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium">INFORMATION</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-700">
                Common Questions
              </h2>
            </div>

            <div className="divide-y divide-neutral-100 border-t border-neutral-100">
              {FAQ_DATA.map((item) => {
                const isOpen = activeId === item.id;
                
                return (
                  <div key={item.id} className="py-4 transition-all">
                    <button
                      onClick={() => setActiveId(isOpen ? null : item.id)}
                      className="w-full flex items-center justify-between text-left group py-1 cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-[9px] font-bold text-neutral-300 transition-colors group-hover:text-neutral-500">
                          {item.id}
                        </span>
                        <span className={`text-base md:text-lg font-medium transition-colors ${isOpen ? "text-slate-700" : "text-neutral-500 group-hover:text-neutral-800"}`}>
                          {item.question}
                        </span>
                      </div>
                      
                      <div className={`flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300 ${isOpen ? "bg-slate-700 text-white" : "bg-neutral-50 text-neutral-500"}`}>
                        <FontAwesomeIcon icon={isOpen ? faMinus : faPlus} className="text-[9px]" />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="pt-3 pl-8 md:pl-10 text-neutral-500 leading-relaxed font-light text-sm max-w-md">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  ); 
}