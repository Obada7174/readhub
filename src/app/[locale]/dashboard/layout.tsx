import Sidebar from '@/components/dashboard/Sidebar';
export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
        <Sidebar/>
        <main className={`flex-1 p-6 overflow-auto transition-all duration-300`}>
          {children}
        </main>

        {/* {isSidebarOpen && !isLargeScreen && (
          <div
            className="fixed inset-0 bg-gray-100 dark:bg-gray-800 bg-opacity-50 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )} */}
      </div>
    </>
  );
}