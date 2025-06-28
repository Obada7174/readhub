"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "@/components/ui/Logo";
import {
    LuLogOut
  } from "react-icons/lu";
import {
  LuShoppingCart,
  LuUser,
  LuSearch,
  LuMenu,
  LuX,
  LuLayoutDashboard,
  LuLayoutPanelLeft 
} from "react-icons/lu";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState<{ id: number; name?: string } | null>(null);

  useEffect(() => {
    const token = Cookies.get("access_token");
    const storedUser = Cookies.get("user");
  
    setIsLoggedIn(!!token);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("خطأ في جلب المستخدم من الكوكيز:", err);
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const token = Cookies.get("access_token");
      setIsLoggedIn(!!token);
    };
  
    checkAuth();
    window.addEventListener("storage", checkAuth); 
  
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []); 

  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("user");
    localStorage.setItem("auth_event", Date.now().toString());
    window.location.href = "/";
  };
  
  return (
    <header className="border-b border-gray-300 bg-gray-200 dark:bg-gray-900 dark:border-gray-700 shadow-lg fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto px-4 py-1.5">
        <div className="flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white duration-150">{t("navigation.home")}</Link>
            <Link href="/books" className="text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white duration-150">{t("navigation.books")}</Link>
            <Link href="/about" className="text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white duration-150">{t("navigation.about")}</Link>
            <Link href="/categories" className="text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white duration-150">{t("navigation.categories")}</Link>
            <Link href="/competitions" className="text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white duration-150">{t("navigation.competitions")}</Link>
          </nav>
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
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <LuUser className="h-5 w-5 text-gray-800 dark:text-white" />
              </Button>

              {showDropdown && (
  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50 overflow-hidden">
    {isLoggedIn ? (
      <>
        {user?.name && (
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200 font-medium">
            👋 {user.name}
          </div>
        )}
<Link
  href={`/panel/${user?.id}`}
  className="flex items-center gap-2 px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
>
  <LuLayoutPanelLeft  className="h-4 w-4" />
  {t("navigation.panel")}
</Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 px-4 py-2 text-left text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <LuLogOut className="h-4 w-4" />
          {t("navigation.logout")}
        </button>
      </>
    ) : (
      <Link
        href="/login"
        className="flex items-center gap-2 px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        <LuUser className="h-4 w-4" />
        {t("navigation.login")}
      </Link>
    )}
  </div>
)}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
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
      </div>
    </header>
  );
}
