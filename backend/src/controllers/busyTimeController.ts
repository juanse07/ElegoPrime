import { RequestHandler } from 'express';
import BusyTimeSlotModel from '../models/busyTimeSlot';

export const getBusyTimeSlots: RequestHandler = async (req, res) => {
    try {
        const { startTime, endTime } = req.query;
        
        console.log('Received query params for busy time slots:', { 
            startTime, 
            endTime,
            rawStartTime: startTime ? new Date(startTime as string).toString() : 'invalid',
            rawEndTime: endTime ? new Date(endTime as string).toString() : 'invalid'
        });
        
        if (!startTime || !endTime) {
            console.log('Missing required parameters');
            res.status(400).json({ message: 'startTime and endTime are required' });
            return;
        }

        // Create dates from the query params - these are already in UTC from frontend
        const queryStartTime = new Date(startTime as string);
        const queryEndTime = new Date(endTime as string);
        
        console.log('Query times in UTC:', {
            queryStartTime: queryStartTime.toISOString(),
            queryEndTime: queryEndTime.toISOString(),
            queryStartTimeLocal: queryStartTime.toLocaleString('en-US', { timeZone: 'America/Denver' }),
            queryEndTimeLocal: queryEndTime.toLocaleString('en-US', { timeZone: 'America/Denver' })
        });

        // Get all busy slots for debugging
        const allBusySlots = await BusyTimeSlotModel.find({})
            .select('startTime endTime title')
            .sort({ startTime: 1 });
            
        console.log('All busy slots in database:', allBusySlots.length);
        allBusySlots.forEach(slot => {
            console.log('DB Slot:', {
                id: slot._id,
                title: slot.title,
                start: new Date(slot.startTime).toISOString(),
                startFormatted: new Date(slot.startTime).toLocaleString(),
                end: new Date(slot.endTime).toISOString(),
                endFormatted: new Date(slot.endTime).toLocaleString()
            });
        });

        // Find busy slots that overlap with the requested time range
        const busySlots = await BusyTimeSlotModel.find({
            $or: [
                // Slot starts during the requested range
                {
                    startTime: {
                        $gte: queryStartTime,
                        $lt: queryEndTime
                    }
                },
                // Slot ends during the requested range
                {
                    endTime: {
                        $gt: queryStartTime,
                        $lte: queryEndTime
                    }
                },
                // Slot spans the entire requested range
                {
                    startTime: { $lt: queryStartTime },
                    endTime: { $gt: queryEndTime }
                }
            ]
        })
        .select('startTime endTime title description')
        .sort({ startTime: 1 });

        console.log('Found overlapping busy slots:', busySlots.length);
        busySlots.forEach(slot => {
            console.log('Matching slot:', {
                id: slot._id,
                title: slot.title,
                startUTC: new Date(slot.startTime).toISOString(),
                startDenver: new Date(slot.startTime).toLocaleString('en-US', { timeZone: 'America/Denver' }),
                endUTC: new Date(slot.endTime).toISOString(),
                endDenver: new Date(slot.endTime).toLocaleString('en-US', { timeZone: 'America/Denver' })
            });
        });
        
        // Format the busy slots to ensure consistent date format
        const formattedBusySlots = busySlots.map(slot => ({
            _id: slot._id,
            title: slot.title,
            description: slot.description,
            startTime: new Date(slot.startTime).toISOString(),
            endTime: new Date(slot.endTime).toISOString()
        }));
        
        res.status(200).json(formattedBusySlots);
    } catch (error: unknown) {
        console.error('Error fetching busy time slots:', error);
        res.status(500).json({ message: 'Error fetching busy time slots' });
    }
};

export const createBusyTimeSlot: RequestHandler = async (req, res) => {
    try {
        const { startTime, endTime, title, description } = req.body;
        
        console.log('Creating busy time slot with input:', {
            startTime,
            endTime,
            title,
            description
        });
        
        // Validate required fields
        if (!startTime || !endTime || !title) {
            res.status(400).json({ 
                message: 'Missing required fields: startTime, endTime, and title are required' 
            });
            return;
        }
        
        // Parse dates explicitly and normalize to ISO
        const parsedStartTime = new Date(startTime);
        const parsedEndTime = new Date(endTime);
        
        console.log('Parsed dates:', {
            parsedStartTime: parsedStartTime.toISOString(),
            parsedEndTime: parsedEndTime.toISOString(),
            localStartTime: parsedStartTime.toString(),
            localEndTime: parsedEndTime.toString()
        });
        
        // Create new slot with parsed dates
        const newSlot = await BusyTimeSlotModel.create({
            startTime: parsedStartTime,
            endTime: parsedEndTime,
            title,
            description: description || ''
        });
        
        console.log('Created busy time slot:', {
            id: newSlot._id,
            startTime: new Date(newSlot.startTime).toISOString(), 
            startTimeFormatted: new Date(newSlot.startTime).toLocaleString(),
            endTime: new Date(newSlot.endTime).toISOString(),
            endTimeFormatted: new Date(newSlot.endTime).toLocaleString(),
            title: newSlot.title
        });
        
        // Return normalized ISO format dates
        const formattedSlot = {
            _id: newSlot._id,
            title: newSlot.title,
            description: newSlot.description,
            startTime: new Date(newSlot.startTime).toISOString(),
            endTime: new Date(newSlot.endTime).toISOString(),
            createdAt: newSlot.createdAt,
            updatedAt: newSlot.updatedAt
        };
        
        res.status(201).json(formattedSlot);
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