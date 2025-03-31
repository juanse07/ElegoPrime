import { RequestHandler } from 'express';
import BusyTimeSlotModel from '../models/busyTimeSlot';

interface BusyTimeQuery {
    startTime?: {
        $gte: Date;
        $lte: Date;
    };
}

export const getBusyTimeSlots: RequestHandler = async (req, res) => {
    try {
        const { startTime, endTime } = req.query;
        
        const query: BusyTimeQuery = {};
        
        if (startTime && endTime) {
            query.startTime = {
                $gte: new Date(startTime as string),
                $lte: new Date(endTime as string)
            };
        }
        
        const busyTimeSlots = await BusyTimeSlotModel.find(query).sort({ startTime: 1 });
        res.status(200).json(busyTimeSlots);
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