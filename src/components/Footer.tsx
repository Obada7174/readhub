'use client';

import { Link } from "@/i18n/navigation";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import logo from '@/assets/images/readhub-darkmode.svg'
import { usePagesQuery } from "@/hooks/react-query/static-pages/usePagesQuery";

export default function Footer() {
    const t = useTranslations('footer');
    const { data: pages } = usePagesQuery();

    const quickLinks = [
        { href: "/books", label: t('quickLinks.books') },
        { href: "/competitions", label: t('quickLinks.competitions') },
        { href: "/subscription", label: t('quickLinks.subscription') },
        { href: "/contact", label: t('quickLinks.contact') },
    ];

    const customerServiceLinks = [
        { href: "/faq", label: t('customerService.faq') },
    ];

    const dynamicPages = pages?.data.filter(page => page.is_published) || [];

    return (
        <footer className="bg-gray-950 text-gray-300 border-t border-gray-800">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Logo + About */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Image
                                src={logo}
                                alt="logo"
                                width={60}
                                className="drop-shadow-md"
                            />
                            <h3 className="font-bold text-2xl tracking-tight text-white font-funnel-display">
                                readhub
                            </h3>
                        </div>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            {t('about.description')}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4 text-white">
                            {t('quickLinks.title')}
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-primary transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service + Dynamic Pages */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4 text-white">
                            {t('customerService.title')}
                        </h3>
                        <ul className="space-y-3">
                            {customerServiceLinks.map((link, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-primary transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                            {dynamicPages.length > 0 &&
                                dynamicPages.map((page) => (
                                    <li key={page.id}>
                                        <Link
                                            href={String(page.id)}
                                            className="text-gray-400 hover:text-primary transition-colors duration-200"
                                        >
                                            {page.ar_title || page.en_title}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>

                {/* Footer bottom */}
                <div className="mt-10 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} readhub. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
