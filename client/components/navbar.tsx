'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SilverButton } from '@/components/ui/silver-button'
import { motion } from 'framer-motion'

export default function Navbar() {
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

                    {/* Navigation Buttons */}
                    <div className="flex items-center gap-3">
                        <Link href="/signin">
                            <SilverButton
                                variant="light"
                                className="font-medium"
                            >
                                Log in
                            </SilverButton>
                        </Link>
                        <Link href="/signup">
                            <SilverButton
                                variant="default"
                                className="font-medium"
                            >
                                Sign up
                            </SilverButton>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.nav>
    )
}

export { Navbar }
