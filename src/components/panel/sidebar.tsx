'use client';
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { Dispatch, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';
import { sidebarLinks } from '@/assets/files/json';
import { LuMenu, LuX } from 'react-icons/lu';
import { useUser } from '@/context/userContext';

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
  const { user } = useUser();

  const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.[0]?.toUpperCase() || '';
    const last = lastName?.[0]?.toUpperCase() || '';
    return `${first}${last}`;
  };

  return (
    <aside
      className={`${
        isSidebarOpen ? 'w-60' : 'w-0 md:w-14'
      } fixed top-16 left-0 h-[calc(100vh-64px)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
        shadow-md transition-all duration-300 ease-in-out overflow-hidden z-40`}
    >
      {/* Toggle Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isSidebarOpen ? <LuX size={20} /> : <LuMenu size={20} />}
        </button>
      </div>

 
{/* User Info */}
{isSidebarOpen && user && (
  <div className="flex flex-col items-center py-4">
    {user.image ? (
      <div className="relative w-16 h-16">
        <Image
          src={user.image}
          alt={`${user.first_name} ${user.last_name}`}
          fill
          className="rounded-full object-cover"
          sizes="64px"
        />
      </div>
    ) : (
      <div className="w-16 h-16 rounded-full bg-[#36419B] text-white flex items-center justify-center text-xl font-bold">
        {getInitials(user.first_name, user.last_name)}
      </div>
    )}

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
                ? 'bg-gray-200 dark:bg-gray-700 text-[#36419B]'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}
              ${!isSidebarOpen ? 'justify-center' : ''}`}
          >
            <span className="text-lg text-[#36419B]">{link.icon}</span>
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
