'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useUser } from "@/context/userContext";

export default function UserPanelPage() {
  const t = useTranslations("Panel.UserPanel");
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user]);

  if (loading) {
    return <div className="p-10 text-center">{t("loading")}</div>;
  }

  if (!user) {
    // ممكن تضيف صفحة خطأ هنا أو null لأن التوجيه شغال
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
