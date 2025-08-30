"use client";

import { useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useTranslations, useLocale } from "next-intl";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "@/components/ui/Logo";
import {
  LuLogOut,
  LuShoppingCart,
  LuUser,
  LuSearch,
  LuMenu,
  LuX,
  LuLayoutDashboard,
  LuLayoutPanelLeft
} from "react-icons/lu";
import ThemeSwitcher from "./ThemeSwitcher";
import NotificationBell from "./NotificationBell";

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;

  const isLoggedIn = !!user;

  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("user");
    localStorage.setItem("auth_event", Date.now().toString());
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('cart');
    window.location.href = "/";
  };

  // تحديد اتجاه القائمة حسب اللغة
  const isEnglish = locale === "en";
  const sideClass = isEnglish ? "right-0" : "left-0";

  return (
    <header className="border-b border-gray-300 bg-gray-200 dark:bg-gray-900 dark:border-gray-700 shadow-lg fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto px-4 py-1.5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/">{t("navigation.home")}</Link>
            <Link href="/books">{t("navigation.books")}</Link>
            <Link href="/about">{t("navigation.about")}</Link>
            <Link href="/subscription">{t("navigation.subscription")}</Link>
            <Link href="/competitions">{t("navigation.competitions")}</Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Input
                type="search"
                placeholder={t("navigation.search")}
                className="w-64 pl-8 bg-gray-300 dark:bg-gray-700 text-black dark:text-white"
              />
              <LuSearch className="absolute left-2 top-2.5 h-4 w-4 text-gray-600 dark:text-gray-300" />
            </div>
            <LanguageSwitcher />
            <ThemeSwitcher />
            {user?.role === "admin" && (
  <Link href="/dashboard">
    <Button variant="ghost" size="icon">
      <LuLayoutDashboard className="h-5 w-5" />
    </Button>
  </Link>
)}

            <NotificationBell />
            <Link href="/cart">
              <Button variant="ghost" size="icon">
                <LuShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            {/* User dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <LuUser className="h-5 w-5" />
              </Button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border rounded-xl shadow-xl z-50 overflow-hidden">
                  {isLoggedIn ? (
                    <>
                      {user?.name && (
                        <div className="px-4 py-3 border-b bg-gray-100 dark:bg-gray-700 text-sm font-medium">
                          👋 {user.name}
                        </div>
                      )}
                      {user.role == 'admin' && <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <LuLayoutPanelLeft className="h-4 w-4" />
                        {t("navigation.dashboard")}
                      </Link>}
                      <Link
                        href="/panel"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <LuLayoutPanelLeft className="h-4 w-4" />
                        {t("navigation.panel")}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <LuLogOut className="h-4 w-4" />
                        {t("navigation.logout")}
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LuUser className="h-4 w-4" />
                      {t("navigation.login")}
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(true)}
          >
            <LuMenu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40">
          <div
            className={`fixed top-0 ${sideClass} w-3/4 max-w-xs h-full bg-white dark:bg-gray-900 shadow-lg p-6 space-y-6 z-50 overflow-y-auto`}
          >
            {/* زر إغلاق داخل القائمة */}
            <div className="flex justify-end">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <LuX className="h-6 w-6" />
              </Button>
            </div>

            <nav className="flex flex-col space-y-4">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>{t("navigation.home")}</Link>
              <Link href="/books" onClick={() => setIsMenuOpen(false)}>{t("navigation.books")}</Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>{t("navigation.about")}</Link>
              <Link href="/subscription" onClick={() => setIsMenuOpen(false)}>{t("navigation.subscription")}</Link>
              <Link href="/competitions" onClick={() => setIsMenuOpen(false)}>{t("navigation.competitions")}</Link>
            </nav>

            <div className="space-y-4">
              <div className="relative">
                <Input
                  type="search"
                  placeholder={t("navigation.search")}
                  className="w-full pl-8 bg-gray-200 dark:bg-gray-700"
                />
                <LuSearch className="absolute left-2 top-2.5 h-4 w-4" />
              </div>
              <div className="flex items-center gap-4">
                <LanguageSwitcher />
                <ThemeSwitcher />
              </div>
              <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                <LuLayoutDashboard /> {t("navigation.dashboard")}
              </Link>
              <Link href="/cart" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                <LuShoppingCart /> {t("navigation.cart")}
              </Link>
              <NotificationBell />
              {isLoggedIn ? (
                <>
                  <Link href="/panel" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                    <LuLayoutPanelLeft /> {t("navigation.panel")}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-left"
                  >
                    <LuLogOut /> {t("navigation.logout")}
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
                  <LuUser /> {t("navigation.login")}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
