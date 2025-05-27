"use client";

import { useState, useEffect } from "react";
import { useSignupMutation } from "@/hooks/react-query/auth/usesignupmutation";
import { handleGoogleCallback } from "@/services/auth.services";
import { SignupResponse } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("signup"); 

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { mutate: signup, isPending } = useSignupMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const data = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.password
    };

    signup(data, {
      onSuccess: () => {
        setSuccessMessage(t("successMessage"));
        router.push(`/otp?email=${encodeURIComponent(formData.email)}`);
      },
      onError: (err: Error) => {
        setErrorMessage(err.message || t("errorMessage"));
      }
    });
  };

  const signUpWithGoogle = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const inputClasses = "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-mono ring-1 ring-slate-400 focus:ring-2 focus:ring-slate-500 outline-none duration-300 placeholder:text-slate-600 dark:placeholder:text-gray-400 placeholder:opacity-70 rounded-full px-4 py-2 shadow-md focus:shadow-lg focus:shadow-slate-400 w-full";

  useEffect(() => {
    if (window.location.pathname === "/auth/google/callback") {
      handleGoogleCallback(window.location.href)
        .then((result) => {
          localStorage.setItem("access_token", result.access_token);
          localStorage.setItem("user", JSON.stringify(result.user));
          console.log("✓ Token stored in localStorage:", result.access_token);
          setSuccessMessage(t("successMessage"));
        })
        .catch((err) => {
          console.error("Google callback fetch failed:", err);
          setErrorMessage(t("errorMessage"));
        });
    }
  }, [t]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl w-full max-w-md flex flex-col mx-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-white">
          {t("title")}
        </h2>

        {successMessage && (
          <p className="text-green-600 dark:text-green-400 text-center mb-4">{successMessage}</p>
        )}

        {errorMessage && (
          <p className="text-red-600 dark:text-red-400 text-center mb-4">{errorMessage}</p>
        )}

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-600 dark:text-gray-300 text-sm mb-1">
              {t("firstName")}
            </label>
            <input
              name="firstName"
              type="text"
              placeholder={t("firstName")}
              autoComplete="off"
              value={formData.firstName}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>

          <div>
            <label className="block text-gray-600 dark:text-gray-300 text-sm mb-1">
              {t("lastName")}
            </label>
            <input
              name="lastName"
              type="text"
              placeholder={t("lastName")}
              autoComplete="off"
              value={formData.lastName}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>

          <div>
            <label className="block text-gray-600 dark:text-gray-300 text-sm mb-1">
              {t("email")}
            </label>
            <input
              name="email"
              type="email"
              placeholder={t("email")}
              autoComplete="off"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>

          <div>
            <label className="block text-gray-600 dark:text-gray-300 text-sm mb-1">
              {t("password")}
            </label>
            <input
              name="password"
              type="password"
              placeholder={t("password")}
              autoComplete="off"
              value={formData.password}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`mt-4 bg-slate-600 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-semibold py-2 rounded-full shadow-md transition duration-300 ${
              isPending ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isPending ? t("pendingButton") : t("signUpButton")}
          </button>

          <button
            type="button"
            onClick={signUpWithGoogle}
            className="mt-2 flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 font-semibold py-2 rounded-full shadow-md transition duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
              {/* SVG Path */}
            </svg>
            {t("signUpWithGoogle")}
          </button>
        </form>
      </div>
    </div>
  );
}