"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useAuth } from "@/context/authContext";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';

interface CartItem {
  id: number;
  location: string;
  price: number;
  image_url: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (tour: any) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  clearCart: () => void;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

  const getAuthToken = () => Cookies.get('token') || localStorage.getItem("token");

  useEffect(() => {
    const fetchCart = async () => {
      if (!user) {
        setCart([]);
        setIsLoading(false);
        return;
      }
      try {
        const token = getAuthToken();
        if (!token) return;

        const res = await fetch(`${apiUrl}/cart`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (res.status === 401 || res.status === 403) {
          setCart([]);
          return;
        }

        const data = await res.json();
        setCart(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Cart fetch error:", err);
        setCart([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCart();
  }, [user, apiUrl]);

  const addToCart = async (tour: any) => {
    if (!user) {
      toast.error("Please login to book!", {
        style: { borderRadius: '20px', background: '#0A1F3E', color: '#fff', fontSize: '14px', fontWeight: 'bold' }
      });
      return;
    }

    const loadingToast = toast.loading("Reserving your spot...", {
      style: { borderRadius: '20px', background: '#fff', color: '#0A1F3E', fontWeight: 'bold' }
    });

    try {
      const token = getAuthToken();
      const res = await fetch(`${apiUrl}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          tour_id: tour.id,
          tour_category: tour.category || 'tours'
        }),
      });

      const result = await res.json();

      if (res.ok) {
        const itemToAdd = {
          ...tour,
          cart_id: result.cart_id || result.id, 
          location: tour.location || tour.title || "Travel Destination",
          price: tour.price,
          image_url: tour.image_url
        };

        setCart((prev) => [...prev, itemToAdd]);

        toast.success(`${itemToAdd.location} is in your bag!`, {
          id: loadingToast,
          icon: '✈️',
          style: {
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.9)',
            color: '#1264E2',
            fontWeight: '800',
          },
        });
      } else {
        toast.error(result.message || "Error", {
          id: loadingToast,
          style: { borderRadius: '20px', background: '#0A1F3E', color: '#fff' }
        });
      }
    } catch (err) {
      toast.error("Connection failed", { id: loadingToast });
    }
  };

  const clearCart = () => {
    setCart([]);
  };

 const removeFromCart = async (cartId: number) => {
  if (!cartId) {
    console.error("Cart ID is missing! Received:", cartId);
    return;
  }

  const previousCart = [...cart];

  setCart((prev) => prev.filter((item: any) => item.cart_id !== cartId));

  try {
    const token = getAuthToken();
    const res = await fetch(`${apiUrl}/cart/${cartId}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (!res.ok) {
      setCart(previousCart); 
      toast.error("Could not remove item");
    } else {
      toast("Removed from itinerary", { icon: '🗑️' });
    }
  } catch (err) {
    setCart(previousCart);
    toast.error("Connection failed");
  }
};

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isLoading, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};