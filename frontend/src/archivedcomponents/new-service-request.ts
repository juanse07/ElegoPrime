// import mongoose from 'mongoose';
// import { NextApiRequest, NextApiResponse } from 'next';

// // Define the ServiceRequest Schema
// const ServiceRequestSchema = new mongoose.Schema({
//     serviceType: { type: String, required: true },
//     zipCode: { type: String, required: true },
//     name: { type: String, required: true },
//     phone: { type: String, required: true },
//     ceilingHeight: String,
//     numberOfItems: Number,
//     tvInches: String,
//     additionalInfo: String,
//     furnitureImageUrl: String,
//     requestedDate: String,
//     state: { type: String, default: 'pending' },
//     createdAt: { type: Date, default: Date.now }
// });

// // Create the model if it doesn't exist
// const ServiceRequest = mongoose.models.ServiceRequest || mongoose.model('ServiceRequest', ServiceRequestSchema);

// // Connect to MongoDB
// const connectDB = async () => {
//     if (mongoose.connections[0].readyState) return;
    
//     try {
//         await mongoose.connect(process.env.MONGODB_URI!);
//         console.log('Connected to MongoDB');
//     } catch (error) {
//         console.error('MongoDB connection error:', error);
//         throw new Error('Error connecting to database');
//     }
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== 'POST') {
//         return res.status(405).json({ message: 'Method not allowed' });
//     }

//     try {
//         await connectDB();
//         const data = req.body;

//         // Validate required fields
//         const requiredFields = ['serviceType', 'zipCode', 'name', 'phone'];
//         const missingFields = requiredFields.filter(field => !data[field]);

//         if (missingFields.length > 0) {
//             return res.status(400).json({
//                 message: `Missing required fields: ${missingFields.join(', ')}`
//             });
//         }

//         // Create and save the service request
//         const serviceRequest = new ServiceRequest(data);
//         const savedRequest = await serviceRequest.save();

//         return res.status(201).json({
//             message: 'Service request created successfully',
//             data: savedRequest
//         });
//     } catch (error) {
//         console.error('Error processing service request:', error);
//         return res.status(500).json({
//             message: 'Error processing service request'
//         });
//     }
// } 