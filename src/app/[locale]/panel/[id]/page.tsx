"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";

export default function UserPanelPage() {
  const t = useTranslations("Panel.UserPanel");
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
        🚫 {t("notAllowed")}
      </div>
    );
  }

  if (!user) {
    return <div className="p-10 text-center">{t("loading")}</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">
        👤 {t("welcome", { name: user.name })}
      </h1>
      <p className="text-gray-700">{t("description")}</p>
    </div>
  );
}
