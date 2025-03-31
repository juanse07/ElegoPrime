import { Request, Response } from 'express';
import BusyTimeSlotModel from '../models/busyTimeSlot';

export const getBusyTimeSlots = async (req: Request, res: Response) => {
    try {
        const busyTimeSlots = await BusyTimeSlotModel.find();
        res.status(200).json(busyTimeSlots);
    } catch (error: unknown) {
        console.error('Error fetching busy time slots:', error);
        res.status(500).json({ message: 'Error fetching busy time slots' });
    }
};