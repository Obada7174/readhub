'use client';

import { Toaster as SonnerToaster } from 'sonner';
import React from 'react';
import { useLocale } from 'next-intl';

export default function Toaster() {
    const locale = useLocale();
    return (
        <SonnerToaster
            position="bottom-right"
            richColors
            expand={false}
            visibleToasts={5}
            duration={5000}
            toastOptions={{
                className: 'text-sm shadow-lg ',
                classNames: {
                    toast:
                        'relative flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden pr-12',
                    description:
                        'mt-1 text-xs opacity-90 text-gray-600 dark:text-gray-300',
                    actionButton:
                        'bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors',
                    cancelButton:
                        'bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded text-xs text-gray-700 dark:text-gray-300',
                    title: 'font-semibold text-gray-800 dark:text-white',
                    icon: 'w-5 h-5 mt-0.5',
                    closeButton:
                        'absolute top-2 left-2 p-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors z-10',
                },
                style: {
                    direction: locale == 'ar' ? 'rtl' : 'ltr',
                },
            }}
        />
    );
}