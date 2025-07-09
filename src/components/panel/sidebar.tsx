'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { Dispatch, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';
import { sidebarLinks } from '@/assets/files/json';
import { LuMenu, LuX } from 'react-icons/lu';
import Cookies from "js-cookie";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email?: string;
  location?: string;
  last_login_at?: string;
  isVerified?: boolean;
  isSubscribed?: boolean;
  updated_at?: string;
  created_at?: string;
  [key: string]: any; // تبقى للسماح بأي خصائص أخرى غير معرفة
}

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  languageSwitcher?: React.ReactNode;
  themeSwitcher?: React.ReactNode;
}

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  languageSwitcher,
  themeSwitcher,
}: SidebarProps) {
  const pathname = usePathname();
  const t = useTranslations('SideBar');
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    // تأكد أن الكوكي موجودة فعلاً قبل التحقق
    const userCookie = Cookies.get("user");
  
    if (typeof userCookie !== "string") {
      return; // لا تطبع شيء إذا لم يكن الكوكي موجود
    }
  
    try {
      const parsed: User = JSON.parse(userCookie);
      console.log("✅ User loaded from cookies:", parsed);
      setUser(parsed);
    } catch (err) {
      console.error("❌ Failed to parse user from cookies:", err);
      setUser(null);
    }
  }, []);
  

  const getInitials = (firstName: string, lastName: string) => {
    const first = firstName?.[0]?.toUpperCase() || '';
    const last = lastName?.[0]?.toUpperCase() || '';
    return `${first}${last}`;
  };

  return (
    <aside
      className={`${
        isSidebarOpen ? 'w-60' : 'w-0 md:w-14'
      } bg-white dark:bg-gray-900 shadow-md transition-all duration-300 ease-in-out h-screen fixed top-0 left-0 z-40 md:relative overflow-hidden border-r`}
    >
      {/* Toggle Button */}
      <div className="p-4 flex justify-end">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          {isSidebarOpen ? <LuX size={20} /> : <LuMenu size={20} />}
        </button>
      </div>

      {/* User Info */}
      {isSidebarOpen && user && (
        <div className="flex flex-col items-center py-6">
          <div className="w-16 h-16 rounded-full bg-[#36419B]  text-white flex items-center justify-center text-xl font-bold">
            {getInitials(user.first_name, user.last_name)}
          </div>
          <span className="mt-2 font-semibold text-gray-800 dark:text-white">
            {user.first_name} {user.last_name}
          </span>
        </div>
      )}

      {/* Sidebar Links */}
      <nav className="mt-4 px-2 space-y-1">
        {sidebarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
              ${pathname === link.href
                ? 'bg-gray-200 dark:bg-gray-700 text-[#36419B] '
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}
              ${!isSidebarOpen ? 'justify-center' : ''}`}
          >
            <span className="text-lg text-[#36419B] ">{link.icon}</span>
            {isSidebarOpen && <span>{t(link.label)}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      {(isSidebarOpen || languageSwitcher || themeSwitcher) && (
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <div className="flex items-center justify-between">
            {languageSwitcher && <div>{languageSwitcher}</div>}
            {themeSwitcher && <div>{themeSwitcher}</div>}
          </div>
        </div>
      )}
    </aside>
  );
}
