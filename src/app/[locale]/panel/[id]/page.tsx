// "use client";

// import { useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { useTranslations } from "next-intl";
// import { useUser } from "@/context/userContext";

// export default function UserPanelPage() {
//   const t = useTranslations("Panel.UserPanel");
//   const params = useParams();
//   const router = useRouter();
//   const { user } = useUser();
//   const userId = params?.id?.toString();

//   useEffect(() => {
//     if (!user) return;
//     if (user?.id?.toString() !== userId) {
//       router.push("/login");
//     }
//   }, [user, userId]);

//   if (!user || user?.id?.toString() !== userId) {
//     return <div className="p-10 text-center">{t("loading")}</div>;
//   }

//   return (
//     <div className="p-10">
//       <h1 className="text-2xl font-bold mb-4">
        
//       </h1>
//       <p className="text-gray-700">{t("description")}</p>
//     </div>
//   );
// }
