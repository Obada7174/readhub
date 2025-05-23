"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";

type LoginResponse = {
  access_token: string;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };
};

const Page = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loginResult, setLoginResult] = useState<LoginResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (loginResult && typeof window !== "undefined") {
      localStorage.setItem("access_token", loginResult.access_token);
      localStorage.setItem("user", JSON.stringify(loginResult.user));
      setSuccessMessage(t("Login Successful!"));
    }
  }, [loginResult, t]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setLoginResult(result);
      } else {
        setErrorMessage(result.message || t("Login Failed"));
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(t("Something went wrong. Please try again later."));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md mx-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-slate-700">
          {t("Welcome Back")}
        </h2>

        {successMessage && (
          <p className="text-green-600 text-center mb-4">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-600 text-center mb-4">{errorMessage}</p>
        )}

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-slate-600 text-sm mb-1">{t("Email")}</label>
            <input
              type="email"
              name="email"
              placeholder={t("Email")}
              value={formData.email}
              onChange={handleChange}
              className="bg-slate-200 text-slate-600 font-mono ring-1 ring-slate-400 focus:ring-2 focus:ring-slate-500 outline-none duration-300 placeholder:text-slate-600 placeholder:opacity-50 rounded-full px-4 py-2 shadow-md focus:shadow-lg focus:shadow-slate-400 w-full"
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
              className="bg-slate-200 text-slate-600 font-mono ring-1 ring-slate-400 focus:ring-2 focus:ring-slate-500 outline-none duration-300 placeholder:text-slate-600 placeholder:opacity-50 rounded-full px-4 py-2 shadow-md focus:shadow-lg focus:shadow-slate-400 w-full"
              autoComplete="off"
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 rounded-full shadow-md transition duration-300"
          >
            {t("Sign In")}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          <p>
            {t("Don't have an account?")}{" "}
            <a href="/en/signup" className="text-blue-600 hover:underline">
              {t("Sign Up")}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Page;
