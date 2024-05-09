"use client";
import React, { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Clear previous error

    try {
      const result = await signIn("credentials", {
        username: username,
        password: password,
        redirect: false,
      });

      if (!result?.error) {
        // Redirect to the protected page after successful login
        // Replace '/protected' with your actual protected page path
        window.location.href = "/admin";
      } else {
        // Handle login error, e.g., display an error message
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Welcome to admin
        </h2>
        <form onSubmit={handleSubmit} className="min-w-96">
          <div className="mb-4">
            <label htmlFor="username" className="block font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
          <button
            type="submit"
            className="bg-black text-white py-2 px-8 rounded-md hover:bg-slate-800 transition-colors"
          >
            Login
            
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
