import { YoutubeTranscript, TranscriptResponse } from 'youtube-transcript';

interface TranscriptItem {
    text: string;
    offset: number;
    start: number;
    duration: number;
}

export async function getTranscriptByRange(videoId: string, start: number, end: number): Promise<string | null> {
    if (!videoId) {
        console.error('No video ID provided');
        return null;
    }

    try {
        const transcript = await YoutubeTranscript.fetchTranscript(videoId);

        if (!transcript || transcript.length === 0) {
            console.error('No transcript available for video:', videoId);
            return null;
        }

        const filtered = transcript.filter((item: TranscriptResponse) => {
            const itemStart = item.offset ?? 0;
            return itemStart >= start && itemStart <= end;
        });

        if (filtered.length === 0) {
            console.warn('No transcript segments found in the specified time range');
            return null;
        }

        return filtered.map(item => item.text).join(' ');
    } catch (error) {
        console.error('Error fetching transcript:', error);
        return null;
    }
}
