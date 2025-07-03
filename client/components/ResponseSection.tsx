"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Toggle } from '@/components/ui/toggle'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FileText, Brain, Save, Copy, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'
import axios from 'axios'

interface ResponseSectionProps {
    transcript: string
    isFullTranscript?: boolean
    startTime?: string
    endTime?: string
    videoUrl?: string
    selectedTone?: string
}

export default function ResponseSection({
    transcript,
    isFullTranscript = false,
    startTime,
    endTime,
    videoUrl,
    selectedTone = 'casual'
}: ResponseSectionProps) {
    const [activeTab, setActiveTab] = useState<'summaries' | 'quizzes'>('summaries')
    const [summary, setSummary] = useState<string>('')
    const [quiz, setQuiz] = useState<string>('')
    const [isLoadingSummary, setIsLoadingSummary] = useState(false)
    const [isLoadingQuiz, setIsLoadingQuiz] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const generateSummary = async () => {
        if (!transcript) return

        setIsLoadingSummary(true)
        try {
            const response = await axios.post('/api/llm-summary', {
                transcriptSegment: transcript,
                type: 'summarize',
                tone: selectedTone
            })
            setSummary(response.data.summary)
            toast.success('Summary generated successfully!')
        } catch (error) {
            toast.error('Failed to generate summary')
            console.error('Summary generation error:', error)
        } finally {
            setIsLoadingSummary(false)
        }
    }

    const generateQuiz = async () => {
        if (!transcript) return

        setIsLoadingQuiz(true)
        try {
            const response = await axios.post('/api/generate-quiz', {
                transcriptSegment: transcript
            })
            setQuiz(response.data.quiz)
            toast.success('Quiz generated successfully!')
        } catch (error) {
            toast.error('Failed to generate quiz')
            console.error('Quiz generation error:', error)
        } finally {
            setIsLoadingQuiz(false)
        }
    }

    const handleCopy = () => {
        const content = activeTab === 'summaries' ? summary : quiz
        if (content) {
            navigator.clipboard.writeText(content)
            toast.success(`${activeTab === 'summaries' ? 'Summary' : 'Quiz'} copied to clipboard!`)
        } else {
            toast.error('Nothing to copy')
        }
    }

    const handleSave = async () => {
        const content = activeTab === 'summaries' ? summary : quiz
        if (!content) {
            toast.error('Nothing to save')
            return
        }

        setIsSaving(true)
        try {
            // Here you would implement saving to database
            // For now, we'll just show a success message
            await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
            toast.success(`${activeTab === 'summaries' ? 'Summary' : 'Quiz'} saved successfully!`)
        } catch (error) {
            toast.error('Failed to save')
        } finally {
            setIsSaving(false)
        }
    }

    const getDisplayContent = () => {
        if (activeTab === 'summaries') {
            if (isLoadingSummary) {
                return (
                    <div className="flex items-center justify-center h-32">
                        <div className="flex items-center gap-2 text-white/60">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Generating summary...
                        </div>
                    </div>
                )
            }
            if (!summary) {
                return (
                    <div className="flex flex-col items-center justify-center h-32 text-center">
                        <FileText className="w-8 h-8 text-white/40 mb-2" />
                        <p className="text-white/60 text-sm mb-3">Generate an AI-powered summary</p>
                        <Button
                            onClick={generateSummary}
                            size="sm"
                            className="bg-gradient-to-r from-[#E0526D] to-[#E09C52] text-white hover:opacity-90"
                        >
                            Generate Summary
                        </Button>
                    </div>
                )
            }
            return (
                <div className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap">
                    {summary}
                </div>
            )
        } else {
            if (isLoadingQuiz) {
                return (
                    <div className="flex items-center justify-center h-32">
                        <div className="flex items-center gap-2 text-white/60">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Generating quiz...
                        </div>
                    </div>
                )
            }
            if (!quiz) {
                return (
                    <div className="flex flex-col items-center justify-center h-32 text-center">
                        <Brain className="w-8 h-8 text-white/40 mb-2" />
                        <p className="text-white/60 text-sm mb-3">Generate an interactive quiz</p>
                        <Button
                            onClick={generateQuiz}
                            size="sm"
                            className="bg-gradient-to-r from-[#E0526D] to-[#E09C52] text-white hover:opacity-90"
                        >
                            Generate Quiz
                        </Button>
                    </div>
                )
            }
            return (
                <div className="text-white/90 text-sm leading-relaxed whitespace-pre-wrap">
                    {quiz}
                </div>
            )
        }
    }

    return (
        <div className="w-full max-w-4xl">
            <Card className="w-full bg-transparent border border-white/20 backdrop-blur-md shadow-xl">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-white" />
                            <h3 className="text-white font-semibold">AI Response</h3>
                            {isFullTranscript ? (
                                <span className="text-white/60 text-sm">(Full Video)</span>
                            ) : (startTime || endTime) ? (
                                <span className="text-white/60 text-sm">
                                    ({startTime || '00:00:00'} - {endTime || 'End'})
                                </span>
                            ) : null}
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={handleSave}
                                disabled={isSaving || (!summary && !quiz)}
                                variant="outline"
                                size="sm"
                                className="bg-white/10 border-white/20 text-white/80 hover:bg-white/20 disabled:opacity-50"
                            >
                                <Save className="w-4 h-4 mr-1" />
                                {isSaving ? 'Saving...' : 'Save'}
                            </Button>
                            <Button
                                onClick={handleCopy}
                                disabled={!summary && !quiz}
                                variant="outline"
                                size="sm"
                                className="bg-white/10 border-white/20 text-white/80 hover:bg-white/20 disabled:opacity-50"
                            >
                                <Copy className="w-4 h-4 mr-1" />
                                Copy
                            </Button>
                        </div>
                    </div>

                    {/* Toggle Controls */}
                    <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1 w-fit">
                        <Toggle
                            pressed={activeTab === 'summaries'}
                            onPressedChange={() => setActiveTab('summaries')}
                            className={cn(
                                "h-8 px-3 rounded-md text-sm transition-all",
                                activeTab === 'summaries'
                                    ? "bg-white/20 text-white shadow-sm"
                                    : "text-white/60 hover:text-white hover:bg-white/10"
                            )}
                        >
                            <FileText className="w-4 h-4 mr-1" />
                            Summaries
                        </Toggle>
                        <Toggle
                            pressed={activeTab === 'quizzes'}
                            onPressedChange={() => setActiveTab('quizzes')}
                            className={cn(
                                "h-8 px-3 rounded-md text-sm transition-all",
                                activeTab === 'quizzes'
                                    ? "bg-white/20 text-white shadow-sm"
                                    : "text-white/60 hover:text-white hover:bg-white/10"
                            )}
                        >
                            <Brain className="w-4 h-4 mr-1" />
                            Quizzes
                        </Toggle>
                    </div>
                </CardHeader>

                <CardContent className="pt-0">
                    {/* Fixed Height Content Area with Scroll */}
                    <div className="bg-white/5 rounded-lg h-80 overflow-hidden">
                        <div className="h-full overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="min-h-full"
                                >
                                    {getDisplayContent()}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
