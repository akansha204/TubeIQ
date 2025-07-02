"use client";
import { useState } from 'react'
import { useParams, } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link';

export default function ResetPasswordPage() {
    const params = useParams()
    const token = params.token;

    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (password !== confirm) {
            setError("Passwords don't match")
            return
        }
        try {
            const res = await axios.post('/api/update-password', {
                token: token,
                newPassword: password,
            });

            setSuccess('Password reset successfully! You can now log in.');
            setError('');
        } catch (error: any) {
            const message =
                error.response?.data?.message || 'Something went wrong';
            setError(message);
            setSuccess('');
        }

    }

    return (
        <div className="min-h-screen text-white flex items-center justify-center p-4">
            <div className="p-8 rounded-2xl w-full max-w-md">
                <h1 className="text-2xl font-bold text-white mb-2 text-center">
                    Set a New Password
                </h1>
                <p className="text-white/60 text-center mb-6">
                    Enter your new password below.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <p className="text-red-400 text-sm text-center">{error}</p>
                    )}
                    {success && (
                        <p className="text-green-400 text-sm text-center">{success}</p>
                    )}
                    <div>
                        <label className="block text-white/80 text-sm mb-2" htmlFor="password">
                            New Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent border border-white/20 outline-none text-white placeholder-white/60 px-4 py-3 text-sm rounded-md focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all"
                            placeholder="••••••••••"
                        />
                    </div>
                    <div>
                        <label className="block text-white/80 text-sm mb-2" htmlFor="confirm">
                            Confirm Password
                        </label>
                        <input
                            id="confirm"
                            type="password"
                            required
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            className="w-full bg-transparent border border-white/20 outline-none text-white placeholder-white/60 px-4 py-3 text-sm rounded-md focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all"
                            placeholder="••••••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-[#E0526D] to-[#E09C52] text-white font-medium py-3 rounded-md hover:opacity-90 transition-all"
                    >
                        Update Password
                    </button>
                </form>
                <p className="text-white/60 text-center mt-6">
                    Remembered your password?{' '}
                    <Link href="/signin" className="text-[#E0526D] hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    )
}
