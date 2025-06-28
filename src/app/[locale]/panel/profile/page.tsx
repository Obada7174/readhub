'use client';

import React from "react";
import { useRouter } from "next/navigation";
import {
  MdModeEditOutline,
  MdOutlineAlternateEmail,
  MdJoinRight,
  MdVerifiedUser,
} from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { BiUserCheck } from "react-icons/bi";
import { useUser } from "@/hooks/userContext";
import { useTranslations } from "next-intl";

export default function UserProfilePage() {
  const router = useRouter();
  const { user } = useUser();
  const t = useTranslations("Panel.UserProfile");

  if (!user) {
    return (
      <div className="text-center p-10 text-gray-500 dark:text-gray-400">
        {t("loading")}
      </div>
    );
  }

  const baseURL = "http://localhost:5000";
  const imageUrl = user.img
    ? user.img.startsWith("http")
      ? user.img
      : user.img.startsWith("/")
      ? baseURL + user.img
      : baseURL + "/" + user.img
    : null;

  const goToEditProfile = () => {
    router.push("profile/edit");
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 md:p-12 mt-14">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10 flex items-center gap-3">
        <FaUserCircle className="text-[#36419B]" size={32} />
        {t("accountInfo")}
      </h1>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
        <div className="flex flex-col items-center w-full md:w-1/3">
          <div className="w-40 h-40 rounded-full border-4 border-[#36419B] shadow-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center transition-transform hover:scale-105 duration-300">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={`${user.first_name} ${user.last_name}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-gray-400 dark:text-gray-300" size={96} />
            )}
          </div>
          <h2 className="text-2xl font-semibold mt-6 text-gray-900 dark:text-white text-center">
            {user.first_name} {user.last_name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 capitalize text-center">
            {user.role ?? ""}
          </p>
          <button
            onClick={goToEditProfile}
            className="mt-8 inline-flex items-center gap-2 px-6 py-2 bg-[#36419B] text-white rounded-full shadow-lg hover:bg-[#36419B] focus:outline-none focus:ring-2 focus:ring-[#36419B] transition"
          >
            <MdModeEditOutline size={20} />
            {t("editProfile")}
          </button>
        </div>

        <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InfoItem label={t("email")} icon={<MdOutlineAlternateEmail />} value={user.email ?? ""} />
          <InfoItem label={t("location")} icon={<IoLocation />} value={user.location ?? t("notSet")} />
          <InfoItem label={t("role")} icon={<BiUserCheck />} value={user.role ?? ""} />
          <InfoItem label={t("joinedAt")} icon={<MdJoinRight />} value={new Date(user.created_at).toLocaleDateString()} />
          <InfoItem
            label={t("lastLogin")}
            icon={<MdVerifiedUser />}
            value={
              user.last_login_at
                ? new Date(user.last_login_at).toLocaleString()
                : t("unknown")
            }
          />
          <InfoItem
            label={t("lastUpdated")}
            icon={<MdModeEditOutline />}
            value={
              user.updated_at
                ? new Date(user.updated_at).toLocaleString()
                : t("notUpdatedYet")
            }
          />
          <InfoItem
            label={t("verified")}
            icon={
              <MdVerifiedUser className={`text-${user.isVerified ? "green" : "red"}-500`} />
            }
            value={user.isVerified ? t("yes") : t("no")}
          />
          <InfoItem
            label={t("subscribed")}
            icon={
              <MdOutlineAlternateEmail className={`text-${user.isSubscribed ? "green" : "red"}-500`} />
            }
            value={user.isSubscribed ? t("yes") : t("no")}
          />
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 flex items-start gap-4 min-w-0">
      <div className="text-[#36419B] text-2xl flex-shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1 truncate">{label}</p>
        <p className="text-base font-medium text-gray-900 dark:text-white break-words overflow-auto max-w-full whitespace-pre-wrap">{value}</p>
      </div>
    </div>
  );
}
