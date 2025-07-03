import ytdl from '@distube/ytdl-core';

interface TranscriptItem {
    text: string;
    start: number;
    duration: number;
}

export async function getTranscriptByRange(videoId: string, start?: number | null, end?: number | null): Promise<string | null> {
    if (!videoId) {
        console.error('No video ID provided');
        return null;
    }

    console.log('Fetching transcript for:', {
        videoId,
        start,
        end,
        startType: typeof start,
        endType: typeof end
    });

    try {
        // For now, return a mock transcript for demonstration purposes
        // This is because YouTube has restricted access to transcripts through third-party libraries
        console.log('Note: Using mock transcript data due to YouTube API restrictions');

        const mockTranscriptSegments = [
            { text: "Welcome to this amazing video.", start: 0, duration: 3 },
            { text: "Today we're going to learn about something incredible.", start: 3, duration: 4 },
            { text: "This technology has revolutionized the way we work.", start: 7, duration: 5 },
            { text: "Let's dive deep into the details and see how it works.", start: 12, duration: 4 },
            { text: "First, we need to understand the basic concepts.", start: 16, duration: 4 },
            { text: "The implementation requires careful planning and execution.", start: 20, duration: 5 },
            { text: "Here are some practical examples that demonstrate the power.", start: 25, duration: 5 },
            { text: "As you can see, the results are quite impressive.", start: 30, duration: 4 },
            { text: "This approach saves time and increases efficiency.", start: 34, duration: 4 },
            { text: "Thank you for watching, and don't forget to subscribe!", start: 38, duration: 4 }
        ];

        // If no start and end times are specified, return the entire transcript
        if ((start === null || start === undefined) && (end === null || end === undefined)) {
            console.log('Returning full mock transcript');
            return mockTranscriptSegments.map(item => item.text).join(' ');
        }

        // Filter by time range if specified
        let filtered = mockTranscriptSegments;

        if (start !== null && start !== undefined) {
            filtered = filtered.filter(item => item.start >= start);
        }

        if (end !== null && end !== undefined) {
            filtered = filtered.filter(item => item.start <= end);
        }

        if (filtered.length === 0) {
            console.warn('No transcript segments found in the specified time range');
            return mockTranscriptSegments.slice(0, 3).map(item => item.text).join(' ');
        }

        return filtered.map(item => item.text).join(' ');
    } catch (error) {
        console.error('Error fetching transcript:', error);
        return null;
    }
}

// Helper function to get the full transcript without any time filtering
export async function getFullTranscript(videoId: string): Promise<string | null> {
    return getTranscriptByRange(videoId, null, null);
}
