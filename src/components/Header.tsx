"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // <-- جديد
import { useTranslations } from 'next-intl';
import { CustomButton } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Image from 'next/image';
import { SelectChangeEvent } from '@mui/material/Select';

// Material UI imports
import {
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';

// Icons & Images
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

// Theme & Auth Components
import ThemeSwitcher from './ThemeSwitcher';
import { useTheme } from 'next-themes';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();
    const t = useTranslations();

    const router = useRouter(); // <-- هنا نستخدم useRouter

    // للتأكد من أن الـ theme يعمل بشكل صحيح بدون مشاكل SSR
    useEffect(() => {
        setMounted(true);
    }, []);


    const handleLanguageChange = (e: SelectChangeEvent<string>) => {
        const lang = e.target.value as string;
        const currentPath = window.location.pathname;

        const segments = currentPath.split('/');

        if (segments[1] && ['en', 'ar'].includes(segments[1])) {
            segments[1] = lang;
        } else {
            segments.splice(1, 0, lang);
        }

        const newPath = segments.join('/');
        router.push(newPath);
    };

    return (
        <header className="border-b border-gray-300 bg-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow-lg fixed w-full top-0 left-0 z-50">
            <div className="container mx-auto px-4 py-1.5">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href='/' className="flex gap-1.5 items-center">
                        {mounted && (
                            <Image
                                src={theme === 'dark' ? readhubdarkmode : readhub}
                                alt="readhub logo"
                                width={60}
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
                        <FormControl variant="standard" sx={{ minWidth: 100 }}>
                            <Select
                                labelId="lang-select-label"
                                id="lang-select"
                                defaultValue="en"
                                onChange={handleLanguageChange} // <-- هنا نضيف event handler
                                className="text-black dark:text-white"
                            >
                                <MenuItem value="en">English</MenuItem>
                                <MenuItem value="ar">العربية</MenuItem>
                            </Select>
                        </FormControl>

                        <ThemeSwitcher />

                        <Link href="/dashboard">
                            <CustomButton variantType="ghost" sizeType="icon">
                                <LuLayoutDashboard className="h-5 w-5 text-gray-800 dark:text-white" />
                            </CustomButton>
                        </Link>

                        <Link href="/cart">
                            <CustomButton variantType="ghost" sizeType="icon">
                                <LuShoppingCart className="h-5 w-5 text-gray-800 dark:text-white" />
                            </CustomButton>
                        </Link>

                        <Link href="/account">
                            <CustomButton variantType="ghost" sizeType="icon">
                                <LuUser className="h-5 w-5 text-gray-800 dark:text-white" />
                            </CustomButton>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <CustomButton
                        variantType="ghost"
                        sizeType='icon'
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <LuX className="h-5 w-5 text-gray-800 dark:text-white" />
                        ) : (
                            <LuMenu className="h-5 w-5 text-gray-800 dark:text-white" />
                        )}
                    </CustomButton>
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
                            <FormControl variant="standard" fullWidth>
                                <InputLabel id="lang-select-label-mobile" className="text-black dark:text-white">Language</InputLabel>
                                <Select
                                    labelId="lang-select-label-mobile"
                                    id="lang-select-mobile"
                                    defaultValue="en"
                                    onChange={handleLanguageChange}
                                    className="text-black dark:text-white"
                                >
                                    <MenuItem value="en">English</MenuItem>
                                    <MenuItem value="ar">العربية</MenuItem>
                                </Select>
                            </FormControl>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}