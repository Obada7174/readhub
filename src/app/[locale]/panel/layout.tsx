'use client';

import Sidebar from '@/components/panel/sidebar';
import Header from '@/components/panel/header';
import { useEffect, useState } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import { useLocale } from 'next-intl';

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const large = window.innerWidth >= 768;
      setIsLargeScreen(large);
      setIsMobile(!large);
      setIsSidebarOpen(large);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const contentMargin = isSidebarOpen && isLargeScreen
    ? isRTL ? 'mr-60' : 'ml-60'
    : isRTL ? 'mr-16' : 'ml-16';

  return (
    <>
      <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className="pt-16 flex min-h-screen bg-gray-100 dark:bg-gray-800">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          languageSwitcher={isMobile ? <LanguageSwitcher /> : undefined}
          themeSwitcher={isMobile ? <ThemeSwitcher /> : undefined}
        />

        <main className={`flex-1 p-6 transition-all duration-300 ${contentMargin}`}>
          {children}
        </main>

        {isSidebarOpen && !isLargeScreen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </>
  );
}
