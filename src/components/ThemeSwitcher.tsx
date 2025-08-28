"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuSun, LuMoon } from "react-icons/lu";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [circle, setCircle] = useState<{ x: number; y: number; size: number; color: string } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return <div className="w-8 h-8 animate-pulse bg-gray-400 rounded" />;

  const handleToggle = (e: React.MouseEvent) => {
    const button = e.currentTarget as HTMLButtonElement;
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // نحسب المسافة الأبعد من مركز الزر لأي زاوية من الشاشة
    const distances = [
      Math.hypot(0 - x, 0 - y), // أعلى يسار
      Math.hypot(window.innerWidth - x, 0 - y), // أعلى يمين
      Math.hypot(0 - x, window.innerHeight - y), // أسفل يسار
      Math.hypot(window.innerWidth - x, window.innerHeight - y), // أسفل يمين
    ];

    const maxDistance = Math.max(...distances);
    const circleSize = maxDistance * 2; 

    const circleColor = theme === "dark" ? "#f3f4f6" : "#1d2737";

    setCircle({ x, y, size: circleSize, color: circleColor });

    setTimeout(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    }, 500);

    setTimeout(() => {
      setCircle(null);
    }, 700);
  };

  return (
    <>
      <button
        onClick={handleToggle}
        className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:scale-105 transition cursor-pointer mx-5 relative z-50"
        aria-label="Toggle Theme"
      >
        {theme === "dark" ? <LuSun size={18} /> : <LuMoon size={18} />}
      </button>

      <AnimatePresence>
        {circle && (
          <motion.div
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: circle.size, height: circle.size, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              position: "fixed",
              top: circle.y,
              left: circle.x,
              backgroundColor: circle.color,
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 40,
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
