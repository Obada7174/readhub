"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useVerifyOTPMutation } from "@/hooks/react-query/auth/useOtpVerifyMutation";
import { useResendOTPMutation } from "@/hooks/react-query/auth/useresendotpmutation";
import { useTranslations } from "next-intl";

export default function OTPPage() {
  const t = useTranslations("otp");
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "";
  const mode = searchParams.get("mode") || "signup"; 

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [canResend, setCanResend] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);

  const { mutate: verify, isPending: verifying } = useVerifyOTPMutation();
  const { mutate: resendOTP, isPending: sending } = useResendOTPMutation();

  useEffect(() => {
    if (!canResend && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      if (timeLeft <= 1) {
        setCanResend(true);
        clearInterval(timer);
      }

      return () => clearInterval(timer);
    }
  }, [canResend, timeLeft]);

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
      setError(t("invalidCode"));
      return;
    }
  
    setError("");
    console.log("Verifying OTP...", { mode, email, otp: otpCode }); // 👈 تسجيل للتحقق
  
    verify(
      { email, otp: otpCode },
      {
        onSuccess: () => {
          console.log("OTP Verified Successfully"); // 👈 تأكيد النجاح
  
          if (mode === "signup") {
            router.push("/");
          } else if (mode === "forgot-password") {
            router.push(`/reset-password?email=${encodeURIComponent(email)}&otp=${otpCode}`); 
          } else {
            setError(t("invalidMode"));
          }
        },
        onError: (err: any) => {
          console.error("OTP Verification Failed", err); // 👈 تسجيل الخطأ
          setError(err.message || t("resendError"));
        },
      }
    );
  };

  const handleResendClick = () => {
    if (!canResend) return;

    setError("");
    setSuccessMessage("");

    resendOTP(
      { email },
      {
        onSuccess: () => {
          setSuccessMessage(t("resendSuccess"));
          setCanResend(false);
          setTimeLeft(60);
        },
        onError: (err: any) => {
          setError(err.message || t("resendError"));
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 overflow-y-auto px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl w-full max-w-md flex flex-col mx-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-white">
          {mode === "signup"
            ? t("signupVerification")
            : t("passwordReset")}
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
            disabled={verifying}
            className={`mt-2 bg-slate-600 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-semibold py-2 rounded-full shadow-md transition duration-300 ${
              verifying ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {verifying ? t("verifying") : t("verifyButton")}
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            {t("resendCode")}{" "}
            <button
              onClick={handleResendClick}
              type="button"
              disabled={!canResend || sending}
              className={`${
                canResend
                  ? "text-blue-600 dark:text-blue-400 underline"
                  : "text-gray-400 dark:text-gray-600"
              }`}
            >
              {sending
                ? t("resending")
                : canResend
                ? t("resendLink")
                : `${t("wait")} (${timeLeft}s)`}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}