import mongoose, { Document, Schema } from 'mongoose';

export interface IBusyTimeSlot extends Document {
  date: Date;
  startTime: string;
  endTime: string;
  title?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BusyTimeSlotSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBusyTimeSlot>('BusyTimeSlot', BusyTimeSlotSchema); 