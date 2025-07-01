"use client";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";

export default function ResetPasswordPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const res: AxiosResponse = await axios.post("/api/reset-link", {
                email,
            });
            if (res.status === 200) {
                setSuccess("Reset link sent! Please check your email.");
                setEmail("");
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                setError("Invalid email or user does not exist.");
            } else {
                setError("Something went wrong. Please try again later.");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black px-4">
            <div className="bg-[#0f0f0f] p-8 rounded-2xl w-full max-w-md shadow-md border border-gray-800">
                <h1 className="text-2xl font-semibold text-white text-center">
                    Reset your password
                </h1>
                <p className="mt-2 text-gray-400 text-center text-sm">
                    Enter your email to receive a password reset link.
                </p>

                <form onSubmit={handleResetPassword} className="mt-6">
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="youremail@email.com"
                        required
                        className="w-full px-4 py-2 bg-[#1a1a1a] text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-500"
                    />

                    {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                    )}
                    {success && (
                        <p className="text-green-500 text-sm mt-2">{success}</p>
                    )}

                    <button
                        type="submit"
                        className="mt-4 w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    >
                        Send Reset Link
                    </button>
                </form>

                <p className="mt-6 text-sm text-center text-gray-500">
                    Don’t have an account?{" "}
                    <a href="/signup" className="text-blue-400 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
