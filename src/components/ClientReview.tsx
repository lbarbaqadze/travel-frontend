"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";

const featuredReview = {
  quote: "This was hands down the best trip of my life. Every detail was meticulously planned, from the scenic train routes in the Swiss Alps to the charming boutique hotels. The 24/7 support gave us peace of mind. Truly unforgettable!",
  name: "Sarah Jenkins",
  role: "Adventurer",
  imgUrl: "/tours/europe/sarah.jpg.webp", 
  rating: 5
};

export default function ClientReviews() {
  return (
    <section className="py-20 bg-white text-[#1d1d1f]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">    

        <div className="grid md:grid-cols-12 gap-16 items-center">
          
          <div className="md:col-span-6 relative aspect-3/4 md:aspect-auto md:h-125 overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-slate-50">
            <img 
              src={featuredReview.imgUrl} 
              alt={featuredReview.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
          </div>

          <div className="md:col-span-6 flex flex-col justify-center items-start">
            
            <div className="w-16 h-16 rounded-full bg-slate-900/10 text-slate-900 flex items-center justify-center mb-8">
              <FontAwesomeIcon icon={faQuoteRight} className="text-2xl" />
            </div>

            <p className="text-2xl md:text-3xl font-medium text-slate-700 leading-snug tracking-tight italic mb-10">
              "{featuredReview.quote}"
            </p>

            <div className="border-l-4 border-slate-900 pl-6 space-y-2">
              <h4 className="font-bold text-lg uppercase tracking-tight text-slate-900">
                {featuredReview.name}
              
              </h4>
              <p className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-3">
                {featuredReview.role}
              
              </p>
              
              <div className="flex gap-1 text-yellow-500 text-xs">
                {[...Array(featuredReview.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}