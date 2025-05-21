// 'use client';

// import { usePathname } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useState, Dispatch, SetStateAction } from 'react';

// // ✅ تعريف الـ interface هنا
// interface SidebarProps {
//   isSidebarOpen: boolean;
//   setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
// }

// const sidebarLinks = [
//   { href: '/en/panel', label: 'Home' },
//   { href: '/en/panel/profile', label: 'Profile' },
//   { href: '/en/panel/library', label: 'Library' },
//   { href: '/en/panel/favorites', label: 'Favourite' },
//   { href: '/en/panel/my-book', label: 'My Book' },
//   { href: '/en/panel/pdf-reader', label: 'Pdf-Reader' },
// ];

// export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) {
//   const pathname = usePathname();

//   return (
//     <aside
//       className={`${
//         isSidebarOpen ? 'w-64' : 'w-20'
//       } bg-white dark:bg-gray-900 shadow-md transition-all duration-300 ease-in-out`}
//     >
//       <div className="p-4 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           {isSidebarOpen && (
//             <Link href="/">
//               <Image
//                 src="/logo.png"
//                 alt="Logo"
//                 width={32}
//                 height={32}
//               />
//             </Link>
//           )}
//           {isSidebarOpen && (
//             <span className="text-xl font-bold text-gray-800 dark:text-white">Maram</span>
//           )}
//         </div>
//         <button
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//         >
//           {isSidebarOpen ? '←' : '→'}
//         </button>
//       </div>

//       <nav className="mt-4 px-2">
//         {sidebarLinks.map((link) => (
//           <a
//             key={link.href}
//             href={link.href}
//             className={`block px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 ${
//               pathname === link.href ? 'bg-gray-200 dark:bg-gray-700' : ''
//             } ${!isSidebarOpen ? 'text-center' : ''}`}
//           >
//             {isSidebarOpen ? link.label : link.label[0]}
//           </a>
//         ))}
//       </nav>
//     </aside>
//   );
// }