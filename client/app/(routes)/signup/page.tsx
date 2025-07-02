'use client'

// import { signIn, useSession } from 'next-auth/react'
import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'// Google icon
import axios from 'axios'
import { useRouter } from 'next/navigation'
import type { AxiosResponse } from 'axios';
import Link from 'next/link'
import { signIn } from 'next-auth/react'


export default function SignUpPage() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const res: AxiosResponse = await axios.post('/api/signup-route', {
                name,
                email,
                password,
            })
            if (res.status === 201) {
                router.push('/')
            } else {
                setError('Something went wrong. Please try again.')
            }
        } catch (e) {
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                // Handle 400 Bad Request (email already exists)
                setError("Email already exist");
            } else {
                // Handle other errors
                setError('Something went wrong.');
            }
        }
    }


    const handleGoogleLogin = async () => {
        try {
            const result = await signIn("google", {
                redirect: false,
                callbackUrl: "/",
            });

            if (result?.ok && result.url) {
                router.push(result.url);
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
                <h1 className="text-2xl font-bold">Create your free account</h1>
                <p className="text-sm text-white/60">Connect to TubeIQ with:</p>

                <div className="space-y-2">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-2 bg-white text-black rounded-md py-2 font-medium cursor-pointer"
                    >
                        <FcGoogle className="w-6 h-6" />
                        Google
                    </button>

                    <hr className="border-white/20" />

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm text-white/80 mb-2">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-transparent border border-white/20 outline-none text-white placeholder-white/60 px-4 py-3 text-sm rounded-md focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-white/80 mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent border border-white/20 outline-none text-white placeholder-white/60 px-4 py-3 text-sm rounded-md focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all"
                                placeholder="youremail@email.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-white/80 mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent border border-white/20 outline-none text-white placeholder-white/60 px-4 py-3 text-sm rounded-md focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all"
                                placeholder="Enter a unique password"
                            />
                        </div>

                        {error && <p className="text-red-400 text-sm">{error}</p>}

                        <button
                            type="submit"
                            disabled={!email || !password}
                            className={`w-full mt-6 py-3 rounded-md font-medium transition-all ${email && password
                                ? 'bg-gradient-to-r from-[#E0526D] to-[#E09C52] text-white hover:opacity-90 cursor-pointer'
                                : 'bg-white/10 text-white/40 cursor-not-allowed'
                                }`}
                        >
                            Continue
                        </button>
                    </form>

                    <p className="text-sm text-center text-white/60">
                        Already have an account?{' '}
                        <Link href="/signin" className="text-[#E0526D] hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>

    )
}

