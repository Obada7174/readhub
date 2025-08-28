"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import axios from "axios";

export default function ForgotPasswordPage() {
  const t = useTranslations("forgot_password");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setIsPending(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/forgot-password",
        { email }
      );

      if (response.data.message === "تم إرسال رمز التحقق بنجاح") {
        setSuccessMessage(t("codeSent"));
        setTimeout(() => {
            router.push(`/otp?email=${encodeURIComponent(email)}&mode=forgot-password`);
            }, 1500);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err.response?.data?.message || t("somethingWentWrong")
      );
    } finally {
      setIsPending(false);
    }
  };
  const inputclasses ="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-mono ring-1 ring-slate-400 focus:ring-2 focus:ring-slate-500 outline-none duration-300 placeholder:text-slate-600 dark:placeholder:text-gray-400 placeholder:opacity-70 rounded-full px-4 py-2 shadow-md focus:shadow-lg focus:shadow-slate-400 w-full";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 overflow-y-auto px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl w-full max-w-md flex flex-col mx-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-white">
          {t("title")}
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          {t("description")}
        </p>

        {error && (
          <p className="text-red-600 dark:text-red-400 text-center mb-4">{error}</p>
        )}

        {successMessage && (
          <p className="text-green-600 dark:text-green-400 text-center mb-4">
            {successMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              {t("emailLabel")}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              className={inputclasses}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`mt-2 bg-slate-600 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-semibold py-2 rounded-full shadow-md transition duration-300 ${
              isPending ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isPending ? t("sending") : t("sendCodeButton")}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            {t("rememberedPassword")}{" "}
            <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
              {t("signInLink")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}