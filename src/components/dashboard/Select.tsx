'use client';
import React, { forwardRef, useState, useEffect } from 'react';
import { Listbox } from '@headlessui/react';
import { IoIosArrowDown } from "react-icons/io";
import clsx from 'clsx';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: Array<{ value: string | number; label: string }>;
    error?: string;
    placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, options, error, placeholder, className = '', ...rest }, ref) => {
        const [selected, setSelected] = useState<{ value: string | number; label: string } | null>(null);

        // تحديث القيمة الافتراضية إذا تم تمريرها عبر defaultValue
        useEffect(() => {
            if (rest.defaultValue) {
                const found = options.find((opt) => opt.value === rest.defaultValue);
                if (found) setSelected(found);
            }
        }, [rest.defaultValue, options]);

        return (
            <div className="flex flex-col w-full">
                {label && (
                    <label className="mb-1 text-sm font-medium">{label}</label>
                )}
                <Listbox value={selected} onChange={setSelected}>
                    <div className="relative">
                        <Listbox.Button
                            className={clsx(
                                `w-full h-[35px] rounded-md border-2 border-b-4 bg-slate-100 dark:bg-[#2d2d2d] dark:text-white pl-2 pr-8 text-left cursor-pointer transition-all duration-300 ease-in-out outline-none placeholder-[#9a9a9a]
                                dark:hover:bg-[#313131] dark:focus:bg-[#1e1f20] focus:border-border focus:drop-shadow-lg`,
                                error ? 'border-red-500' : 'dark:border-[#303030]',
                                className
                            )}
                        >
                            <span>
                                {selected ? selected.label : placeholder || `اختر ${label?.toLowerCase() || 'القيمة'}`}
                            </span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <IoIosArrowDown className="w-4 h-4 text-gray-500" aria-hidden="true" />
                            </span>
                        </Listbox.Button>
                        <Listbox.Options
                            className="fixed max-w-full z-10 mt-1 max-h-48 overflow-auto rounded-md bg-white dark:bg-[#2d2d2d] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                        >
                            {options.map((opt) => (
                                <Listbox.Option
                                    key={opt.value}
                                    className={({ active }) =>
                                        `relative cursor-pointer select-none py-2 pl-3 pr-10 ${active ? 'bg-blue-100 text-blue-900 dark:bg-[#3b3b3b]' : 'text-gray-900 dark:text-white'
                                        }`
                                    }
                                    value={opt}
                                >
                                    {({ selected }) => (
                                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                            {opt.label}
                                        </span>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </div>
                </Listbox>
                {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
                {/* حقل مخفي ليتوافق مع النماذج العادية */}
                <select
                    ref={ref}
                    name={rest.name}
                    className="hidden"
                    defaultValue={selected?.value ?? ''}
                    {...rest}
                >
                    <option value="" disabled hidden>
                        {placeholder || `اختر ${label?.toLowerCase() || 'القيمة'}`}
                    </option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
);

Select.displayName = 'Select';

export default Select;
