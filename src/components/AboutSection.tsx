"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck } from '@fortawesome/free-solid-svg-icons';

const features = [
  {
    title: "Curated Routes",
    description: "We don't do generic. Every destination is personally verified.",
    fullDetails: "Our travel experts spend months on the ground before a destination enters our catalog. We test the beds, eat at the local spots, and find the hidden paths that guidebooks miss.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" /><circle cx="12" cy="10" r="3" /></svg>
    ),
  },
  {
    title: "Seamless Support",
    description: "Your peace of mind is our priority 24/7.",
    fullDetails: "Whether it's a missed flight at 3 AM or a last-minute restaurant change, our global network is one message away. We handle the stress so you can stay in the moment.",    
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
    ),
  },
  {
    title: "Local Connection",
    description: "Travel is about people and authentic looks behind the curtain.",
    fullDetails: "We believe in sustainable tourism that benefits locals. You'll meet the artisans, family-run vineyard owners, and community leaders who make each place unique.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
    ),
  },
];

export default function AboutSection() {
  const [selectedFeature, setSelectedFeature] = useState<null | typeof features[0]>(null);

  return (
    <section className="py-10 bg-white">
      <div className="max-w-8xl mx-auto px-5 md:px-16">        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedFeature(feature)} 
              className="group p-8 md:p-10 rounded-[2.5rem] bg-neutral-50 hover:bg-neutral-100 transition-all duration-500 flex flex-col justify-between min-h-80 cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-neutral-900 shadow-sm mb-8 transition-transform group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-4 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-neutral-500 text-sm md:text-base leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2 text-sm font-bold text-neutral-900 overflow-hidden">
                <span className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-neutral-900 after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left uppercase tracking-widest text-[10px]">
                  Learn More
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedFeature && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedFeature(null)}
              className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-100 cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-[3rem] shadow-2xl z-110 p-10 border border-slate-50"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-900 mb-4">
                  {selectedFeature.icon}
                </div>
                <button 
                  onClick={() => setSelectedFeature(null)}
                  className="w-10 h-10 flex items-center justify-center bg-slate-50 text-slate-400 rounded-full hover:text-slate-900 transition-all cursor-pointer"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-4">{selectedFeature.title}</h3>
              <p className="text-slate-500 leading-relaxed mb-8 font-light italic">
                "{selectedFeature.fullDetails}"
              </p>

              <div className="space-y-3 mb-4">
                {["Expert verified", "Sustainable choice", "Hidden gems"].map((point, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-green-50 text-green-500 flex items-center justify-center text-[10px]">
                      <FontAwesomeIcon icon={faCheck} />
                    </div>
                    {point}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}