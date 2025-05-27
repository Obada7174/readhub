"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useVerifyOTPMutation } from "@/hooks/react-query/auth/useOtpVerifyMutation";
import { useTranslations } from "next-intl";

export default function OTPPage() {
  const t = useTranslations("otp");

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const { mutate: verify, isPending } = useVerifyOTPMutation();

  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        const next = document.getElementById(`otp-input-${index + 1}`);
        if (next) next.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-input-${index - 1}`);
      if (prev) prev.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 4) {
      setError(t("error"));
      return;
    }

    setError("");
    verify({ email, otp: otpCode });
  };

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

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex justify-between">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-14 h-14 text-center text-xl font-semibold bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white ring-1 ring-slate-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-lg shadow-md outline-none transition duration-200"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`mt-2 bg-slate-600 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-semibold py-2 rounded-full shadow-md transition duration-300 ${
              isPending ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isPending ? t("verifying") : t("verifyButton")}
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            {t("resendCode")}{" "}
            <Link href="#" className="text-blue-600 dark:text-blue-400 underline">
              {t("resendLink")}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}