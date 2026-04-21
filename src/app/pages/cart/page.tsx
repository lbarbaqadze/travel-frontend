"use client";
import { useCart } from "@/context/cartContext";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faTrash, 
  faArrowLeft, 
  faBagShopping, 
  faCalendarDays, 
  faPlaneDeparture 
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";
import { useAuth } from "@/context/authContext";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const { cart, removeFromCart, isLoading, clearCart } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [formData, setFormData] = useState({ phone: "", notes: "" });

  const { user } = useAuth();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please authorize!");
      return;
    }

    if (!formData.phone) {
      toast.error("Please enter your phone number");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          email: user.email,
          phone: formData.phone,
          notes: formData.notes,
          cartItems: cart,
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Thank you! Your tour is booked ✈️");
        clearCart();
        setIsCheckingOut(false);
      } else {
        toast.error(data.message || "Reservation failed");
      }
    } catch (error) {
      toast.error("Connection failed");
    }
  };

  const safeCart = Array.isArray(cart) ? cart : [];
  const subtotal = safeCart.reduce((total, item) => total + (Number(item.price) || 0), 0);

  return (
    <div className="min-h-screen bg-[#F0F4F8] text-[#0A1F3E] font-sans">
      <Navbar />

      <div className="relative pt-24 pb-12 md:pt-32 md:pb-20 bg-[#0A1F3E] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/tours/background.jpg"
            alt="Travel background"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <main className="max-w-7xl mx-auto px-6 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-all group text-xs md:text-sm font-semibold mb-4">
            <FontAwesomeIcon icon={faArrowLeft} className="group-hover:-translate-x-1 transition-transform" />
            Back to Explore
          </Link>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-2">My Bag.</h1>
          <p className="text-sm md:text-xl text-blue-100/80 font-medium">Your curated adventures.</p>
        </main>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-6 pb-20 -mt-8 md:-mt-12 relative z-20">
        <div className="flex flex-col xl:flex-row gap-6 md:gap-10">

          <div className="flex-3 w-full">
            {!isMounted || isLoading ? (
              <div className="space-y-4 animate-pulse">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-white/50 h-48 rounded-3xl" />
                ))}
              </div>
            ) : safeCart.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-3xl md:rounded-4xl p-12 md:p-24 text-center border border-slate-100 shadow-xl"
              >
                <div className="w-16 h-16 md:w-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FontAwesomeIcon icon={faBagShopping} className="text-slate-900 text-2xl" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold mb-4">Your bag is empty.</h2>
                <Link href="/pages/tours" className="bg-slate-600 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-900 transition-all inline-block">
                  Explore Tours
                </Link>
              </motion.div>
            ) : (
              <div className="space-y-4 md:space-y-6">
                <AnimatePresence>
                  {safeCart.map((item: any, index: number) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      key={item.cart_id || index} 
                      className="group bg-white border border-slate-100 rounded-3xl p-4 md:p-6 hover:shadow-lg transition-all duration-500"
                    >
                      <div className="flex flex-col sm:flex-row gap-4 md:gap-8">
                        <div className="relative w-full sm:w-48 md:w-64 h-44 sm:h-36 md:h-44 rounded-[18px] overflow-hidden shrink-0">
                          <img
                            src={item.image_url}
                            alt={item.location}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="text-lg md:text-2xl font-bold text-[#0A1F3E]">{item.location}</h3>
                              <p className="text-lg md:text-2xl font-bold text-slate-900">${Number(item.price).toLocaleString()}</p>
                            </div>
                            <p className="text-gray-400 text-[10px] md:text-xs font-black uppercase tracking-widest mb-3">Premium Experience</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-500 text-[11px] md:text-sm font-medium border-t border-slate-50 pt-3">
                              <span className="flex items-center gap-2"><FontAwesomeIcon icon={faCalendarDays} className="text-blue-200" /> 12-Day Tour</span>
                              <span className="flex items-center gap-2"><FontAwesomeIcon icon={faBagShopping} className="text-blue-200" /> Free Cancellation</span>
                            </div>
                          </div>

                          <div className="mt-4 flex justify-between items-center pt-3 border-t border-slate-50">
                            <button
                              onClick={() => removeFromCart(item.cart_id)}
                              className="cursor-pointer text-red-500 hover:text-red-700 transition-colors text-[11px] md:text-xs font-bold flex items-center gap-2 uppercase tracking-wide"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                              Remove
                            </button>
                            <span className="text-[10px] md:text-xs text-slate-400 font-semibold px-3 py-1 bg-slate-50 rounded-full italic">Verified Tour</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {isMounted && safeCart.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full xl:w-95 xl:sticky xl:top-24"
            >
              <div className="bg-white rounded-3xl md:rounded-4xl p-6 md:p-10 shadow-xl border border-slate-100 overflow-hidden">
                <AnimatePresence mode="wait">
                  {!isCheckingOut ? (
                    <motion.div
                      key="summary"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-10 text-[#0A1F3E]">Order Summary</h2>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm md:text-base font-medium text-slate-600">
                          <span>Subtotal</span>
                          <span className="text-[#0A1F3E] font-bold">${subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm md:text-base font-medium text-slate-600">
                          <span>Service Fee</span>
                          <span className="text-[#0A1F3E] font-bold">$0.00</span>
                        </div>
                        <div className="h-px bg-slate-100 my-4 md:my-6"></div>
                        <div className="flex justify-between text-xl md:text-3xl font-extrabold tracking-tight">
                          <span>Total.</span>
                          <span className="text-[#1264E2]">${subtotal.toLocaleString()}</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => setIsCheckingOut(true)}
                        className="w-full bg-slate-700 cursor-pointer text-white py-4 md:py-6 rounded-2xl font-bold mt-8 md:mt-10 hover:bg-slate-900 transition-all text-sm md:text-lg shadow-lg active:scale-[0.98]"
                      >
                        <FontAwesomeIcon icon={faPlaneDeparture} className="mr-2" />
                        Continue to Booking
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="checkout"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <button 
                        onClick={() => setIsCheckingOut(false)}
                        className="mb-6 text-slate-400 hover:text-slate-900 text-xs font-bold uppercase flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} /> Back
                      </button>
                      
                      <h2 className="text-xl md:text-2xl font-bold mb-6 text-[#0A1F3E]">Contact Details</h2>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number *</label>
                          <input 
                            type="text" 
                            required
                            placeholder="+995 5xx xx xx xx"
                            className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl mt-1 focus:ring-2 focus:ring-[#1264E2] outline-none transition-all text-sm font-medium"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Special Notes</label>
                          <textarea 
                            placeholder="Dietary needs or special requests..."
                            className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl mt-1 focus:ring-2 focus:ring-[#1264E2] outline-none transition-all h-28 text-sm font-medium resize-none"
                            value={formData.notes}
                            onChange={(e) => setFormData({...formData, notes: e.target.value})}
                          />
                        </div>
                      </div>

                      <button 
                        onClick={handleCheckout}
                        className="w-full bg-slate-700 cursor-pointer text-white py-4 md:py-6 rounded-2xl font-bold mt-8 hover:bg-slate-900 transition-all text-sm md:text-lg shadow-lg active:scale-[0.98]"
                      >
                        Confirm & Book Now
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}