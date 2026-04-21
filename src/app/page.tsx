"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/NavBar";
import Hero from "@/components/HeroSection";
import SectionTwo from "@/components/SectionTwo";
import ToursSection from "@/components/ToursSection";
import SectionThree from "@/components/MainPageSection";
import FAQ from "@/components/Faq";
import Footer from "@/components/Footer";

export default function Home() {
  const [tours, setTours] = useState<any[]>([]);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch(`${apiUrl}/tours`);
        const data = await res.json();
        const toursWithCategory = data.map((item: any) => ({
          ...item,
          category: "tours"
        }));

        setTours(toursWithCategory);
      } catch (err) {
        console.error("Error fetching tours:", err);
      }
    };
    fetchTours();
  }, []);

  return (
    <>
      <Navbar />
      <Hero allTours={tours} />
      <SectionTwo />
      <ToursSection
        title="Explore Your Next Adventure"
        tours={tours}
        onTourClick={(tour) => console.log("Selected:", tour)}
      />
      <SectionThree />
      <FAQ />
      <Footer />
    </>
  );
}