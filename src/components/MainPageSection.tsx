import Image from "next/image"; 
import Link from "next/link";

export default function SectionThree() {
  return (
    <section className="w-full h-auto pt-7 sm:pt-20 flex items-center bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <div className="max-w-2xl">
            <p className="text-sm font-medium tracking-[0.2em] text-gray-500 uppercase mb-6">
              Curated Travel / 2026
            </p>

            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none mb-8">
              Rare places. <br />
              <span className="text-slate-600">Pure escape.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed mb-10 font-light">
              We discover the world's most secluded corners to provide you with 
              an experience that feels both wild and refined. Effortless booking 
              for unforgettable journeys.
            </p>

            <div className="flex flex-wrap gap-6">
              <Link href="/pages/tours" className="cursor-pointer text-black border-b-2 border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-all font-medium">
                View Destinations
              </Link>
              
              <Link href="/pages/about" className="cursor-pointer text-gray-500 border-b-2 pb-1 hover:text-black transition-all font-medium border-gray-500 hover:border-black">
                About Us
              </Link>
            </div>
          </div>

          <div className="lg:block relative h-112.5 w-full">
            <Image 
              src="/tours/bg.jpg" 
              alt="Luxury Travel Experience"
              fill 
              className="object-cover rounded-2xl transition-all duration-700 shadow-2xl scale-100 hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 50vw" 
            />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
}