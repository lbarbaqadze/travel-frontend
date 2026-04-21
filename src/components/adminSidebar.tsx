'use client'
import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faListCheck, faComment, faUser } from '@fortawesome/free-solid-svg-icons';

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [color, setColor] = useState<number>(1)

  const menuItems = [
    { id: 1, name: 'Dashboard', href: '/admin', icon: faChartSimple },
    { id: 2, name: 'Manage Tours', href: '/admin/tours', icon: faListCheck },
    { id: 3, name: 'Messages', href: '/admin/messages', icon: faComment },
    { id: 4, name: 'Users', href: '/admin/users', icon: faUser },
  ];

  const handleColor = (id: number) => {
    setColor(id)
  }

  return (
    <>
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-100 z-100 flex items-center justify-between px-4">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 bg-slate-900 text-white rounded-xl shadow-lg"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
        </button>
        <h1 className="mr-4 text-xl font-black italic tracking-tighter text-slate-900">
          Admin Panel
        </h1>
      </div>

      <aside className={`
        fixed inset-y-0 left-0 z-110 w-72 bg-[#0F172A] text-white p-8 transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>

        <div className="mb-10">
          <h2 className="text-2xl font-black italic tracking-tighter">Admin</h2>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1 font-bold">Travel Agency v1.0</p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => { setIsOpen(false); handleColor(item.id) }}
              className={`${color === item.id ? "bg-white/9" : "text-transparent"}
                flex items-center gap-4 p-4 rounded-2xl transition-all group`}

            >
              <FontAwesomeIcon
                icon={item.icon}
                className={`w-5 h-5 transition-colors ${color === item.id ? "text-slate-100" : "text-slate-500 group-hover:text-white"}`}
              />
              <span className="font-medium text-slate-300 group-hover:text-white">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-8 left-8">
          <Link href="/" className="text-sm text-slate-500 hover:text-white transition-all flex items-center gap-2">
            <span>←</span> Exit to Website
          </Link>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-105 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}