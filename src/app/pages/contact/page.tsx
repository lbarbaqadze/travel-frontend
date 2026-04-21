import Image from "next/image";
import Navbar from "@/components/NavBar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <>
      <Navbar />
      <section className="pt-20 bg-white text-slate-700">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="text-5xl md:text-8xl font-bold italic mb-10 tracking-tighter">
            Let's connect<br />
            and start <span className="text-slate-400">your story.</span>
          </h1>
          <p className="max-w-2xl text-lg text-slate-500 leading-relaxed font-light">
            Ready to turn your travel dreams into a reality? Whether you have a
            specific destination in mind or just need a little inspiration,
            our team is here to guide you every step of the way.
          </p>
        </div>
      </section>
      <ContactSection />
      <Footer />
    </>
  );
}
