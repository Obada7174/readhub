"use client";

import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Image from 'next/image';
import Link from 'next/link';
import readhub from '@/assets/images/readhub-logo.svg';
import readhubdarkmode from "@/assets/images/readhub-darkmode.svg";

interface HeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export default function Header({ isSidebarOpen, setIsSidebarOpen }: HeaderProps) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const t = useTranslations();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <header className="border-b border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm py-2 px-4 sm:px-6 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-200"
            >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          <Link href="/" className="flex items-center gap-2">
            {mounted && (
              <Image
                src={theme === 'dark' ? readhubdarkmode : readhub}
                alt="readhub logo"
                width={40}
              />
            )}
            <h1 className="font-funnel-display text-base sm:text-lg text-gray-800 dark:text-white whitespace-nowrap">
              <span className='font-light'>read</span><strong>hub</strong>
            </h1>
          </Link>
        </div>

        {!isMobile && (
          <div className="flex items-center space-x-9 space-x-reverse">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        )}
      </div>
    </header>
  );
}