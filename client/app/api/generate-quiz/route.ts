
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1',
});

export async function POST(req: NextRequest) {
    try {
        const { transcriptSegment } = await req.json();

        const prompt = `
From the below transcript, generate 5 multiple-choice quiz questions with:
- Question
- 4 options (a-d)
- One correct answer marked like "Correct Answer: b"

Transcript:
${transcriptSegment}
`;

        const response = await openai.chat.completions.create({
            model: 'llama3-8b-8192',
            messages: [
                { role: 'system', content: 'You are a helpful AI that creates educational quizzes from transcripts.' },
                { role: 'user', content: prompt },
            ],
        });

        const quizContent = response.choices[0].message.content;
        return NextResponse.json({ quiz: quizContent });
    } catch (err) {
        console.error('Quiz generation error:', err);
        return NextResponse.json({ error: 'Failed to generate quiz' }, { status: 500 });
    }
}
