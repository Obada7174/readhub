"use client";

import { useState, useEffect } from "react";

type SignupResponse = {
  access_token: string;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role?: string;
    img?: string;
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

    if (window.location.pathname === "/auth/google/callback") {
      fetch(window.location.href, {
        method: "GET",
        headers: { "Accept": "application/json" }
      })
        .then(res => res.json())
        .then((result: SignupResponse) => {
          setSignupResult(result);
        })
        .catch(err => {
          console.error("Google callback fetch failed:", err);
          setErrorMessage("Google sign-in failed");
        });
    }
  }, []);

  useEffect(() => {
    if (isClient && signupResult) {
      localStorage.setItem("access_token", signupResult.access_token);
      localStorage.setItem("user", JSON.stringify(signupResult.user));
      console.log("✓ Token stored in localStorage:", signupResult.access_token);
      setSuccessMessage("Sign Up Successful!");
    }
  }, [signupResult, isClient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      const res = await fetch("http://127.0.0.1:5000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (res.ok) {
        setSignupResult(result);
      } else {
        setErrorMessage(result.message || "Sign Up Failed");
      }
    } catch (err) {
      console.error("Error:", err);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };

  const signUpWithGoogle = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 overflow-y-auto">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md flex flex-col mx-4">
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
              name="firstName"
              type="text"
              placeholder="First Name"
              autoComplete="off"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="bg-slate-200 text-slate-600 font-mono ring-1 ring-slate-400 focus:ring-2 focus:ring-slate-500 outline-none duration-300 placeholder:text-slate-600 placeholder:opacity-50 rounded-full px-4 py-2 shadow-md focus:shadow-lg focus:shadow-slate-400 w-full"
            />
          </div>
          <div>
            <label className="block text-slate-600 text-sm mb-1">Last Name</label>
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              autoComplete="off"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="bg-slate-200 text-slate-600 font-mono ring-1 ring-slate-400 focus:ring-2 focus:ring-slate-500 outline-none duration-300 placeholder:text-slate-600 placeholder:opacity-50 rounded-full px-4 py-2 shadow-md focus:shadow-lg focus:shadow-slate-400 w-full"
            />
          </div>
          <div>
            <label className="block text-slate-600 text-sm mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="off"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-slate-200 text-slate-600 font-mono ring-1 ring-slate-400 focus:ring-2 focus:ring-slate-500 outline-none duration-300 placeholder:text-slate-600 placeholder:opacity-50 rounded-full px-4 py-2 shadow-md focus:shadow-lg focus:shadow-slate-400 w-full"
            />
          </div>
          <div>
            <label className="block text-slate-600 text-sm mb-1">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="off"
              value={formData.password}
              onChange={handleChange}
              required
              className="bg-slate-200 text-slate-600 font-mono ring-1 ring-slate-400 focus:ring-2 focus:ring-slate-500 outline-none duration-300 placeholder:text-slate-600 placeholder:opacity-50 rounded-full px-4 py-2 shadow-md focus:shadow-lg focus:shadow-slate-400 w-full"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 rounded-full shadow-md transition duration-300"
          >
            Sign Up
          </button>

          <button
            type="button"
            onClick={signUpWithGoogle}
            className="mt-2 flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold py-2 rounded-full shadow-md transition duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4285f4" d="M533.5 278.4c0-18.4-1.6-36.1-4.6-53.3H272v100.9h146.9c-6.3 34.1-25.1 62.9-53.5 82.2v68h86.4c50.6-46.6 81.7-115.4 81.7-198z"/>
              <path fill="#34a853" d="M272 544.3c72.6 0 133.6-24 178.2-64.8l-86.4-68c-24 16.1-54.7 25.5-91.8 25.5-70.6 0-130.6-47.7-152-111.5h-89.5v69.9c44.9 88.6 137.5 148.9 241.5 148.9z"/>
              <path fill="#fbbc04" d="M120 325.5c-10.3-30.6-10.3-63.5 0-94.1V161.5h-89.5C4.6 202.8 0 239.6 0 272s4.6 69.2 30.5 110.5L120 325.5z"/>
              <path fill="#ea4335" d="M272 107.7c39.5-.6 77.5 14.6 106.3 41.9l79.1-79.1C421.3 25.6 348.5-1.5 272 0 168 0 75.4 60.3 30.5 148.9l89.5 69.9C141.4 155.4 201.4 107.7 272 107.7z"/>
            </svg>
            Sign Up with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
