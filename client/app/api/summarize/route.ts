import { NextResponse } from 'next/server';
import { getTranscriptByRange } from '@/lib/fetchTranscript';


export async function POST(req: Request) {
    try {
        const { youtubeUrl, start, end } = await req.json();
        const validHost = youtubeUrl.includes('youtube.com') || youtubeUrl.includes('youtu.be');


        if (!youtubeUrl || !validHost) {
            return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
        }

        // Convert timestamp (hh:mm:ss) to seconds
        const startSeconds = timestampToSeconds(start);
        const endSeconds = timestampToSeconds(end);
        const videoId = extractVideoId(youtubeUrl);

        console.log('API Debug:', {
            youtubeUrl,
            start,
            end,
            startSeconds,
            endSeconds,
            videoId
        });

        if (!videoId) {
            return NextResponse.json({ error: 'Could not extract video ID from URL' }, { status: 400 });
        }

        // If no timestamps provided, fetch the entire transcript
        const transcriptText = await getTranscriptByRange(videoId, startSeconds, endSeconds);

        if (!transcriptText) {
            return NextResponse.json({
                error: 'Could not fetch transcript. Note: This is currently using mock data for demonstration. YouTube has restricted third-party access to transcripts.',
                videoId,
                debugInfo: {
                    startSeconds,
                    endSeconds,
                    hasTimestamps: !!(start || end)
                }
            }, { status: 500 });
        }

        return NextResponse.json({
            message: 'YouTube URL and timestamp received',
            videoId,
            startSeconds,
            endSeconds,
            transcriptText,
            isFullTranscript: !start && !end
        });
    } catch (error) {
        console.error('Error in /api/summarize:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
function timestampToSeconds(timestamp: string | null | undefined): number | null {
    if (!timestamp || timestamp.trim() === '') return null;

    try {
        const parts = timestamp.split(':').map(Number);
        if (parts.some(isNaN)) return null; // Check if any part is NaN

        if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
        if (parts.length === 2) return parts[0] * 60 + parts[1];
        return Number(parts[0]);
    } catch (error) {
        console.error('Error parsing timestamp:', timestamp, error);
        return null;
    }
}

function extractVideoId(url: string) {
    try {
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname;

        // https://www.youtube.com/watch?v=VIDEO_ID
        if (hostname.includes('youtube.com')) {
            return parsedUrl.searchParams.get('v');
        }

        // https://youtu.be/VIDEO_ID
        if (hostname === 'youtu.be') {
            return parsedUrl.pathname.slice(1);
        }

        return null;
    } catch {
        return null;
    }
}

