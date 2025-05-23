'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, Dispatch, SetStateAction } from 'react';
import { LuUser, LuBookOpen, LuStar, LuBook, LuFileText, LuMessageSquare, LuTrophy, LuSettings, LuBell } from 'react-icons/lu';
import { IoHome } from "react-icons/io5";
import { useTranslations } from 'next-intl'; 

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
  const locale = pathname.split('/')[1];

  const sidebarLinks = [
    { href: `/${locale}/panel`, label: t('Home'), icon: <IoHome size={20} /> },
    { href: `/${locale}/panel/profile`, label: t('Profile'), icon: <LuUser size={20} /> },
    { href: `/${locale}/panel/library`, label: t('Library'), icon: <LuBookOpen size={20} /> },
    { href: `/${locale}/panel/favorites`, label: t('Favorites'), icon: <LuStar size={20} /> },
    { href: `/${locale}/panel/my-book`, label: t('My Books'), icon: <LuBook size={20} /> },
    { href: `/${locale}/panel/pdf-reader`, label: t('Pdf Reader'), icon: <LuFileText size={20} /> },
    { href: `/${locale}/panel/comments`, label: t('Comments'), icon: <LuMessageSquare size={20} /> },
    { href: `/${locale}/panel/competitions`, label: t('Competitions'), icon: <LuTrophy size={20} /> },
    { href: `/${locale}/panel/settings`, label: t('Settings'), icon: <LuSettings size={20} /> },
    { href: `/${locale}/panel/notifications`, label: t('Notifications'), icon: <LuBell size={20} /> },
  ];

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
          {isSidebarOpen ? '←' : '→'}
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
            {isSidebarOpen && <span>{link.label}</span>}
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