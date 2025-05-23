"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LuSun, LuMoon } from "react-icons/lu";

export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className='w-8 h-8 animate-pulse bg-gray-400 rounded ' />;

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:scale-105 transition cursor-pointer mx-5"
            aria-label="Toggle Theme"
        >
            {theme === "dark" ? <LuSun size={18} /> : <LuMoon size={18} />}
        </button>
    );
}
