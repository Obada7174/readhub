"use client";

import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { theme, systemTheme } = useTheme();
  const [selectedLang, setSelectedLang] = useState('en');
  const [isOpen, setIsOpen] = useState(false);
  const currentTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    const pathSegments = window.location.pathname.split('/');
    if (pathSegments[1] && ['en', 'ar'].includes(pathSegments[1])) {
      setSelectedLang(pathSegments[1]);
    }
  }, []);

  const handleLanguageChange = (newLang: string) => {
    const currentPath = window.location.pathname;
    const segments = currentPath.split('/');

    if (segments[1] && ['en', 'ar'].includes(segments[1])) {
      segments[1] = newLang;
    } else {
      segments.splice(1, 0, newLang);
    }

    const newPath = segments.join('/');
    router.push(newPath);
    setSelectedLang(newLang);
    setIsOpen(false); 
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer flex items-center justify-between gap-2 px-4 py-2 rounded-md border text-sm font-medium
          transition-all duration-200 transform
          focus:outline-none focus:ring-2 focus:ring-offset-2
          ${currentTheme === 'dark'
            ? 'border-gray-600 text-white bg-gray-800 hover:bg-gray-700 focus:ring-gray-500'
            : 'border-gray-300 text-gray-800 bg-white hover:bg-gray-100 focus:ring-blue-500'
          }
          w-24
        `}
        aria-label="Toggle language"
      >
        <span>{selectedLang.toUpperCase()}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`
            absolute top-full left-0 mt-2 min-w-[120px] max-w-xs bg-white dark:bg-gray-800
            border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg
            z-50
          `}
        >
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <button
                onClick={() => handleLanguageChange('en')}
                className={`
                  cursor-pointer flex items-center w-full px-4 py-2 text-left
                  transition-colors duration-150
                  ${selectedLang === 'en'
                    ? 'bg-primary text-white'
                    : currentTheme === 'dark'
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-100'
                  }
                `}
              >
                English
              </button>
            </li>
            <li>
              <button
                onClick={() => handleLanguageChange('ar')}
                className={`
                  cursor-pointer flex items-center w-full px-4 py-2 text-right
                  transition-colors duration-150
                  ${selectedLang === 'ar'
                    ? 'bg-primary text-white'
                    : currentTheme === 'dark'
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-100'
                  }
                `}
              >
                العربية
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}