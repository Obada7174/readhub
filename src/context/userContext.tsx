'use client'
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

interface User {
  id: number;
  token: string;
  name?: string;
  email?: string;
  [key: string]: any;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const loadUser = () => {
    const stored = Cookies.get("user");
    if (stored) {
      try {
        const parsed: User = JSON.parse(stored);
        if (!parsed.id || !parsed.token) {
          Cookies.remove("user");
          setUser(null);
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
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUserContext must be within UserProvider");
  return ctx;
};
