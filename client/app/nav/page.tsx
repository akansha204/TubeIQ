'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function Navbar() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Navbar content goes here */}
            <header className="w-full bg-black border-b border-gray-800 ">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center position-sticky top-0 left-0 z-50">
                    <Link href="/" className="text-white font-bold text-xl">
                        TubeIQ
                    </Link>
                    <div className="flex gap-2">
                        <Link href="/signin">
                            <Button variant="outline" className="text-white border-white hover:cursor-pointer">
                                Log in
                            </Button>
                        </Link>
                        <Link href="/signup">
                            <Button variant="outline" className=" bg-gradient-to-r from-[#FFFFFE] via-[#FEFFFF] to-[#FEFFFF] bg-black text-white hover:cursor-pointer">
                                Sign up
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>
        </motion.div>

    )
}

