import { InferSchemaType, model, Schema } from 'mongoose';

const NewEstimateSchema = new Schema({
    eventType:{
        type:String,
      
        trim:true
    },
    eventTypeOther:{
        type:String,
        trim:true
    },
    guestCount:{
        type:String,
       
        trim:true
    },
    guestCountOther:{
        type:String,
        trim:true
    },
    eventDate:{
        type:Date,
    },
    otherDate:{
        type:String,
        trim:true

    },
    eventTime:{
        type:String,
        required:true
    },
    contactName:{
        type:String,
       
        trim:true
    },
    contactEmail:{
        type:String,
     
        trim:true
    },
    contactPhone:{
        type:String,
      
        trim:true
    },
    eventLocation:{
        type:String,
        trim:true
    },
    notes:{
        type:String,
        trim:true
    },
    state: { // State of the quotation, e.g., pending, accepted, rejected
        type: String,
        enum: ['pending', 'answered', 'approved'],
        default: 'pending',
        required: true
      
    }
},{timestamps: true});

type NewStimate = InferSchemaType<typeof NewEstimateSchema>;
export default model<NewStimate>('NewEstimate', NewEstimateSchema);