import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const data = req.body;

        // Validate required fields
        const requiredFields = ['serviceType', 'zipCode', 'name', 'phone'];
        const missingFields = requiredFields.filter(field => !data[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({
                message: `Missing required fields: ${missingFields.join(', ')}`
            });
        }

        // Here you would typically save to your database
        // For now, we'll just return success
        console.log('Received service request:', data);

        return res.status(201).json({
            message: 'Service request created successfully',
            data: {
                ...data,
                id: Date.now().toString(), // Temporary ID
                createdAt: new Date().toISOString(),
            }
        });
    } catch (error) {
        console.error('Error processing service request:', error);
        return res.status(500).json({
            message: 'Error processing service request'
        });
    }
} 