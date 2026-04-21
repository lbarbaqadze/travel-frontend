'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAvianex } from '@fortawesome/free-brands-svg-icons'
import { useCart } from "@/context/cartContext";
import {
  faCartShopping,
  faBars, faXmark, faHouse,
  faInfoCircle, faGear, faUserPlus, faRightToBracket,
  faUser, faKey, faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/context/authContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); 
  const pathname = usePathname();
  const { user, logout, loading } = useAuth(); 
  const { cart } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '/', icon: faHouse },
    { name: 'Tours', href: '/pages/tours', icon: faAvianex },
    { name: 'About', href: '/pages/about', icon: faInfoCircle },
    { name: 'Contact', href: '/pages/contact', icon: faGear },
  ];

  return (
    <header className="w-full bg-white border-b border-slate-100 h-16 z-50 font-sans">
      <div className="w-full h-full px-6 md:px-16 flex items-center justify-between">
        
        <div className="flex items-center gap-10">
          <Link href="/" className="text-2xl font-bold text-slate-900 tracking-tight shrink-0">
            TravelAgency
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[15px] font-bold transition-colors ${
                  pathname === link.href ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-3">
            {!loading && ( 
              user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-3 px-3 py-1.5 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-slate-100"
                  >
                    <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-black">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-[14px] font-bold text-slate-700">
                      {user.name}
                    </span>
                    <FontAwesomeIcon icon={faChevronDown} className={`text-[10px] text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-52 bg-white border border-slate-100 rounded-2xl shadow-xl py-2 z-60"
                      >
                        <div className="px-4 py-2 border-b border-slate-50 mb-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Account</p>
                          <p className="text-[13px] font-bold text-slate-900 truncate">{user.email}</p>
                        </div>

                        <Link 
                          href="/pages/profile" 
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors font-bold"
                        >
                          <FontAwesomeIcon icon={faUser} className="w-4 text-slate-400" />
                          My Profile
                        </Link>

                        <Link 
                          href="/pages/change-password" 
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors font-bold"
                        >
                          <FontAwesomeIcon icon={faKey} className="w-4 text-slate-400" />
                          Security
                        </Link>

                        <div className="border-t border-slate-50 mt-1 pt-1">
                          <button
                            onClick={() => { logout(); setIsProfileOpen(false); }}
                            className="cursor-pointer w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors font-bold"
                          >
                            <FontAwesomeIcon icon={faRightToBracket} className="w-4" />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link href="/pages/login" className="text-[14px] font-bold text-slate-600 px-5 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                    Login
                  </Link>
                  <Link href="/pages/register" className="px-5 py-2.5 text-[14px] font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-all shadow-sm">
                    Sign Up
                  </Link>
                </>
              )
            )}
          </div>

          <Link
            href={"/pages/cart"}
            className="relative cursor-pointer flex items-center justify-center w-10 h-10 text-slate-500 hover:bg-slate-100 rounded-xl transition-all"
          >
            <FontAwesomeIcon icon={faCartShopping} className="text-sm" />
            {cart.length > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                {cart.length}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-slate-900 hover:bg-slate-50 rounded-xl"
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-100"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-72 bg-white z-110 shadow-2xl flex flex-col border-l border-slate-100"
            >
              <div className="h-16 px-6 flex items-center justify-between border-b border-slate-50">
                <span className="font-bold text-slate-900">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="w-9 h-9 flex items-center justify-center bg-slate-50 text-slate-400 rounded-lg hover:text-slate-900">
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              <div className="grow p-4 flex flex-col gap-1 overflow-y-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold transition-all ${
                      pathname === link.href ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <FontAwesomeIcon icon={link.icon} className="text-sm w-5" />
                    <span className="text-[15px]">{link.name}</span>
                  </Link>
                ))}

                <div className="mt-auto pt-6 border-t border-slate-100 space-y-2">
                  {!loading && ( 
                    user ? (
                      <>
                        <div className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Logged in as {user.name}
                        </div>
                        <Link 
                          href="/pages/profile" 
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold text-slate-600 hover:bg-slate-50"
                        >
                          <FontAwesomeIcon icon={faUser} className="w-5" />
                          Profile Settings
                        </Link>
                        <button
                          onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                          className="cursor-pointer w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold text-red-500 hover:bg-red-50"
                        >
                          <FontAwesomeIcon icon={faRightToBracket} className="w-5" />
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link href="/pages/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold text-slate-600 hover:bg-slate-50 border border-transparent">
                          <FontAwesomeIcon icon={faRightToBracket} className="w-5" />
                          <span>Login</span>
                        </Link>
                        <Link href="/pages/register" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold text-white bg-slate-900">
                          <FontAwesomeIcon icon={faUserPlus} className="w-5" />
                          <span>Sign Up</span>
                        </Link>
                      </>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}