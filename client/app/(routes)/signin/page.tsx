'use client'

import { signIn, useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from "next/navigation";
import { FcGoogle } from 'react-icons/fc'  // Google icon
import Link from 'next/link';


export default function SignInPage() {
    const router = useRouter();


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleCredentialsLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        })

        if (result?.error) {
            setError('Invalid email or password.')
        } else {
            router.push('/');
        }
    }

    const handleGoogleLogin = async () => {
        try {
            const result = await signIn("google", {
                redirect: false, // disables automatic redirect
                callbackUrl: "/", // optional, defaults to '/'
            });

            if (result?.ok && result.url) {
                router.push(result.url); // safe redirect
            } else {
                console.error("Google sign-in failed or was cancelled", result);
            }
        } catch (err) {
            console.error("Google login error:", err);
        }
    }

    return (
        <div className="min-h-screen text-white flex items-center justify-center px-4">
            <div className="max-w-sm w-full space-y-6">
                <h1 className="text-2xl font-bold">Log in to your account</h1>
                <p className="text-sm text-white/60">Connect to TubeIQ with:</p>

                {error && (
                    <div className="bg-red-800 text-red-200 px-4 py-2 rounded-md text-sm">
                        {error}
                    </div>
                )}

                <div className="space-y-2">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-2 bg-white text-black rounded-md py-2 font-medium cursor-pointer"
                        type="button"
                    >
                        <FcGoogle className="w-6 h-6" />
                        Google
                    </button>
                </div>

                <div className="flex items-center gap-2 text-white/40 text-xs">
                    <div className="flex-grow border-t border-white/20"></div>
                    <span>OR LOG IN WITH YOUR EMAIL</span>
                    <div className="flex-grow border-t border-white/20"></div>
                </div>

                <form onSubmit={handleCredentialsLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm text-white/80 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent border border-white/20 outline-none text-white placeholder-white/60 px-4 py-3 text-sm rounded-md focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all"
                            placeholder="youremail@email.com"
                            required
                        />
                    </div>

                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <label className="text-white/80">Password</label>
                            <Link href="/reset-page" className="text-[#E0526D] hover:underline">
                                Forgot Password?
                            </Link>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent border border-white/20 outline-none text-white placeholder-white/60 px-4 py-3 text-sm rounded-md focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={!email || !password}
                        className={`w-full mt-6 py-3 rounded-md font-medium transition-all ${email && password
                            ? 'bg-gradient-to-r from-[#E0526D] to-[#E09C52] text-white hover:opacity-90 cursor-pointer'
                            : 'bg-white/10 text-white/40 cursor-not-allowed'
                            }`}
                    >
                        Log in
                    </button>
                </form>

                <p className="text-sm text-center text-white/60">
                    New to TubeIQ?{' '}
                    <Link href="/signup" className="text-[#E0526D] hover:underline">
                        Sign up for an account
                    </Link>
                </p>
            </div>
        </div>

    )
}
