"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Button  from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Image from 'next/image';
import LanguageSwitcher from './LanguageSwitcher';

import readhub from '@/assets/images/readhub-logo.svg';
import readhubdarkmode from "@/assets/images/readhub-darkmode.svg";
import {
    LuShoppingCart,
    LuUser,
    LuSearch,
    LuMenu,
    LuX,
    LuLayoutDashboard
} from 'react-icons/lu';

import ThemeSwitcher from './ThemeSwitcher';
import { useTheme } from 'next-themes';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();
    const t = useTranslations();
    useEffect(() => {
        setMounted(true);
    }, []);



    return (
        <header className="border-b border-gray-300 bg-gray-200 dark:bg-gray-900 dark:border-gray-700 shadow-lg fixed w-full top-0 left-0 z-50">
            <div className="container mx-auto px-4 py-1.5">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href='/' className="flex gap-1.5 items-center min-h-20 min-w-56">
                        {mounted && (
                            <Image
                                src={theme === 'dark' ? readhubdarkmode : readhub}
                                alt="readhub logo"
                                width={60}
                                className='min-w-20'
                            />
                        )}
                        <h1 className="font-funnel-display text-2xl text-gray-800 dark:text-white">
                            <span className='font-light'>read</span><strong>hub</strong>
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white duration-150">{t('navigation.home')}</Link>
                        <Link href="/books" className="text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white duration-150">{t('navigation.books')}</Link>
                        <Link href="/about" className="text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white duration-150">{t('navigation.about')}</Link>
                        <Link href="/categories" className="text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white duration-150">{t('navigation.categories')}</Link>
                        <Link href="/competitions" className="text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white duration-150">{t('navigation.competitions')}</Link>
                    </nav>

                    <div className="hidden md:flex items-center space-x-4">
                        {/* Search Box */}

                        <div className="relative">
                            <Input
                                type="search"
                                placeholder={t('navigation.search')}
                                className="w-64 pl-8 bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
                            />
                            <LuSearch className="absolute left-2 top-2.5 h-4 w-4 text-gray-600 dark:text-gray-300" />
                        </div>


                        {/* Language Switcher - Desktop */}
                        <LanguageSwitcher />

                        <ThemeSwitcher />

                        <Link href="/dashboard">
                            <Button variant="ghost" size="icon">
                                <LuLayoutDashboard className="h-5 w-5 text-gray-800 dark:text-white" />
                            </Button>
                        </Link>

                        <Link href="/cart">
                            <Button variant="ghost" size="icon">
                                <LuShoppingCart className="h-5 w-5 text-gray-800 dark:text-white" />
                            </Button>
                        </Link>

                        <Link href="/account">
                            <Button variant="ghost" size="icon">
                                <LuUser className="h-5 w-5 text-gray-800 dark:text-white" />
                            </Button>
                        </Link>
                    </div>

                    <Button
                        variant="ghost"
                        size='icon'
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <LuX className="h-5 w-5 text-gray-800 dark:text-white" />
                        ) : (
                            <LuMenu className="h-5 w-5 text-gray-800 dark:text-white" />
                        )}
                    </Button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4">
                        <nav className="flex flex-col space-y-4">
                            <Link href="/books" className="text-gray-800 dark:text-white hover:text-primary">{t('navigation.books')}</Link>
                            <Link href="/ebooks" className="text-gray-800 dark:text-white hover:text-primary">{t('navigation.ebooks')}</Link>
                            <Link href="/categories" className="text-gray-800 dark:text-white hover:text-primary">{t('navigation.categories')}</Link>
                            <Link href="/about" className="text-gray-800 dark:text-white hover:text-primary">{t('navigation.about')}</Link>
                            <Link href="/dashboard" className="text-gray-800 dark:text-white hover:text-primary">{t('navigation.dashboard')}</Link>

                            <div className="relative">
                                <Input
                                    type="search"
                                    placeholder={t('navigation.search')}
                                    className="w-full pl-8 bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
                                />
                                <LuSearch className="absolute left-2 top-2.5 h-4 w-4 text-gray-600 dark:text-gray-300" />
                            </div>

                            {/* Language Switcher - Mobile */}
                            <LanguageSwitcher />
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}