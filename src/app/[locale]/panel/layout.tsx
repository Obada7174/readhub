'use client';

import Sidebar from '@/components/panel/sidebar';
import Header from '@/components/panel/header';
import { useEffect, useState } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { useLocale } from 'next-intl';
import { UserProvider } from '@/context/userContext';

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const large = window.innerWidth >= 768;
      setIsLargeScreen(large);
      setIsMobile(!large);
      if (large) setIsSidebarOpen(true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let contentMarginClass = 'm-0';
  if (isLargeScreen) {
    if (isSidebarOpen) {
      contentMarginClass = isRTL ? 'mr-48' : 'ml-48';
    } else {
      contentMarginClass = isRTL ? 'mr-20' : 'ml-20';
    }
  }

  return (
    <UserProvider>

      <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          languageSwitcher={isMobile ? <LanguageSwitcher /> : undefined}
          themeSwitcher={isMobile ? <ThemeSwitcher /> : undefined}
        />
        <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

        <main className={`flex-1 p-6 overflow-auto transition-all duration-300 ${contentMarginClass}`}>
          {children}
        </main>

        {isSidebarOpen && !isLargeScreen && (
          <div
            className="fixed inset-0 bg-gray-100 dark:bg-gray-800 bg-opacity-50 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </UserProvider>
  );
}
