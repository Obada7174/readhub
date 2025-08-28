'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";

interface User {
  id: number;
  token: string;
  name?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  img?: string;
  role?: string;
  location?: string;
  created_at?: string;
  updated_at?: string;
  last_login_at?: string;
  isVerified?: boolean;
  isSubscribed?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = () => {
    const stored = Cookies.get("user");
    if (stored) {
      try {
        const parsed: User = JSON.parse(stored);
        if (!parsed.id || !parsed.token) {
          Cookies.remove("user");
          setUser(null);
          setLoading(false);
          return;
        }
        setUser(parsed);
      } catch {
        Cookies.remove("user");
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
    const onStorage = (e: StorageEvent) => {
      if (e.key === "auth_event") {
        loadUser();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  useEffect(() => {
    if (user) {
      Cookies.set("user", JSON.stringify(user), { expires: 7 }); // تحفظ لمدة 7 أيام
    } else {
      Cookies.remove("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUserContext must be used within UserProvider");
  return ctx;
};

export const useUser = () => {
  const { user, setUser, loading } = useUserContext();
  return { user, setUser, loading };
};
