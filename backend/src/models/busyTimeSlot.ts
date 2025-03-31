import mongoose, { Document, Schema } from 'mongoose';

export interface IBusyTimeSlot extends Document {
  startTime: Date;
  endTime: Date;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BusyTimeSlotSchema: Schema = new Schema(
  {
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBusyTimeSlot>('BusyTimeSlot', BusyTimeSlotSchema);