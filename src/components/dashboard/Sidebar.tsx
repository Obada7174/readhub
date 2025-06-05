'use client';

import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { LuMenu, LuX, LuArrowLeft } from 'react-icons/lu';
import {  useState } from 'react';
import Logo from '@/components/ui/Logo'
import { links } from "@/assets/files/json"
import DropDownLink from './DropDownLink';
import { isActive } from '@/helpers/Link';

export default function Sidebar() {
    const pathname = usePathname();
    const t = useTranslations('Dashboard.sidebar');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    // const [isLargeScreen, setIsLargeScreen] = useState(true);
    // const [isMobile, setIsMobile] = useState(false);

    // useEffect(() => {
    //     const handleResize = () => {
    //         const large = window.innerWidth >= 768;
    //         setIsLargeScreen(large);
    //         const mobile = window.innerWidth < 768;
    //         setIsMobile(mobile);
    //         if (large) setIsSidebarOpen(true);
    //     };

    //     handleResize();
    //     window.addEventListener('resize', handleResize);
    //     return () => window.removeEventListener('resize', handleResize);
    // }, []);

    return (
        <aside
            className={`${isSidebarOpen ? 'w-56' : 'w-0 md:w-20'
                } bg-gray-50 dark:bg-gray-900 shadow-md transition-all duration-300 ease-in-out h-screen fixed top-0 left-0 z-40 md:relative overflow-hidden`}
        >
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Logo className=''/>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    {isSidebarOpen ? <LuX /> : <LuMenu />}
                </button>
            </div>

            <nav className="mt-4 px-2 space-y-1">
                {links.map((link) => {
                    if (link.children) {
                        return (
                            <DropDownLink key={link.name} isSidebarOpen={isSidebarOpen} link={link}/>
                        );
                    }
                    return (
                        <Link
                            key={link.url}
                            href={link.url}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors  ${!isSidebarOpen ? 'justify-center' : ''} ${isActive(link, pathname) && 'bg-gray-200 dark:bg-gray-700'}`}
                        >
                            {link.icon}
                            {isSidebarOpen && <span>{t(link.name)}</span>}
                        </Link>
                    );
                })}

                <div className="absolute bottom-4 left-0 right-0 px-4 z-50">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors w-full border border-gray-200 dark:border-gray-400 font-semibold bg-gray-50 dark:bg-gray-800"
                    >
                        <LuArrowLeft />
                        {isSidebarOpen && <span>{t('return_to_site')}</span>}
                    </Link>
                </div>
            </nav>
        </aside>
    );
}