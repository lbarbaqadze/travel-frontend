'use client'
import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession()

    const router = useRouter()

    useEffect(() => {
        const checkAuth = async () => {
            if (status === "loading") return;

            if (session) {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google-sync`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: session.user.email,
                            name: session.user.name,
                            image: session.user.image
                        })
                    });

                    const data = await res.json();

                    if (res.ok) {
                        setUser(data.user);
                        setToken(data.token); 
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("user", JSON.stringify(data.user));
                    }
                } catch (err) {
                    console.error("Google Sync Error:", err);
                }
            } else {
                const savedToken = localStorage.getItem("token");
                const savedUser = localStorage.getItem("user");

                if (savedToken && savedUser) {
                    setToken(savedToken);
                    setUser(JSON.parse(savedUser));
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, [session, status]);

    const login = (userData, userToken) => {
        localStorage.setItem("token", userToken);
        localStorage.setItem("user", JSON.stringify(userData));

        document.cookie = `userRole=${userData.role}; path=/; max-age=604800`;
        document.cookie = `token=${userToken}; path=/; max-age=604800`;

        setToken(userToken);
        setUser(userData);
        setLoading(false);
    };

    const logout = async () => {
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
        setToken(null);

        await signOut({ redirect: false });
        router.push("/pages/login");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)