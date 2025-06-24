import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

interface User {
  id: number;
  name: string;
  email: string;
  [key: string]: any;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = Cookies.get("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const token = parsed.token;

        fetch(`http://localhost:5000/users/${parsed.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((fullUser) => {
            setUser(fullUser);

            if (process.env.NODE_ENV === "development") {
              console.log("✅ Full user loaded:", fullUser);
            }
          })
          .catch((err) => {
            console.error("❌ Failed to load full user data", err);
          });
      } catch {
        setUser(null);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
