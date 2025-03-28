import { InferSchemaType, model, Schema } from 'mongoose';

const NewServiceRequestSchema = new Schema({
    serviceType: {
        type: String,
        enum: [
            'Fan/lamp ceiling mounting',
            'Furniture/Murphy bed assembly',
            'Wall Fixture Setup',
            'Tv install',
            'Security',
            'SoundBars/Videobeam',
            'Faucet/Toilet',
            'Interior/Exterior Painting',
            'Multiple services',
        ],
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    ceilingHeight: {
        type: String,
        trim: true,
    },
    numberOfItems: {
        type: Number,
        trim: true,
    },
    tvInches: {
        type: String,
        trim: true,
    },
    additionalInfo: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        enum: ['pending', 'answered', 'approved'],
        default: 'pending',
        required: true,
    },
    image1Path: {
        type: String,
        trim: true,
        required: true,
    },
    image2Path: {
        type: String,
        trim: true,
        required: true,
    },
    requestedDate: {
        type: Date,
        required: false,
    },
}, { timestamps: true });

// Inference for the schema
type NewServiceRequest = InferSchemaType<typeof NewServiceRequestSchema>;

// Export the Mongoose model
export default model<NewServiceRequest>('NewServiceRequest', NewServiceRequestSchema);
//renamed to newservicerequest