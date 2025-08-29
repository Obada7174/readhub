"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useTranslations } from "next-intl";

export default function ResetPasswordPage() {
  const t = useTranslations("reset_password");
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";
  const otp = searchParams.get("otp") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (!email || !otp) {
      setError(t("missingData"));
    }
  }, [email, otp, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (password !== confirmPassword) {
      setError(t("passwordsDoNotMatch"));
      return;
    }

    if (!email || !otp) {
      setError(t("missingData"));
      return;
    }

    setIsPending(true);

    console.log("Sending request with:", { email, otp, newPassword: password });

    try {
      const response = await axios.post("http://localhost:5000/auth/reset-password", {
        email,
        otp,
        newPassword: password,
      });
    
      console.log("✅ Success response:", response.data);

      setSuccessMessage(t("passwordUpdatedSuccessfully"));
      setIsPending(false);
    
      setTimeout(() => {
        router.push("/"); 
      }, 1000);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("❌ Error during reset:", err.message);
      if (err.response) {
        console.error("Backend responded with:", err.response.data);
      }
    }
  };
  const inputclasses ="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-mono ring-1 ring-slate-400 focus:ring-2 focus:ring-slate-500 outline-none duration-300 placeholder:text-slate-600 dark:placeholder:text-gray-400 placeholder:opacity-70 rounded-full px-4 py-2 shadow-md focus:shadow-lg focus:shadow-slate-400 w-full";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 overflow-y-auto px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl w-full max-w-md mx-4">
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label htmlFor="password" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              {t("newPasswordLabel")}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("newPasswordPlaceholder")}
              className={inputclasses} 
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
              {t("confirmPasswordLabel")}
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t("confirmPasswordPlaceholder")}
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
            {isPending ? t("updating") : t("updatePasswordButton")}
          </button>
        </form>
      </div>
    </div>
  );
}