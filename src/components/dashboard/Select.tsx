'use client';
import React, { forwardRef } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: Array<{ value: string | number; label: string }>;
    error?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, options, error, className = '', ...rest }, ref) => {
        return (
            <div className="flex flex-col w-full">
                {label && (
                    <label htmlFor={label} className="mb-1 text-sm font-medium">
                        {label}
                    </label>
                )}
                <select
                    id={label}
                    ref={ref}
                    className={`w-full h-[35px] rounded-md outline-none border-2 border-b-4 dark:border-[#303030] bg-slate-100 dark:bg-[#2d2d2d] dark:text-white pl-2 pr-2 transition-all duration-300 ease-in-out placeholder-[#9a9a9a] dark:hover:bg-[#313131] dark:focus:bg-[#1e1f20] focus:border-border focus:drop-shadow-lg invalid:focus:border-b-red-600 valid:focus:border-b-blue-900 ${error ? 'border-red-500' : ''
                        } ${className}`}
                    {...rest}
                >
                    <option value="" disabled hidden>
                        اختر {label?.toLowerCase() || 'القيمة'}
                    </option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
            </div>
        );
    }
);

Select.displayName = 'Select';

export default Select;
