// components/InfoItem.tsx
'use client';

import React from 'react';

export default function InfoItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 flex items-start gap-4 min-w-0">
      <div className="text-[#36419B] text-2xl flex-shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-1 truncate">{label}</p>
        <p className="text-base font-medium text-gray-900 dark:text-white break-words overflow-auto max-w-full whitespace-pre-wrap">{value}</p>
      </div>
    </div>
  );
}
