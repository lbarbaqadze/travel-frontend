"use client";

const links = {
  quickLinks: ["Home", "Destinations", "Tours", "About Us", "Contact"],
  resources: ["Travel Guide", "Booking Info", "Privacy Policy", "Terms of Service", "FAQ"],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-100 py-10 md:py-20">
      <div className="max-w-350 mx-auto px-6">
        
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-12 gap-x-6 md:gap-8 items-start">
          
          <div className="col-span-2 md:col-span-5 flex flex-col gap-6 md:gap-8 max-w-sm">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-black uppercase leading-none">
                Travel Agency
              </h2>
              <p className="text-xs md:text-sm text-black font-light opacity-70">
                Explore the world, one story at a time.
              </p>
            </div>

            <div className="flex flex-col gap-3">
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/50">
                 Subscribe to our newsletter
               </span>
               <div className="flex h-11 md:h-12 w-full bg-neutral-50 rounded-xl border border-neutral-100 p-1 focus-within:border-[#1264E2]/50 transition-all">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-1 bg-transparent px-3 outline-none text-xs md:text-sm placeholder:text-neutral-300"
                  />
                  <button className="h-full aspect-square bg-slate-700 text-white rounded-lg flex items-center justify-center cursor-pointer">
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  </button>
               </div>
            </div>

            <div className="flex flex-col gap-3">
               <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/50">Follow Our Journey</span>
               <div className="flex gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-400 hover:text-[#1264E2] transition-all cursor-pointer">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 flex flex-col gap-4 md:gap-6">
            <h4 className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-slate-500">Explore</h4>
            <div className="flex flex-col gap-2.5">
              {links.quickLinks.map((item) => (
                <a key={item} href="#" className="text-[12px] md:text-[13px] text-neutral-500 hover:text-black transition-colors">{item}</a>
              ))}
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 flex flex-col gap-4 md:gap-6">
            <h4 className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-slate-500">Resources</h4>
            <div className="flex flex-col gap-2.5">
              {links.resources.map((item) => (
                <a key={item} href="#" className="text-[12px] md:text-[13px] text-neutral-500 hover:text-black transition-colors">{item}</a>
              ))}
            </div>
          </div>

          <div className="col-span-2 md:col-span-3 flex flex-col gap-4 md:gap-6 pt-4 md:pt-0">
            <h4 className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-slate-500]">Contact Us</h4>
            <div className="flex flex-col gap-4 text-[12px] md:text-[13px] text-neutral-500">
              <div className="flex gap-3">
                <svg className="shrink-0 text-slate-500 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <p className="leading-relaxed">Tbilisi, Georgia. Rustaveli Ave 12, 0108</p>
              </div>
              <div className="flex gap-3 items-center">
                <svg className="text-slate-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <p>travelagencyinfo21@gmail.com</p>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-4 pt-8 border-t border-neutral-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] md:text-[10px] text-black/40 font-bold uppercase tracking-[0.2em] text-center">
            © 2026 Copyright: Travel Agency.
          </p>
          <div className="flex gap-6 md:gap-8 text-[9px] md:text-[10px] text-black/40 font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
}