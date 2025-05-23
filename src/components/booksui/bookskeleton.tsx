"use client";
import { LuStar } from "react-icons/lu";

export default function BookCardSkeleton() {
  return (
    <div className="relative w-[220px] rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800 shadow-sm animate-pulse">
      {/* صورة الغلاف */}
      <div className="relative w-full h-[280px] rounded-t-xl overflow-hidden bg-gray-300 dark:bg-gray-700"></div>

      {/* محتوى البطاقة */}
      <div className="p-4 space-y-3">
        {/* عنوان الكتاب */}
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>

        {/* اسم المؤلف */}
        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>

        {/* وصف مختصر - سطرين */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>

        {/* السعر والتقييم */}
        <div className="flex justify-between items-center mt-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/5"></div>
          <div className="flex items-center gap-1">
            <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <LuStar size={16} className="text-yellow-500" />
          </div>
        </div>

        {/* عدد الصفحات وأيقونة السلة */}
        <div className="flex justify-between items-center mt-2">
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-5 w-5 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}