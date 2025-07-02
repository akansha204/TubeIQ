import React from 'react'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="relative z-20 w-full bg-black/5 border-t border-white/10">
            {/* Call to Action Section */}
            <section className="w-full flex flex-col items-center justify-center px-4 py-16">
                <div className="max-w-4xl text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Ready to transform the way you learn from YouTube?
                    </h2>
                    <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                        Unlock instant AI-powered summaries and quizzes tailored to your learning style. Save, download, and revisit—all in one place.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/signup">
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-[#E0526D] to-[#E09C52] text-white hover:opacity-90 transition-opacity px-8 py-3 cursor-pointer"
                            >
                                Get Started for free →
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-white/40 text-white hover:bg-white/10 px-8 py-3 cursor-pointer"
                            >
                                Try out demo video
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer Bottom */}
            <div className="border-t border-white/10 px-4 py-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-white/60 text-sm">
                        © 2025 TubeIQ. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                        <span>Made with</span>
                        <Heart className="w-4 h-4 text-red-500 fill-current" />
                        <span>by Akansha</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
