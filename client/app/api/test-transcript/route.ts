import { NextResponse } from 'next/server';
import { getTranscriptByRange } from '@/lib/fetchTranscript';

export async function GET() {
    // Test with a few known videos that should have transcripts
    const testVideos = [
        { id: 'dQw4w9WgXcQ', name: 'Rick Roll' },
        { id: 'TQMbvJNRpLE', name: 'TED talk' },
        { id: '9bZkp7q19f0', name: 'PSY - Gangnam Style' },
        { id: 'kJQP7kiw5Fk', name: 'Luis Fonsi - Despacito' },
    ];

    const results = [];

    for (const video of testVideos) {
        try {
            console.log(`Testing video: ${video.name} (${video.id})`);
            const transcript = await getTranscriptByRange(video.id);
            results.push({
                videoId: video.id,
                name: video.name,
                success: !!transcript,
                transcriptLength: transcript?.length || 0,
                preview: transcript ? transcript.substring(0, 100) + '...' : 'No transcript'
            });
        } catch (error) {
            results.push({
                videoId: video.id,
                name: video.name,
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    return NextResponse.json({
        message: 'Transcript test results',
        results
    });
}
