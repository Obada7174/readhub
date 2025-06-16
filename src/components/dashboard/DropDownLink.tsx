'use client';
import { isActive } from "@/helpers/Link";
import { Link, usePathname } from "@/i18n/navigation";
import { SidebarLink } from "@/types/index"
import { useTranslations } from "next-intl";
import { useState, useRef } from "react";

const DropDownLink = ({ link, isSidebarOpen }: { link: SidebarLink, isSidebarOpen: boolean }) => {
    const [open, setOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const t = useTranslations('Dashboard.sidebar');

    const toggleDropdown = () => {
        setOpen(!open);
    };

    const getContentHeight = () => {
        if (!contentRef.current) return 0;
        return contentRef.current.scrollHeight;
    };

    return (
        <div key={link.name} className="w-full">
            <button
                onClick={toggleDropdown}
                className={`flex items-center justify-between w-full px-3 py-2 cursor-pointer rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${isActive(link, pathname) && 'bg-gray-200 dark:bg-gray-700'} ${!isSidebarOpen && 'justify-center'}`}
            >
                <div className="flex items-center gap-3">
                    {link.icon}
                    {isSidebarOpen && <span>{t(link.name)}</span>}
                </div>
                <svg
                    className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>

            {/* القائمة الفرعية مع انسيابية */}
            <div
                ref={contentRef}
                className="overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                    maxHeight: open && isSidebarOpen ? `${getContentHeight()}px` : '0',
                }}
            >
                <div className="mt-2 space-y-1 px-2">
                    {link.children?.map((child) => (
                        <Link
                            key={child.url}
                            href={child.url}
                            className={`flex gap-2 items-center px-6 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 ${pathname === child.url ? 'bg-gray-200 dark:bg-gray-700 font-medium' : ''
                                }`}
                        >
                            {child.icon && child.icon}
                            <div>{t(`${link.name}_${child.name}`)}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DropDownLink;