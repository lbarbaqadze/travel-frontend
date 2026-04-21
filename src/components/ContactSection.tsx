'use client'
import { error } from "console";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ContactSection() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (!name || !email || !subject || !message) {
      return toast.error("Please fill in all fields");
    }

    const formData = { name, email, subject, message }
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    setIsLoading(true);
    const loadingToast = toast.loading("Sending message...");

    try {
      const res = await fetch(`${apiUrl}/contact/send-message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        toast.success("Message sent! We'll get back to you soon.", { id: loadingToast });
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      }
    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">

        <div className="lg:col-span-5 space-y-6">
          <div className="p-10 bg-blue-50 rounded-[3rem] space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Email us</p>
            <h3 className="text-2xl font-bold">travelagency@gmail.com</h3>
          </div>

          <div className="p-10 bg-purple-50 rounded-[3rem] space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400">Call us</p>
            <h3 className="text-2xl font-bold">+995 555 555 555</h3>
          </div>

          <div className="p-10 bg-orange-50 rounded-[3rem] space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">Visit us</p>
            <h3 className="text-2xl font-bold">Tbilisi, Georgia <br /> Abashidze St.</h3>
          </div>
        </div>

        <div className="lg:col-span-7 bg-neutral-50 p-12 rounded-[4rem]">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <input value={name} onChange={(e) => setName(e.target.value)}
                type="text" placeholder="Full Name" className="bg-transparent border-b-2 border-neutral-200 py-4 focus:border-slate-500 outline-none transition-all font-medium" />
              <input value={email} onChange={(e) => setEmail(e.target.value)}
                type="email" placeholder="Email Address" className="bg-transparent border-b-2 border-neutral-200 py-4 focus:border-slate-500 outline-none transition-all font-medium" />
            </div>
            <input value={subject} onChange={(e) => setSubject(e.target.value)}
              type="text" placeholder="Subject" className="w-full bg-transparent border-b-2 border-neutral-200 py-4 focus:border-slate-500 outline-none transition-all font-medium" />
            <textarea value={message} onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message" rows={4} className="w-full bg-transparent border-b-2 border-neutral-200 py-4 focus:border-slate-500 outline-none transition-all font-medium resize-none"></textarea>

            <button
              disabled={isLoading}
              className={`bg-slate-700 text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-sm transition-all shadow-lg shadow-slate-500 
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-800 cursor-pointer'}`}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}