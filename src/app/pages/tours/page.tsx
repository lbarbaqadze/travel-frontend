'use client'
import Image from "next/image";
import Navbar from "@/components/NavBar";
import ToursMainHero from "@/components/ToursMainHero";
import ToursSection from "@/components/ToursSection";
import ToursPageSection from "@/components/ToursPageSection";
import { useEffect, useState } from "react";
import ClientReviews from "@/components/ClientReview";
import Footer from "@/components/Footer";

export default function Tours() {

  const [europe, setEurope] = useState<any[]>([])
  const [asia, setAsia] = useState<any[]>([])

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const fetchAllTours = async () => {
      try {

        const [europeRes, asiaRes] = await Promise.all([
          fetch(`${apiUrl}/tours/europe`),
          fetch(`${apiUrl}/tours/asia`)
        ]);

        const europeData = await europeRes.json();
        const asiaData = await asiaRes.json();

        const formattedEurope = europeData.map((item: any) => ({
          ...item,
          category: "europe"
        }));

        const formattedAsia = asiaData.map((item: any) => ({
          ...item,
          category: "asia"
        }));

        setEurope(formattedEurope);
        setAsia(formattedAsia);
      } catch (err) {
        console.error("Error fetching tours:", err);
      }
    };

    fetchAllTours();
  }, []);

  return (
    <>
      <Navbar />
      <ToursMainHero />
      <ToursSection
        title="Europe"
        tours={europe}
        onTourClick={(tour) => console.log("Selected:", tour)}
        style="pt-10"
      />
      <ToursSection
        tours={asia}
        onTourClick={(tour) => console.log("Selected:", tour)}
        title="Asia"
        style="pt-0"
      />
      <ToursPageSection />
      <ClientReviews />
      <Footer />
    </>
  );
}
