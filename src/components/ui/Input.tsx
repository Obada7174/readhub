import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                ref={ref}
                className={`
    w-full rounded-md transition duration-150
    h-10 px-3 py-2 text-sm
    border border-gray-300 bg-white text-gray-900 placeholder-gray-400
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white
    disabled:cursor-not-allowed disabled:opacity-50
    dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500
    dark:focus:ring-offset-gray-900

    /* دعم type="file" إن استُخدم */
    file:border-0 file:bg-gray-100 file:text-gray-800 file:px-3 file:py-2 file:rounded-md file:font-medium
    hover:file:bg-gray-200
    dark:file:bg-gray-800 dark:file:text-gray-200 dark:hover:file:bg-gray-700

    ${className || ''}
  `}
                {...props}
            />

        );
    }
);
Input.displayName = 'Input';

export { Input };
