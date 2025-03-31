import { RequestHandler } from 'express';
import BusyTimeSlotModel from '../models/busyTimeSlot';

export const getBusyTimeSlots: RequestHandler = async (req, res) => {
    try {
        const { startTime, endTime } = req.query;
        
        console.log('Received query params:', { startTime, endTime });
        
        if (!startTime || !endTime) {
            console.log('Missing required parameters');
            res.status(400).json({ message: 'startTime and endTime are required' });
            return;
        }

        const queryStartTime = new Date(startTime as string);
        queryStartTime.setHours(0, 0, 0, 0);  // Start of day
        const queryEndTime = new Date(endTime as string);
        queryEndTime.setHours(23, 59, 59, 999);  // End of day
        
        console.log('Parsed query dates:', {
            queryStartTime: queryStartTime.toISOString(),
            queryEndTime: queryEndTime.toISOString()
        });

        // First get all slots to see what's in the database
        const allSlots = await BusyTimeSlotModel.find({}).sort({ startTime: 1 });
        console.log('All slots in database:', JSON.stringify(allSlots, null, 2));

        // Then get the filtered slots with limited fields
        const busySlots = await BusyTimeSlotModel.find({
            $or: [
                { startTime: { $lte: queryEndTime } },
                { endTime: { $gte: queryStartTime } }
            ]
        })
        .select('startTime endTime') // Only select necessary fields
        .sort({ startTime: 1 });

        // Log only the time ranges without personal info
        console.log('Found busy slots:', busySlots.map(slot => ({
            timeRange: `${new Date(slot.startTime).toLocaleTimeString()} - ${new Date(slot.endTime).toLocaleTimeString()}`
        })));
        
        res.status(200).json(busySlots);
    } catch (error: unknown) {
        console.error('Error fetching busy time slots:', error);
        res.status(500).json({ message: 'Error fetching busy time slots' });
    }
};

export const createBusyTimeSlot: RequestHandler = async (req, res) => {
    try {
        const { startTime, endTime, title, description } = req.body;
        
        // Validate required fields
        if (!startTime || !endTime || !title) {
            res.status(400).json({ 
                message: 'Missing required fields: startTime, endTime, and title are required' 
            });
            return;
        }
        
        // Create new slot with parsed dates
        const newSlot = await BusyTimeSlotModel.create({
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            title,
            description: description || ''
        });
        
        res.status(201).json(newSlot);
    } catch (error: unknown) {
        console.error('Error creating busy time slot:', error);
        res.status(500).json({ message: 'Error creating busy time slot' });
    }
};

export const deleteBusyTimeSlot: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSlot = await BusyTimeSlotModel.findByIdAndDelete(id);
        
        if (!deletedSlot) {
            res.status(404).json({ message: 'Busy time slot not found' });
            return;
        }
        
        res.status(204).send();
    } catch (error: unknown) {
        console.error('Error deleting busy time slot:', error);
        res.status(500).json({ message: 'Error deleting busy time slot' });
    }
};

export const updateBusyTimeSlot: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const { startTime, endTime, title, description } = req.body;
        
        const updatedSlot = await BusyTimeSlotModel.findByIdAndUpdate(
            id,
            {
                startTime: startTime ? new Date(startTime) : undefined,
                endTime: endTime ? new Date(endTime) : undefined,
                title,
                description
            },
            { new: true }
        );
        
        if (!updatedSlot) {
            res.status(404).json({ message: 'Busy time slot not found' });
            return;
        }
        
        res.status(200).json(updatedSlot);
    } catch (error: unknown) {
        console.error('Error updating busy time slot:', error);
        res.status(500).json({ message: 'Error updating busy time slot' });
    }
};