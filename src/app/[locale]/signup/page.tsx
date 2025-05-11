"use client";

import { useState, useEffect } from "react";

type SignupResponse = {
  access_token: string;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  };
};

const Page = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const [signupResult, setSignupResult] = useState<SignupResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false); 

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && signupResult) {
      localStorage.setItem("access_token", signupResult.access_token);
      localStorage.setItem("user", JSON.stringify(signupResult.user));
      setSuccessMessage("Sign Up Successful!");
    }
  }, [signupResult, isClient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage(null);
    setSuccessMessage(null);

    const data = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.password
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        setSignupResult(result);
      } else {
        setErrorMessage(result.message || "Sign Up Failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 overflow-y-auto">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-4 text-slate-700">
          Create a New Account
        </h2>

        {successMessage && (
          <p className="text-green-600 text-center mb-4">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-600 text-center mb-4">{errorMessage}</p>
        )}

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-slate-600 text-sm mb-1">First Name</label>
            <input
              className="bg-slate-200 text-slate-600 font-mono ring-1 ring-slate-400 focus:ring-2 focus:ring-slate-500 outline-none duration-300 placeholder:text-slate-600 placeholder:opacity-50 rounded-full px-4 py-2 shadow-md focus:shadow-lg focus:shadow-slate-400 w-full"
              autoComplete="off"
              placeholder="First Name"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-slate-600 text-sm mb-1">Last Name</label>
            <input
              className="bg-slate-200 text-slate-600 font-mono ring-1 ring-slate-400 focus:ring-2 focus:ring-slate-500 outline-none duration-300 placeholder:text-slate-600 placeholder:opacity-50 rounded-full px-4 py-2 shadow-md focus:shadow-lg focus:shadow-slate-400 w-full"
              autoComplete="off"
              placeholder="Last Name"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-slate-600 text-sm mb-1">Email</label>
            <input
              className="bg-slate-200 text-slate-600 font-mono ring-1 ring-slate-400 focus:ring-2 focus:ring-slate-500 outline-none duration-300 placeholder:text-slate-600 placeholder:opacity-50 rounded-full px-4 py-2 shadow-md focus:shadow-lg focus:shadow-slate-400 w-full"
              autoComplete="off"
              placeholder="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-slate-600 text-sm mb-1">Password</label>
            <input
              className="bg-slate-200 text-slate-600 font-mono ring-1 ring-slate-400 focus:ring-2 focus:ring-slate-500 outline-none duration-300 placeholder:text-slate-600 placeholder:opacity-50 rounded-full px-4 py-2 shadow-md focus:shadow-lg focus:shadow-slate-400 w-full"
              autoComplete="off"
              placeholder="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 rounded-full shadow-md transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          <p>
            By creating an account, you agree to the{" "}
            <a href="/terms-of-service" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy-policy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
          <p className="mt-2">
            Already have an account?{" "}
            <a href="/en/login" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </p>
        </div>

        <div className="mt-4 text-xs text-slate-400 text-center">
          <p>
            <a href="/terms-of-service" className="hover:underline">Terms of Service</a> |{" "}
            <a href="/privacy-policy" className="hover:underline">Privacy</a> |{" "}
            <a href="/help" className="hover:underline">Help</a>
          </p>
          <p className="mt-4 text-xs text-slate-400">© 2025 ReadHub</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
