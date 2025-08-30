'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function UserPanelPage() {
  const t = useTranslations("Panel.UserPanel");
  const router = useRouter();
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">
        👋 {user.name || `${user.first_name} ${user.last_name}`}
      </h1>
      <p className="text-gray-700">{t("description")}</p>
    </div>
  );
}
