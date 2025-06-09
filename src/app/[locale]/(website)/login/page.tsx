"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLoginMutation } from "@/hooks/react-query/auth/usequeryloginmutation";

const Page = () => {
  const  t  = useTranslations("login");

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate: login, isPending } = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    login(formData, {
      onError: (err: Error) => {
        setErrorMessage(err.message);
      }
    });
  };
  const inputClasses="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-mono ring-1 ring-slate-400 focus:ring-2 focus:ring-slate-500 outline-none duration-300 placeholder:text-slate-600 dark:placeholder:text-gray-400 placeholder:opacity-70 rounded-full px-4 py-2 shadow-md focus:shadow-lg focus:shadow-slate-400 w-full";
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl w-full max-w-md flex flex-col mx-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-white">
          {t("Welcome Back")}
        </h2>

        {errorMessage && (
          <p className="text-red-600 text-center mb-4">{errorMessage}</p>
        )}

        <form className="flex flex-col gap-5" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label className="block text-gray-600 dark:text-gray-300 text-sm mb-1">{t("Email")}</label>
            <input
              type="email"
              name="email"
              placeholder={t("Email")}
              value={formData.email}
              onChange={handleChange}
              className={inputClasses} 
              autoComplete="off"
              required
            />
          </div>

          <div>
            <label className="block text-slate-600 text-sm mb-1">{t("Password")}</label>
            <input
              type="password"
              name="password"
              placeholder={t("Password")}
              value={formData.password}
              onChange={handleChange}
              className={inputClasses}               autoComplete="off"
              required
            />
          </div>
          <div className="text-center text-sm mt-1">
            <Link href="/forgot-password" className="text-blue-600 hover:underline">
              {t("Forgot Password?")}
            </Link>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`mt-4 bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 rounded-full shadow-md transition duration-300 ${
              isPending ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isPending ? t("signing In") : t("Sign In")}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          <p>
            {t("Don't have an account?")}{" "}
            <Link href="/en/signup" className="text-blue-600 hover:underline">
              {t("Sign Up")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;