"use client";
import React, { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const CounterItem = ({ end, label, suffix = "+" }: { end: number, label: string, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const duration = 1500;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        
        setCount(Math.floor(percentage * end));

        if (percentage < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <h4 className="text-6xl md:text-7xl font-black tracking-tighter text-slate-900 italic">
        {count}{suffix}
      </h4>
      <div className="w-10 h-0.5 bg-slate-900 mt-2 mb-3" /> 
      <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold">
        {label}
      </p>
    </div>
  );
};

export default function AboutStats() {
  return (
    <section className="py-16 md:py-24 bg-white"> 
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <CounterItem end={5} label="Years of Passion" />
          <CounterItem end={120} label="Destinations" />
          <CounterItem end={500} label="Happy Travelers" />
          <CounterItem end={100} label="Satisfaction" suffix="%" />
        </div>
      </div>
    </section>
  );
}