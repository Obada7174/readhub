"use client";

import { useTheme } from "next-themes";
import Link from "next/link";

// 🔹 أنواع المتغيرات (variant) والمقاسات (size)
type ButtonVariant =
    | "default"
    | "outline"
    | "link"
    | "ghost"
    | "destructive";
type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ButtonProps {
    href?: string;
    onClick?: () => void;
    children: React.ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    className?: string;
}

export default function Button({
    href,
    onClick,
    children,
    variant = "default",
    size = "default",
    fullWidth = false,
    className = "",
}: ButtonProps) {
    const { theme } = useTheme();

    // 🔹 تحديد أبعاد الزر بناءً على الحجم
    const getSizeStyles = () => {
        switch (size) {
            case "sm":
                return "h-9 rounded-md px-3";
            case "lg":
                return "h-11 rounded-md px-8";
            case "icon":
                return "h-10 w-10 p-0 flex items-center justify-center";
            case "default":
            default:
                return "h-10 px-4 py-2";
        }
    };

    // 🔹 تحديد ألوان الزر بناءً على variant والنوع (light/dark)
    const getVariantStyles = () => {
        if (variant === "outline") {
            return theme === "dark"
                ? "text-white border border-gray-600 hover:bg-gray-800 focus:ring-gray-500"
                : "text-gray-800 border border-gray-800 hover:bg-gray-100 focus:ring-gray-500";
        }

        if (variant === "link") {
            return "text-primary underline-offset-4 hover:underline";
        }

        if (variant === "ghost") {
            return theme === "dark"
                ? "hover:bg-gray-800 hover:text-gray-300"
                : "hover:bg-gray-200 hover:text-gray-900";
        }

        if (variant === "destructive") {
            return theme === "dark"
                ? "bg-red-700 text-white hover:bg-red-800 focus:ring-red-500"
                : "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500";
        }

        // variant === "default"
        return theme === "dark"
            ? "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-700"
            : "bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-600";
    };

    const baseClasses =
        "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

    const finalClasses = `${baseClasses} ${getSizeStyles()} ${getVariantStyles()} ${fullWidth ? "w-full" : "w-auto"
        } ${className}`;

    if (href) {
        return (
            <Link href={href} className={finalClasses}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type="button"
            onClick={onClick}
            className={finalClasses}
        >
            {children}
        </button>
    );
}