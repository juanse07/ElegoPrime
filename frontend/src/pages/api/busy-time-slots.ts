import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { startTime, endTime } = req.query;

        if (!startTime || !endTime) {
            return res.status(400).json({ message: 'startTime and endTime are required' });
        }

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        if (!backendUrl) {
            console.error('NEXT_PUBLIC_BACKEND_URL is not configured');
            return res.status(500).json({ message: 'Backend URL is not configured' });
        }

        const url = `${backendUrl}/api/busy-time-slots?startTime=${startTime}&endTime=${endTime}`;
        console.log('Fetching from:', url);

        // Make the request to your backend API
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Backend API error:', {
                status: response.status,
                statusText: response.statusText,
                body: errorText
            });
            throw new Error(`Backend API responded with status: ${response.status}`);
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching busy time slots:', error);
        return res.status(500).json({ 
            message: 'Error fetching busy time slots',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
} 