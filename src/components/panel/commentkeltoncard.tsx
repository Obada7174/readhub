'use client';

import { AiOutlineLike } from 'react-icons/ai';
import { BiSolidCommentDetail } from 'react-icons/bi';

export default function CommentCardSkeleton() {
  return (
    <div className="p-4 rounded-2xl border border-gray-200 bg-white dark:bg-slate-800 shadow-sm animate-pulse max-w-xl w-full mx-auto">
      {/* العنوان */}
      <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>

      {/* اسم الكتاب */}
      <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>

      {/* نص التعليق */}
      <div className="space-y-2 mb-4">
        <div className="h-3 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="h-3 w-5/6 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700 text-xs">
        {/* التاريخ */}
        <div className="h-3 w-28 bg-gray-300 dark:bg-gray-700 rounded"></div>

        {/* الإعجابات والردود */}
        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <AiOutlineLike className="text-[#36419B]" size={16} />
            <div className="h-3 w-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </span>
          <span className="flex items-center gap-1">
            <BiSolidCommentDetail className="text-gray-400" size={16} />
            <div className="h-3 w-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </span>
        </div>
      </div>
    </div>
  );
}
