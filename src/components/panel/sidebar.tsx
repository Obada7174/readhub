'use client';

import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import {  Dispatch, SetStateAction } from 'react';
import { useTranslations } from 'next-intl'; 
import {sidebarLinks} from "@/assets/files/json"
import { LuMenu, LuX } from 'react-icons/lu';

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

  return (
    <aside
      className={`${
        isSidebarOpen ? 'w-64' : 'w-0 md:w-20'
      } bg-white dark:bg-gray-900 shadow-md transition-all duration-300 ease-in-out h-screen fixed top-0 left-0 z-40 md:relative overflow-hidden`}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isSidebarOpen && (
            <span className="text-xl font-bold text-gray-800 dark:text-white">Maram</span>
          )}
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          {isSidebarOpen ? <LuX/> : <LuMenu/>}
        </button>
      </div>

      <nav className="mt-4 px-2">
        {sidebarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${
              pathname === link.href ? 'bg-gray-200 dark:bg-gray-700' : ''
            } ${!isSidebarOpen ? 'justify-center' : ''}`}
          >
            {link.icon}
            {isSidebarOpen && <span>{t(link.label)}</span>}
          </Link>
        ))}

        {!isSidebarOpen && !languageSwitcher && !themeSwitcher ? null : (
          <div className="absolute bottom-4 left-0 right-0 px-4 flex flex-col space-y-3 z-50">
            <div className="flex items-center justify-between">
              {languageSwitcher && <div>{languageSwitcher}</div>}
              {themeSwitcher && <div>{themeSwitcher}</div>}
            </div>
          </div>
        )}
      </nav>
    </aside>
  );
}