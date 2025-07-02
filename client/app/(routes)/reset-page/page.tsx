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
        <div className="flex items-center justify-center min-h-screen text-white px-4">
            <div className="p-8 rounded-2xl w-full max-w-md">
                <h1 className="text-2xl font-bold text-white text-center">
                    Reset your password
                </h1>
                <p className="mt-2 text-white/60 text-center text-sm">
                    Enter your email to receive a password reset link.
                </p>

                <form onSubmit={handleResetPassword} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm text-white/80 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="youremail@email.com"
                            required
                            className="w-full bg-transparent border border-white/20 outline-none text-white placeholder-white/60 px-4 py-3 text-sm rounded-md focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all"
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm">{error}</p>
                    )}
                    {success && (
                        <p className="text-green-400 text-sm">{success}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-[#E0526D] to-[#E09C52] text-white rounded-md hover:opacity-90 transition-all font-medium"
                    >
                        Send Reset Link
                    </button>
                </form>

                <p className="mt-6 text-sm text-center text-white/60">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-[#E0526D] hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
