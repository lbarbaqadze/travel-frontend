'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faBriefcase } from '@fortawesome/free-solid-svg-icons';

export default function AboutModern() {
  const [isCrewOpen, setIsCrewOpen] = useState(false);

  const crewMembers = [
    { id: 1, name: "Jake B.", role: "Founder & Lead Explorer", img: "/tours/crew/img1.jpg.avif" },
    { id: 2, name: "Kate K.", role: "Destination Expert", img: "/tours/crew/img2.jpg" },
    { id: 3, name: "Jim T.", role: "Logistics Wizard", img: "/tours/crew/img3.jpg" },
  ];

  return (
    <section className="md:py-10 bg-white overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 pt-10">
            <p className="text-2xl md:text-3xl font-medium leading-tight text-slate-900 mb-8">
              We ditched the boring guidebooks to build something real.
            </p>
            <p className="text-lg text-slate-500 leading-relaxed font-normal max-w-md">
              Our team consists of backpackers, luxury seekers, and map-obsessed 
              explorers. We don't just organize travel; we design the moments 
              you'll talk about for the next ten years.
            </p>
            
            <div className="mt-12 flex gap-4">
               <button 
                onClick={() => setIsCrewOpen(true)}
                className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-700 cursor-pointer transition-all duration-300 shadow-lg shadow-slate-900/10 active:scale-95"
               >
                 Meet the Crew
               </button>
            </div>
          </div>

          <div className="lg:col-span-7 relative h-125 md:h-175">
            <div className="absolute top-0 right-0 w-2/3 h-3/4 rounded-3xl overflow-hidden rotate-2 shadow-2xl z-10">
              <img src="/tours/crew/crew2.jpg" className="w-full h-full object-cover" alt="Travel" />
            </div>
            
            <div className="absolute bottom-10 left-0 w-1/2 h-1/2 rounded-3xl overflow-hidden -rotate-6 shadow-xl border-8 border-white z-20">
              <img src="/tours/crew/crew.jpg" className="w-full h-full object-cover" alt="Culture" />
            </div>

            <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-400/20 rounded-full -z-10 animate-pulse blur-2xl"></div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isCrewOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCrewOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-100 cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg bg-white rounded-[2.5rem] shadow-2xl z-110 overflow-hidden border border-slate-100"
            >
              <div className="px-10 py-8">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">The Crew</h3>
                    <p className="text-sm text-slate-400 font-medium uppercase tracking-widest">Behind the Scenes</p>
                  </div>
                  <button 
                    onClick={() => setIsCrewOpen(false)}
                    className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 rounded-full hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </div>

                <div className="space-y-4">
                  {crewMembers.map((member) => (
                    <div key={member.id} className="flex items-center gap-5 p-4 rounded-3xl bg-slate-50 border border-transparent hover:border-slate-200 transition-all group">
                      <div className="w-14 h-14 bg-slate-200 rounded-2xl overflow-hidden shrink-0">
                        <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="grow">
                        <h4 className="font-bold text-slate-900">{member.name}</h4>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                          <FontAwesomeIcon icon={faBriefcase} className="text-[10px]" />
                          {member.role}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-8 text-sm text-slate-500 text-center leading-relaxed italic">
                  "We don't just organize travel; we design the moments you'll talk about for years."
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}