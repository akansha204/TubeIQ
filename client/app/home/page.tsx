"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowUpIcon, LayoutDashboard, Sparkles, MonitorPlay, HelpCircle } from 'lucide-react'
import Footer from '@/components/footer'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogDescription,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export default function HomePage() {
    // State management for form data
    const [videoLink, setVideoLink] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [selectedTone, setSelectedTone] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleSubmit = () => {
        const formData = {
            videoLink,
            startTime,
            endTime,
            tone: selectedTone
        }
        console.log('Form submitted with data:', formData)
        // Here you would send the data to your server
        setIsDialogOpen(false)
    }

    const words = [
        {
            text: "Transform",
        },
        {
            text: "Your",
        },
        {
            text: "YouTube",
            className: "text-[#E0526D]",
        },
        {
            text: "Experience",
        },
        {
            text: "with",
        },
        {
            text: "TubeIQ.",
        },
    ];
    return (
        <div className="relative w-full min-h-screen">
            {/* Main content */}
            <header className="relative z-20 flex flex-col items-center w-full pt-20 pb-16 px-4">

                <TypewriterEffectSmooth words={words} />
                <p className="text-sm md:text-md text-center text-white/80 mb-5 max-w-2xl ">
                    TubeIQ harnesses the power of AI to summarize YouTube videos and create engaging quizzes.<br />
                    Tailor the tone, choose the timestamp, and get summaries in seconds. <br />
                    Access more features with an account.
                </p>

                {/* Input Card */}
                <div className="w-full max-w-2xl bg-white/10 rounded-xl shadow-lg p-4 md:p-6 flex flex-col gap-4 backdrop-blur-md">
                    {/* Top row - Input field */}
                    <div className="w-full">
                        <input
                            type="text"
                            placeholder="Enter your video link"
                            value={videoLink}
                            onChange={(e) => setVideoLink(e.target.value)}
                            className="w-full bg-transparent border border-white/20 outline-none text-white placeholder-white/60 px-4 py-3 text-sm md:text-base rounded-md focus:ring-2 focus:ring-white/40 focus:border-white/40 transition-all"
                        />
                    </div>

                    {/* Bottom row - Controls */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger className={cn(
                                'bg-white/10 text-white/80 px-4 py-2.5 rounded-md border border-white/20 outline-none hover:bg-white/20 transition-colors text-sm',
                                (startTime || endTime) ? 'flex-1 sm:min-w-[200px]' : 'flex-1 sm:flex-none whitespace-nowrap'
                            )}>
                                {(startTime || endTime) ?
                                    `${startTime || '00:00:00'} - ${endTime || '00:00:00'}` :
                                    'Add Timestamp'
                                }
                            </DialogTrigger>
                            <DialogContent className="font-inter">
                                <DialogHeader>
                                    <DialogTitle className="text-center">Add Timestamp</DialogTitle>
                                    <DialogDescription className='text-center'>
                                        Add the Timestamps in HH:MM:SS format.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 mt-4">
                                    <div>
                                        <label className="block text-white/80 text-sm mb-2">Start Time</label>
                                        <Input
                                            placeholder="00:00:00"
                                            value={startTime}
                                            onChange={(e) => setStartTime(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white/80 text-sm mb-2">End Time</label>
                                        <Input
                                            placeholder="00:00:00"
                                            value={endTime}
                                            onChange={(e) => setEndTime(e.target.value)}
                                        />
                                    </div>
                                    <Button
                                        onClick={handleSubmit}
                                        className="w-full bg-gradient-to-r from-[#E0526D] to-[#E09C52] text-white hover:opacity-90 transition-opacity mt-6"
                                    >
                                        Summarize
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>

                        <Select value={selectedTone} onValueChange={setSelectedTone}>
                            <SelectTrigger className={cn(
                                'bg-white/10 border-white/20 text-white/80 hover:bg-white/20 transition-colors h-[42px] w-full',
                                (startTime || endTime) ? 'sm:w-[130px]' : 'sm:w-[160px]'
                            )}>
                                <SelectValue placeholder="Select Tone" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="casual">Casual</SelectItem>
                                <SelectItem value="funny">Funny</SelectItem>
                                <SelectItem value="formal">Formal</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button
                            size="lg"
                            onClick={handleSubmit}
                            className="bg-gradient-to-r from-[#E0526D] to-[#E09C52] text-white w-full sm:w-12 h-12 flex items-center justify-center rounded-md shadow-md hover:opacity-90 transition-opacity sm:ml-auto sm:flex-shrink-0"
                        >
                            <ArrowUpIcon className="w-6 h-6" />
                        </Button>
                    </div>
                </div>
            </header>
            {/* </div> */}

            {/* Why Choose TubeIQ Section */}
            <section className="relative z-20 w-full flex flex-col items-center justify-center mt-24 px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Why Choose TubeIQ?</h2>
                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {/* Personalized Dashboard */}
                    <div className="relative flex flex-col items-start justify-center rounded-xl p-8 min-h-[160px] bg-transparent hover:bg-white/5 hover:border hover:border-white/40 transition group">
                        <div className="flex items-center mb-2">
                            <span className="mr-3"><LayoutDashboard className='w-7 h-7 text-white' /></span>
                            <span className="text-xl font-semibold text-white">Personalized Dashboard</span>
                        </div>
                        <p className="text-white/80 text-sm max-w-md">Access and manage all your saved summaries and quizzes in one smart, organized space.</p>
                    </div>
                    {/* AI-Summarization */}
                    <div className="relative flex flex-col items-start justify-center rounded-xl p-8 min-h-[160px] bg-transparent hover:bg-white/5 hover:border hover:border-white/40 transition group">
                        <div className="flex items-center mb-2">
                            <span className="mr-3"><Sparkles className='w-7 h-7 text-white' /></span>
                            <span className="text-xl font-semibold text-white">AI-Summarization</span>
                        </div>
                        <p className="text-white/80 text-sm max-w-md">Get concise, tone-tailored summaries from any YouTube video — instantly and intelligently.</p>
                    </div>
                </div>
                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    {/* Smart Learning */}
                    <div className="relative flex flex-col items-start justify-center rounded-xl p-8 min-h-[120px] bg-transparent hover:bg-white/5 hover:border hover:border-white/40 transition group">
                        <div className="flex items-center mb-2">
                            <span className="mr-3"><MonitorPlay className='w-7 h-7 text-white' /></span>
                            <span className="text-xl font-semibold text-white">Smart Learning</span>
                        </div>
                        <p className="text-white/80 text-sm max-w-md">Learn more effectively with custom video segments, summaries, and MCQ quizzes designed just for you.</p>
                    </div>
                    {/* Interactive-Quizzes */}
                    <div className="relative flex flex-col items-start justify-center rounded-xl p-8 min-h-[120px] bg-transparent hover:bg-white/5 hover:border hover:border-white/40 transition group">
                        <div className="flex items-center mb-2">
                            <span className="mr-3"><HelpCircle className='w-7 h-7 text-white' /></span>
                            <span className="text-xl font-semibold text-white">Interactive-Quizzes</span>
                        </div>
                        <p className="text-white/80 text-sm max-w-md">Test your understanding with AI-generated multiple-choice quizzes based on video content.</p>
                    </div>
                </div>
            </section>


            {/* Use Cases Section */}
            <section className="relative z-20 w-full flex flex-col items-center justify-center px-4 mb-24">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-left w-full max-w-5xl">Use Cases for free AI summarizer?</h2>
                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1: Students */}
                    <div className="bg-white/5 rounded-xl overflow-hidden shadow-lg flex flex-col">
                        <img src="/pexels-buro-millennial-636760-1438081 1.png" alt="Students" className="w-full h-48 object-cover" />
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-lg font-semibold text-white mb-2">Students: Efficient Lecture Review</h3>
                            <p className="text-white/80 text-sm">Students can use TubeIQ to quickly summarize long educational videos into key takeaways. This helps them absorb information faster, review content without rewatching, and create concise study guides for exams.</p>
                        </div>
                    </div>
                    {/* Card 2: Content Creators */}
                    <div className="bg-white/5 rounded-xl overflow-hidden shadow-lg flex flex-col">
                        <img src="/COntent creator.png" alt="Content Creators" className="w-full h-48 object-cover" />
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-lg font-semibold text-white mb-2">Content Creators: Script Planning Made Simple</h3>
                            <p className="text-white/80 text-sm">YouTubers and content creators can instantly convert complex videos into summaries for easier research, repurposing, or scripting. TubeIQ accelerates ideation and lets creators focus more on content and less on manual note-taking.</p>
                        </div>
                    </div>
                    {/* Card 3: Researchers */}
                    <div className="bg-white/5 rounded-xl overflow-hidden shadow-lg flex flex-col">
                        <img src="/1000012870 1.png" alt="Researchers" className="w-full h-48 object-cover" />
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-lg font-semibold text-white mb-2">Researchers: Speed Up Literature Reviews</h3>
                            <p className="text-white/80 text-sm">Researchers can save hours by summarizing interviews, webinars, or academic talks with TubeIQ. It helps them extract insights fast, making it easier to search through large volumes of video content for relevant material.</p>
                        </div>
                    </div>
                </div>
            </section>
            <hr />
            <section className="relative z-20 w-full flex flex-col items-center justify-center px-4 mb-24">
                <h1 className="text-2xl text-center md:text-4xl py-4 font-bold text-white mb-10 w-full max-w-5xl">Frequently Asked Questions (FAQs) </h1>
                <Accordion type="multiple" className="w-full max-w-4xl mx-auto">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            What formats can I download my summaries in?
                        </AccordionTrigger>
                        <AccordionContent>
                            You can download summaries as PDF, Markdown, or Plain Text.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>
                            What kind of quizzes does TubeIQ generate?
                        </AccordionTrigger>
                        <AccordionContent>
                            TubeIQ creates multiple-choice quizzes (MCQs) based on the summarized video content.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Is TubeIQ free to use?</AccordionTrigger>
                        <AccordionContent>
                            Yes, the core features are free. Creating an account unlocks saving and downloading options.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger>
                            Can I summarize just a part of a video?
                        </AccordionTrigger>
                        <AccordionContent>
                            Absolutely! You can set custom timestamps to summarize specific segments only.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>

            <Footer />
        </div>
    )
}
