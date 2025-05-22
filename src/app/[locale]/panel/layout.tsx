'use client';

import Sidebar from '@/app/[locale]/panel/components/sidebar';
import Header from '@/app/[locale]/panel/components/header';
import { useEffect, useState } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const large = window.innerWidth >= 768;
      setIsLargeScreen(large);
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (large) {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
        {/* Sidebar + Mobile Switchers */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}

          languageSwitcher={isMobile ? <LanguageSwitcher /> : undefined}
          themeSwitcher={isMobile ? <ThemeSwitcher /> : undefined}
        />

        {/* Main Content */}
        <main className={`flex-1 p-6 overflow-auto transition-all duration-300 ${isLargeScreen ? 'ml-64' : 'ml-0'}`}>
          {children}
        </main>

        {isSidebarOpen && !isLargeScreen && (
          <div
            className="fixed inset-0 bg-gray-100 dark:bg-gray-800 bg-opacity-50 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}
      </div>
    </>
  );
}