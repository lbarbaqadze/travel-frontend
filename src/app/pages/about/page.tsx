import Image from "next/image";
import Navbar from "@/components/NavBar";
import AboutStats from "@/components/AboutStats";
import AboutSection from "@/components/AboutSection";
import PartnerSection from "@/components/PartnerSection";
import AboutModern from "@/components/AboutModernFeatures";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <>
      <Navbar />
      <section className="py-24 bg-white text-slate-700">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="text-5xl md:text-8xl font-bold italic mb-10">
            We curate <br /> <span className="text-slate-400 font-serif">moments,</span> not just trips.
          </h1>
          <p className="max-w-2xl text-lg text-slate-500 leading-relaxed font-light">
            Founded in 2021, our mission is to redefine the way people explore the world.
            We believe in slow travel, authentic experiences, and creating stories that last a lifetime.
          </p>
        </div>
      </section>                  
      <AboutModern />
      <PartnerSection />
      <AboutSection />  
      <AboutStats />  
      <Footer />
    </>
  );
}
