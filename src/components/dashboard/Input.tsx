'use client';
import { useEffect, useRef } from "react";

interface InputProps {
  name?: string;
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  value?: string | number;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setForm?: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  className?: string;
  style?: React.CSSProperties;
  isFirst?: boolean;
  disabled?: boolean;
}

export default function Input({
  name='',
  type = "text",
  placeholder,
  value,
  handleChange,
  setForm,
  className = "",
  style,
  isFirst = false,
  disabled = false,
}: InputProps) {
  const focusRef = useRef<HTMLInputElement>(null);


  const defaultHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setForm) {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  useEffect(() => {
    if (isFirst && focusRef.current) {
      focusRef.current.focus();
    }
  }, [isFirst]);

  return (
    <input
      name={name}
      ref={focusRef}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange || defaultHandleChange}
      minLength={
        type === "password" ? 6 : type === "text" ? 1 : undefined
      }
      required
      disabled={disabled}
      className={`w-full h-[35px] rounded-md outline-none border-2 border-b-4 dark:border-[#303030] bg-slate-100 dark:bg-[#2d2d2d] dark:text-white pl-2 pr-2 transition-all duration-300 ease-in-out placeholder-[#9a9a9a] dark:hover:bg-[#313131] dark:focus:bg-[#1e1f20] focus:border-border focus:drop-shadow-lg invalid:focus:border-b-red-600 valid:focus:border-b-blue-900 ${className}`}
      style={{
        ...style,
      }}
    />
  );
}