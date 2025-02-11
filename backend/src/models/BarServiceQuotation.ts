import { InferSchemaType, model, Schema } from 'mongoose';

const BarServiceQuotationSchema = new Schema({
    clientName: { // Name of the client or company
        type: String,
        required: true,
        trim: true
    },
    companyName: { // Optional field if a company is hiring
        type: String,
        trim: true
    },
    email: { // Email of the client
        type: String,
        required: true,
        trim: true
    },
    phone: { // Phone number of the client
        type: String,
        trim: true
    },
    address: { // Event location
        type: String,
        trim: true
    },
    eventDate: { // Date of the event
        type: Date,
        
    },
    startTime: { // Start time of the service
        type: String,
        required: true
    },
    endTime: { // End time of the service
        type: String,
        required: true
    },
    numberOfGuests: { // Approximate number of guests
        type: Number,
        required: true
    },
    servicesRequested: { // Additional services, e.g., bartending, cocktails, etc.
        type: [String], // Array of strings for multiple services
        default: []
    },
    notes: { // Any additional notes or instructions
        type: String,
        trim: true
    },
    state: { // State of the quotation, e.g., pending, accepted, rejected
        type: String,
        enum: ['pending', 'answered', 'approved'],
        default: 'pending',
        required: true
      
    }
  
},{timestamps: true});

type BarServiceQuotation = InferSchemaType<typeof BarServiceQuotationSchema>;

export default model<BarServiceQuotation>('BarServiceQuotations', BarServiceQuotationSchema);