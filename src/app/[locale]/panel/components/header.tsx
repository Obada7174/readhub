// // header.tsx

// "use client";

// import { useTranslations } from 'next-intl';
// import { useTheme } from 'next-themes';
// import { useEffect, useState } from 'react';
// import ThemeSwitcher from '@/components/ThemeSwitcher';
// import LanguageSwitcher from '@/components/LanguageSwitcher';

// export default function Header() {
//     const [mounted, setMounted] = useState(false);
//     const { theme } = useTheme();
//     const t = useTranslations();

//     useEffect(() => {
//         setMounted(true);
//     }, []);

//     return (
//         <header className="border-b border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm py-2 px-6 z-50">
//             <div className="container mx-auto flex items-center justify-between">
//                 {/* مساحة فارغة أو عنوان الصفحة */}
//                 <div className="font-funnel-display text-lg text-gray-800 dark:text-white">
//                     Dashboard
//                 </div>

//                 {/* Controls: Language + Theme */}
//                 <div className="flex items-center space-x-4 space-x-reverse">
//                     <LanguageSwitcher />
//                     <ThemeSwitcher />
//                 </div>
//             </div>
//         </header>
//     );
// }