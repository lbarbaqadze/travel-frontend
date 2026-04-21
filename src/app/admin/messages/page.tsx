'use client'
import { useEffect, useState } from 'react';
import { privateFetch } from "@/lib/api";

export default function MessagesPage() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMessages = async () => {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL
            try {
                const res = await privateFetch(`${apiUrl}/admin/messages`);
                const data = await res.json();
                setMessages(data);
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchMessages();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this message?")) return;
        const apiUrl = process.env.NEXT_PUBLIC_API_URL
        try {
            const res = await privateFetch(`${apiUrl}/admin/messages/${id}`, { method: 'DELETE' });
            if (res.ok) setMessages(messages.filter((m: any) => m.id !== id));
        } catch (err) { console.error(err); }
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">
                Inbox <span className="text-slate-400">Messages</span>
            </h1>

            {loading ? (
                <p className="italic text-slate-400">Loading inbox...</p>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {messages.map((msg: any) => (
                        <div key={msg.id} className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-black text-slate-900 text-lg">{msg.sender_name}</h3>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{msg.sender_email}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-slate-300 uppercase italic">
                                        {new Date(msg.created_at).toLocaleDateString()}
                                    </p>
                                    <button 
                                        onClick={() => handleDelete(msg.id)}
                                        className="cursor-pointer text-[10px] font-bold text-red-400 transition-all uppercase mt-2"
                                    >
                                        Delete Forever
                                    </button>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-2xl">
                                <p className="text-sm font-bold text-slate-400 uppercase text-[10px] mb-1">Subject: {msg.subject}</p>
                                <p className="text-slate-600 leading-relaxed font-medium">{msg.message}</p>
                            </div>
                        </div>
                    ))}
                    {messages.length === 0 && <p className="text-slate-400 italic">Your inbox is empty.</p>}
                </div>
            )}
        </div>
    );
}