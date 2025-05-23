export default function DashContainer({ children }:{children:React.ReactNode}) {
  return (
    <div className="m-4 md:m-10 p-4 md:p-10 md:mt-6 md:pt-8 bg-gray-50 rounded-xl dark:bg-gray-750 overflow-hidden border border-gray-200 dark:border-gray-600 shadow-lg">
      {children}
    </div>
  );
}
