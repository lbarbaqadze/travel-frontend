import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers/providers";

export const metadata: Metadata = {
  title: "Travel Agency | Explore Your Next Adventure",
  description: "Discover curated tours and premium travel experiences. Book your next journey with us.",
  
  keywords: ["travel", "tours", "adventure", "booking", "vacation"],
  authors: [{ name: "Travel Agency Team" }],

  openGraph: {
    title: "Travel Agency | Explore Your Next Adventure",
    description: "Premium travel experiences curated just for you. Start your journey today!",
    url: "https://your-domain.com", 
    siteName: "Travel Agency",
    images: [
      {
        url: "/tours/background.jpg", 
        width: 1200,
        height: 630,
        alt: "Travel Agency Adventure",
      },
    ],
    locale: "en_US",
    type: "website",
  },   
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">       
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}