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

export const createBusyTimeSlot = async (req: Request, res: Response) => {
    try {
        const newSlot = await BusyTimeSlotModel.create(req.body);
        res.status(201).json(newSlot);
    } catch (error: unknown) {
        console.error('Error creating busy time slot:', error);
        res.status(500).json({ message: 'Error creating busy time slot' });
    }
};