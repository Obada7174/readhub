"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { CustomButton } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Image from 'next/image';
import {
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import readhub from '@/assets/images/readhub-logo.svg'
import {
    //  LuBookOpen,
    LuShoppingCart,
    LuUser,
    //  LuSun,
    //  LuMoon,
    LuSearch,
    LuMenu,
    LuX,
    LuLayoutDashboard
} from 'react-icons/lu';

export default function Header() {
    // const { theme, setTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const t = useTranslations();

    return (
        <header className="border-b border-gray-300 bg-gray-200 shadow-lg fixed w-full t-0 l-0 z-50">
            <div className="container mx-auto px-4 py-1.5">
                <div className="flex items-center justify-between">
                    <Link href='/' className="flex gap-1.5 items-center">
                        <Image
                            src={readhub}
                            alt="readhub logo"
                            width={60}
                        />
                        <h1 className="font-funnel-display text-2xl text-gray-800"><span className='font-light'>read</span><strong>hub</strong></h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-800 hover:text-gray-900 duration-150">{t('navigation.home')}</Link>
                        <Link href="/books" className="text-gray-800 hover:text-gray-900 duration-150">{t('navigation.books')}</Link>
                        <Link href="/about" className="text-gray-800 hover:text-gray-900 duration-150">{t('navigation.about')}</Link>
                        <Link href="/categories" className="text-gray-800 hover:text-gray-900 duration-150">{t('navigation.categories')}</Link>
                        <Link href="/competitions" className="text-gray-800 hover:text-gray-900 duration-150">{t('navigation.competitions')}</Link>
                    </nav>

                    {/* <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/books" className="hover:text-primary">books</Link>
                        <Link href="/ebooks" className="hover:text-primary">ebooks</Link>
                        <Link href="/categories" className="hover:text-primary">categories</Link>
                        <Link href="/about" className="hover:text-primary">about</Link>
                        <Link href="/dashboard" className="hover:text-primary">dashboard</Link>
                    </nav> */}

                    <div className="hidden md:flex items-center space-x-4">
                        <div className="relative">
                            <Input
                                type="search"
                                placeholder={t('navigation.search')}
                                // placeholder={"search"}
                                className="w-64 pl-8 bg-gray-300 opacity-90"
                            />
                            < LuSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        </div>

                        <FormControl variant="standard" sx={{ minWidth: 100 }}>
                            <InputLabel id="lang-select-label">Language</InputLabel>
                            <Select
                                labelId="lang-select-label"
                                id="lang-select"
                                defaultValue="en"
                            >
                                <MenuItem value="en">English</MenuItem>
                                <MenuItem value="ar">العربية</MenuItem>
                            </Select>
                        </FormControl>


                        {/* <CustomButton
                            variantType="ghost"
                            sizeType="icon"
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        >
                            {theme === 'dark' ? (
                                < LuSun className="h-5 w-5" />
                            ) : (
                                    < LuMoon className="h-5 w-5" />
                            )}
                        </CustomButton> */}

                        <Link href="/dashboard">
                            <CustomButton variantType="ghost" sizeType="icon" className=''>
                                < LuLayoutDashboard className="h-5 w-5  text-gray-800" />
                            </CustomButton>
                        </Link>

                        <Link href="/cart">
                            <CustomButton variantType="ghost" sizeType="icon" className=''>
                                < LuShoppingCart className="h-5 w-5 text-gray-800" />
                            </CustomButton>
                        </Link>

                        <Link href="/account">
                            <CustomButton variantType="ghost" sizeType="icon" className=''>
                                < LuUser className="h-5 w-5 text-gray-800" />
                            </CustomButton>
                        </Link>
                    </div>

                    {/* Mobile Menu CustomButton */}
                    <CustomButton
                        variantType="ghost"
                        sizeType='icon'
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            < LuX className="h-5 w-5" />
                        ) : (
                            < LuMenu className="h-5 w-5" />
                        )}
                    </CustomButton>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4">
                        <nav className="flex flex-col space-y-4">
                            <Link href="/books" className="hover:text-primary">{'books'}</Link>
                            <Link href="/ebooks" className="hover:text-primary">{'ebooks'}</Link>
                            <Link href="/categories" className="hover:text-primary">{'categories'}</Link>
                            <Link href="/about" className="hover:text-primary">{'about'}</Link>
                            <Link href="/dashboard" className="hover:text-primary">{'dashboard'}</Link>
                            {/* <Link href="/books" className="hover:text-primary">{t('navigation.books')}</Link>
              <Link href="/ebooks" className="hover:text-primary">{t('navigation.ebooks')}</Link>
              <Link href="/categories" className="hover:text-primary">{t('navigation.categories')}</Link>
              <Link href="/about" className="hover:text-primary">{t('navigation.about')}</Link>
              <Link href="/dashboard" className="hover:text-primary">{t('navigation.dashboard')}</Link> */}
                            <div className="relative">
                                <Input
                                    type="search"
                                    // placeholder={t('navigation.search')}
                                    placeholder={'search'}
                                    className="w-full pl-8"
                                />
                                < LuSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel id="lang-select-label-mobile">Language</InputLabel>
                                <Select
                                    labelId="lang-select-label-mobile"
                                    id="lang-select-mobile"
                                    defaultValue="en"
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