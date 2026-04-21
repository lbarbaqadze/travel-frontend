export default function ToursPageSection() {
  return (
    <section className="w-full py-0 md:py-10 text-[#e0e0e0]">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 border-b border-white/5 pb-0 md:pb-4">
          <h2 className="text-4xl md:text-6xl font-bold max-w-xl italic text-slate-700">
            Travel beyond <br />
            <span className="text-slate-400">expectations.</span>
          </h2>
          <p className="text-gray-400 max-w-xs text-sm uppercase tracking-[0.2em] mt-6 md:mt-0 font-bold">
            Our Values
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          
          <div className="group cursor-default">
            <div className="mb-6 text-2xl font-light text-slate-600 group-hover:text-slate-400 transition-colors italic">01</div>
            <h3 className="text-xl font-bold mb-4 tracking-tight uppercase text-gray-600">Expert Curation</h3>
            <p className="text-gray-400 font-light leading-relaxed">
              We handpick every destination and itinerary. We don't just sell tickets; 
              we craft unique experiences tailored specifically to your wanderlust.
            </p>
          </div>

          <div className="group cursor-default">
            <div className="mb-6 text-2xl font-light text-slate-600 group-hover:text-slate-400 transition-colors italic">02</div>
            <h3 className="text-xl font-bold mb-4 tracking-tight uppercase text-gray-600">Full Transparency</h3>
            <p className="text-gray-400 font-light leading-relaxed">
              No hidden fees, no surprises. Everything included in your package is 
              clearly listed, so you can focus entirely on enjoying your journey.
            </p>
          </div>

          <div className="group cursor-default">
            <div className="mb-6 text-2xl font-light text-slate-600 group-hover:text-slate-400 transition-colors italic">03</div>
            <h3 className="text-xl font-bold mb-4 tracking-tight uppercase text-gray-600">24/7 Support</h3>
            <p className="text-gray-400 font-light leading-relaxed">
              Wherever you are in the world, our team is a message away. We prioritize 
              your peace of mind and safety throughout your entire adventure.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}