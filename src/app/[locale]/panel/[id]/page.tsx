"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";

export default function UserPanelPage() {
  const params = useParams();
  const userId = params?.id?.toString();

  const [user, setUser] = useState<any>(null);
  const [notAllowed, setNotAllowed] = useState(false);

  useEffect(() => {
    const storedUser = Cookies.get("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        if (parsedUser.id.toString() === userId) {
          setUser(parsedUser);
        } else {
          setNotAllowed(true);
        }
      } catch (err) {
        console.error("Failed to parse user data:", err);
        setNotAllowed(true);
      }
    } else {
      setNotAllowed(true);
    }
  }, [userId]);

  if (notAllowed) {
    return (
      <div className="p-10 text-center text-red-600">
        🚫 You are not allowed to access this page.
      </div>
    );
  }

  if (!user) {
    return <div className="p-10 text-center">Loading data...</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">👤 Welcome, {user.name}</h1>
      <p className="text-gray-700">This is your user panel.</p>
      {/* Add more user-specific components here */}
    </div>
  );
}
