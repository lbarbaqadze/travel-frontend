'use client'
import { useEffect, useState } from 'react';
import { privateFetch } from "@/lib/api";


export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await privateFetch(`${apiUrl}/admin/users`);
                const data = await res.json();
                setUsers(data);
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchUsers();
    }, [apiUrl]);

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to remove this user?")) return;
        try {
            const res = await privateFetch(`${apiUrl}/admin/users/${id}`, { method: 'DELETE' });
            if (res.ok) setUsers(users.filter((u: any) => u.id !== id));
        } catch (err) { console.error(err); }
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">
                Registered <span className="text-slate-400">Users</span>
            </h1>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden text-slate-900">
                {loading ? (
                    <div className="p-20 text-center italic text-slate-400 animate-pulse font-medium">Loading user database...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                                    <th className="p-8">User Details</th>
                                    <th className="p-8">Joined Date</th>
                                    <th className="p-8 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 font-medium">
                                {users.map((user: any) => (
                                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="p-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 font-black text-xs border border-purple-100 uppercase">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900">{user.name}</p>
                                                    <p className="text-xs text-slate-400">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-8 text-sm text-slate-500 italic font-light">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="p-8 text-right">
                                            <button 
                                                onClick={() => handleDelete(user.id)}
                                                className="cursor-pointer text-[10px] font-bold text-slate-300 hover:text-red-500 uppercase tracking-widest transition-colors"
                                            >
                                                Remove User
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {!loading && users.length === 0 && (
                    <div className="p-20 text-center text-slate-400 italic font-light">No users found.</div>
                )}
            </div>
        </div>
    );
}