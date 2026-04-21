'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/authContext";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function ChangePasswordPage() {
  const { user, loading: authLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/pages/login");
    }
  }, [user, authLoading]);

  const handleRequestCode = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });
      if (res.ok) {
        setStep(2);
        toast.success("Verification code sent to your email!");
      } else {
        toast.error("Error sending code");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user?.email, code, newPassword }),
      });
      if (res.ok) {
        toast.success("Password updated successfully!");
        setStep(1); 
        router.push("/");
      } else {
        toast.error("Invalid code, please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      <Navbar />
      <main className="grow flex items-center justify-center px-6 py-20">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-neutral-100">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">
            {step === 1 ? "Security Verification" : "Create New Password"}
          </h2>
          <p className="text-center text-slate-500 text-sm mb-8">
            {step === 1 
              ? `We'll send a code to ${user?.email} to verify it's you.` 
              : "Enter the code and your new strong password."}
          </p>

          {step === 1 ? (
            <button 
              onClick={handleRequestCode}
              disabled={loading}
              className="cursor-pointer w-full h-13 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold transition-all active:scale-[0.98]"
            >
              {loading ? "Sending..." : "Send Verification Code"}
            </button>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div className="space-y-1">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Verification Code</label>
                <input
                  type="text"
                  placeholder="6-digit code"
                  className="w-full h-13 bg-[#F4F4F4]/50 border border-transparent rounded-2xl px-5 outline-none focus:bg-white focus:border-neutral-200 transition-all"
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full h-13 bg-[#F4F4F4]/50 border border-transparent rounded-2xl px-5 outline-none focus:bg-white focus:border-neutral-200 transition-all"
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-300 hover:text-black transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  </button>
                </div>
              </div>

              <button disabled={loading} className="w-full h-13 bg-slate-900 cursor-pointer hover:bg-slate-800 text-white rounded-2xl font-bold transition-all active:scale-[0.98] mt-2">
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}