'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useSession, signIn, signOut } from 'next-auth/react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "lucide-react";



export default function Navbar() {
    const { data: session } = useSession();
    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="sticky top-0 z-50 w-full bg-black border-b border-gray-800"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-white font-bold text-xl tracking-wide hover:text-gray-300 transition-colors duration-200"
                    >
                        TubeIQ
                    </Link>
                    {session?.user ? (
                        <div>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar>
                                        <AvatarImage src={session?.user?.image || ""} />
                                        <AvatarFallback>
                                            <User className="h-6 w-6" />
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Hello {session?.user?.name}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Link href="/userDashboard" target="_blank" rel="noopener noreferrer">User Dashboard</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => signOut({
                                        callbackUrl: "/",
                                    })}>Log out</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href="/signin">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-white/40 text-white hover:bg-white/10 px-4 py-3"
                                >
                                    Log In
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-[#E0526D] to-[#E09C52] text-white hover:opacity-90 transition-opacity px-4 py-3"
                                >
                                    Get Started →
                                </Button>
                            </Link>
                        </div>
                    )}


                </div>
            </div>
        </motion.nav>
    )
}

export { Navbar }
