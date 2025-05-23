'use client';

import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/navigation';
// import { Dispatch, SetStateAction } from 'react';
import { useTranslations } from 'next-intl';
import { links } from "@/assets/files/json"
import { LuMenu, LuX } from 'react-icons/lu';
import { useEffect, useState } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Logo from '@/components/ui/Logo'

export default function Sidebar() {
    const pathname = usePathname();
    const t = useTranslations('Dashboard.sidebar');
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
        <aside
            className={`${isSidebarOpen ? 'w-[270px]' : 'w-0 md:w-20'
                } bg-gray-50 dark:bg-gray-900 shadow-md transition-all duration-300 ease-in-out h-screen fixed top-0 left-0 z-40 md:relative overflow-hidden`}
        >
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    
                        <Logo/>
                    
                </div>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    {isSidebarOpen ? <LuX /> : <LuMenu />}
                </button>
            </div>

            <nav className="mt-4 px-2">
                {links.map((link) => (
                    <Link
                        key={link.url}
                        href={link.url}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${pathname === link.url ? 'bg-gray-200 dark:bg-gray-700' : ''
                            } ${!isSidebarOpen ? 'justify-center' : ''}`}
                    >
                        {link.icon}
                        {isSidebarOpen && <span>{t(link.name)}</span>}
                    </Link>
                ))}

                {!isSidebarOpen && !LanguageSwitcher && !ThemeSwitcher ? null : (
                    <div className="absolute bottom-4 left-0 right-0 px-4 flex flex-col space-y-3 z-50">
                        <div className="flex items-center justify-between">
                            {LanguageSwitcher && <div>{<LanguageSwitcher/>}</div>}
                            {ThemeSwitcher && <div>{<ThemeSwitcher/>}</div>}
                        </div>
                    </div>
                )}
            </nav>
        </aside>
    );
}