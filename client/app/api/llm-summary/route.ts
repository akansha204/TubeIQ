import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1', // Pointing to Groq

});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { transcriptSegment, type, tone } = body;

        if (!transcriptSegment) {
            return NextResponse.json({ error: 'Transcript segment is required' }, { status: 400 });
        }

        type Tone = 'casual' | 'formal' | 'funny' | 'professional' | 'student';

        const toneHints: Record<Tone, string> = {
            casual: "Use everyday language like you're talking to a friend.",
            formal: "Use professional and precise language.",
            funny: "Add humor or light-hearted expressions where appropriate.",
            professional: "Keep it clear, concise, and business-like.",
            student: "Use simple explanations and examples for easy learning.",
        };

        const prompt =
            type === 'clarify'
                ? `Please explain this part of the YouTube video in a **${tone}** tone. ${toneHints[tone]}\n\n"${transcriptSegment}"`
                : `Please summarize this part of the YouTube video in a **${tone}** tone. ${toneHints[tone]}\n\n"${transcriptSegment}"`;


        const completion = await openai.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                { role: 'system', content: 'You are a helpful assistant that understands YouTube video content.' },
                { role: 'user', content: prompt },
            ],
            temperature: 0.7,
        });

        const summary = completion.choices[0].message.content;

        return NextResponse.json({ summary });
    } catch (error) {
        console.error('LLM Error:', error);
        return NextResponse.json({ error: 'LLM summarization failed' }, { status: 500 });
    }
}
