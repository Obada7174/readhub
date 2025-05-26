'use client';

import React, { useState } from 'react';
import axios from '@/services/axios';
import { useRouter } from 'next/navigation';
import { useTheme } from '@mui/material';

export default function NewCartPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || isNaN(Number(userId))) {
      setError('Please enter a valid user ID');
      return;
    }

    try {
      const res = await axios.post('/carts', { userId: Number(userId) });

      if (res.status === 201 || res.status === 200) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/dashboard/carts'); 
        }, 1500);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create cart');
    }
  };

  return (
    <div className={`max-w-6xl mx-auto px-6 py-10 mt-10 
      ${isDarkMode ? 'text-white' : 'text-slate-700'}
    `}>
      <div className="flex justify-center">
        <div className={`w-full max-w-md p-8 rounded-3xl shadow-xl 
          ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-slate-700'} 
          transition-colors duration-300`}>
          
          <h2 className="text-3xl font-bold text-center mb-4">Add New Cart</h2>

          {success && (
            <p className="text-green-500 text-center mb-4">Cart created successfully!</p>
          )}
          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className={`block text-sm mb-1 ${isDarkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                User ID
              </label>
              <input
                type="number"
                placeholder="User ID"
                autoComplete="off"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
                className={`w-full px-4 py-2 rounded-full shadow-md focus:shadow-lg outline-none ring-1 duration-300 placeholder:text-slate-600 placeholder:opacity-50
                  ${
                    isDarkMode
                      ? 'bg-gray-700 text-white ring-gray-500 focus:ring-blue-500 focus:shadow-blue-400/30'
                      : 'bg-slate-200 text-slate-600 ring-slate-400 focus:ring-slate-500 focus:shadow-slate-400'
                  }`}
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 rounded-full shadow-md transition duration-300"
            >
              Add Cart
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}