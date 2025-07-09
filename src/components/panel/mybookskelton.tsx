'use client';

import { LuStar, LuBookOpen, LuDownload } from 'react-icons/lu';

export default function MyBookCardSkeleton() {
  return (
    <div className="flex gap-4 p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm animate-pulse max-w-xl w-full mx-auto">
      <div className="min-w-[100px] h-[150px] rounded-xl overflow-hidden bg-gray-300 dark:bg-gray-700"></div>
      <div className="flex-1 flex flex-col justify-between py-1">
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="space-y-1 mt-1">
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
          <div className="flex gap-2 mt-2">
            <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            <div className="h-4 w-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-3">
          <div className="space-y-1">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="h-4 w-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <LuStar size={16} className="text-yellow-500" />
            </div>
            <div className="h-5 w-5 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <LuDownload size={14} className="text-gray-500 dark:text-gray-400" />
            </div>
            <div className="h-5 w-5 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <LuBookOpen size={14} className="text-gray-500 dark:text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
