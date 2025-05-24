'use client';
import React, { useEffect, useRef, forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  isFirst?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      type = 'text',
      placeholder,
      error,
      className = '',
      style,
      isFirst = false,
      ...rest
    },
    ref
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (isFirst && internalRef.current) {
        internalRef.current.focus();
      }
    }, [isFirst]);

    return (
      <div className="flex flex-col w-full">
        {label && (
          <label htmlFor={label} className="mb-1 text-sm font-medium">
            {label}
          </label>
        )}
        <input
          id={label}
          type={type}
          placeholder={placeholder || label}
          ref={ref || internalRef}
          className={`w-full h-[35px] rounded-md outline-none border-2 border-b-4 dark:border-[#303030] bg-slate-100 dark:bg-[#2d2d2d] dark:text-white pl-2 pr-2 transition-all duration-300 ease-in-out placeholder-[#9a9a9a] dark:hover:bg-[#313131] dark:focus:bg-[#1e1f20] focus:border-border focus:drop-shadow-lg invalid:focus:border-b-red-600 valid:focus:border-b-blue-900 ${error ? 'border-red-500' : ''
            } ${className}`}
          style={style}
          {...rest}
        />
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
