// components/ProfileCard.tsx
'use client';

import React from 'react';
import { MdModeEditOutline } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';

export default function ProfileCard({ user, imageUrl, onEditClick, t }: any) {
  return (
    <div className="flex flex-col items-center w-full md:w-1/3">
      <div className="w-40 h-40 rounded-full border-4 border-[#36419B] shadow-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center transition-transform hover:scale-105 duration-300">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${user.first_name} ${user.last_name}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <FaUserCircle className="text-gray-400 dark:text-gray-300" size={96} />
        )}
      </div>
      <h2 className="text-2xl font-semibold mt-6 text-gray-900 dark:text-white text-center">
        {user.first_name} {user.last_name}
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 capitalize text-center">
        {user.role ?? ''}
      </p>
      <button
        onClick={onEditClick}
        className="mt-8 inline-flex items-center gap-2 px-6 py-2 bg-[#36419B] text-white rounded-full shadow-lg hover:bg-[#36419B] focus:outline-none focus:ring-2 focus:ring-[#36419B] transition"
      >
        <MdModeEditOutline size={20} />
        {t('editProfile')}
      </button>
    </div>
  );
}
