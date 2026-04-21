"use client"; 

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/context/authContext";
import { CartProvider } from "@/context/cartContext";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster 
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 3500,
              style: {
                background: 'rgba(255, 255, 255, 0.9)',
                color: '#0A1F3E',
                backdropFilter: 'blur(12px)',
                borderRadius: '24px',
                padding: '16px 24px',
                fontSize: '15px',
                fontWeight: '600',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                border: '1px solid rgba(255,255,255,0.5)',
              },
              success: {
                iconTheme: {
                  primary: '#1264E2',
                  secondary: '#fff',
                },
              },
            }}
          />
          {children}
        </CartProvider>
      </AuthProvider>
    </SessionProvider>
  );
}