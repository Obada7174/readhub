import Sidebar from "@/components/dashboard/Sidebar"
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <div className="w-72 fixed sidebar bg-gray-50 dark:bg-gray-800">
        <Sidebar />
      </div>
      {children}</div>
  );
}
