// // panel-layout.tsx

// 'use client';

// import Sidebar from '@/app/[locale]/panel/components/sidebar';
// import Header from '@/app/[locale]/panel/components/header';
// import { useState } from 'react';




// export default function PanelLayout({ children }: { children: React.ReactNode }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   return (
//     <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
//       {/* Sidebar */}
//       <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header />
//         <main className="flex-1 p-6 overflow-auto">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }