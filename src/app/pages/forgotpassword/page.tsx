"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter();

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStep(2);
      } else {
        toast.error("User not found");
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
        body: JSON.stringify({ email, code, newPassword }),
      });
      if (res.ok) {
        toast.success("Password changed successfully!");
        router.push("/pages/login");
      } else {
        toast.error("Error, check the code");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold text-center mb-6">
          {step === 1 ? "Password recovery" : "Set a new password"}
        </h2>

        {step === 1 ? (
          <form onSubmit={handleRequestCode} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email."
              className="w-full h-13 bg-gray-100 rounded-2xl px-5 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button disabled={loading} className="cursor-pointer w-full h-13 bg-slate-700 hover:bg-slate-900 text-white rounded-2xl font-bold
            transition-all duration-200">
              {loading ? "Sending..." : "Send code"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <p className="text-sm text-gray-500 text-center">Code sent: {email}</p>
            <input
              type="text"
              placeholder="6-digit code"
              className="w-full h-13 bg-gray-100 rounded-2xl px-5 outline-none"
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full h-13 bg-gray-100 rounded-2xl px-5 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-300 hover:text-black transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </button>
            </div>
            <button disabled={loading} className="w-full h-13 bg-slate-700 cursor-pointer hover:bg-slate-900
            transition-all duration-200 text-white rounded-2xl font-bold">
              {loading ? "Changing..." : "Password update"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}