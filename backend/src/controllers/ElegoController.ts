import { RequestHandler } from 'express';
import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';
import sharp from 'sharp';
import BarServiceQuotationModel from '../models/BarServiceQuotation';
import NewServiceRequestModel from '../models/NewServiceRequest';
import { io } from "../server";

export const getBarServiceQuotations: RequestHandler = async (req, res, next) => {
  try {
    const allBarServiceQuotations = await BarServiceQuotationModel.find().exec();
    res.status(200).json(allBarServiceQuotations);
  } catch (error) {
    next(error);
  }
};

// export const getBarServiceQuotationsbystate: RequestHandler = async (req, res, next) => {
//     try {
//       const { state } = req.query; // Extract the `state` query parameter
  
//       // Build the filter based on the `state` parameter
//       const filter = state ? { state } : {};
  
//       const barServiceQuotations = await BarServiceQuotationModel.find(filter).exec();
  
//       res.status(200).json(barServiceQuotations);
//     } catch (error) {
//       next(error);
//     }
//   };

export const getNewServiceRequestsByState: RequestHandler = async (req, res, next) => {
  try {
    const { state } = req.query; // Extract the `state` query parameter

    // Build the filter based on the `state` parameter
    const filter = state ? { state } : {};

    // Replace `NewEstimateModel` with your actual service request model name
    const newServiceRequests = await NewServiceRequestModel.find(filter).exec();

    res.status(200).json(newServiceRequests);
  } catch (error) {
    next(error);
  }
};




// export const createBarServiceQuotation: RequestHandler = async (req, res, next) => {
//   try {
//     const quotationData = req.body;
//     console.log("Quotation data before creation:", quotationData);
    
//     const newBarServiceQuotation = await BarServiceQuotationModel.create(quotationData);
//     console.log("Created quotation:", newBarServiceQuotation);
    
//     res.status(201).json(newBarServiceQuotation);
//     console.log('About to emit socket event for quotation:', newBarServiceQuotation._id);
//     // io.emit("newBarServiceQuotation", newBarServiceQuotation);
//     console.log('Socket event emitted successfully');
//   } catch (error) {
//     console.error("Error creating quotation:", error);
//     next(error);
//   }
// };

export const createNewServiceRequest: RequestHandler = async (req, res, next) => {
  try {
    console.log("\n\n==== HANDLING NEW SERVICE REQUEST ====");
    
    // Log the entire request
    console.log("Request received:");
    console.log("- Method:", req.method);
    console.log("- URL:", req.url);
    console.log("- Content-Type:", req.headers['content-type']);
    
    // Check if we have files - if not, that's the issue
    if (!req.files || typeof req.files !== 'object' || Object.keys(req.files).length === 0) {
      console.error("❌ NO FILES RECEIVED! This is likely the cause of the problem.");
      console.log("Request body:", req.body);
      console.log("Files object:", req.files);
    } else {
      console.log("✅ Files received:", Object.keys(req.files));
    }
    
    // Get the uploaded files
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    // Create a new ObjectId for the service request
    const newServiceId = new mongoose.Types.ObjectId();
    console.log("Generated new service ID:", newServiceId.toString());
    
    // Parse JSON data if it was sent as a string field
    let serviceData = req.body;
    
    if (req.body.data && typeof req.body.data === 'string') {
      try {
        serviceData = JSON.parse(req.body.data);
        console.log("✅ Successfully parsed JSON data");
      } catch (e) {
        console.error("❌ Error parsing JSON data:", e);
      }
    }
    
    // Setup for file saving
    const uploadDir = path.resolve(__dirname, '../../uploads/jobServiceImages');
    
    console.log("Upload directory:", uploadDir);
    
    // Ensure directory exists
    if (!fs.existsSync(uploadDir)) {
      console.log("Creating upload directory");
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    // Initialize image paths
    let image1Path = '';
    let image2Path = '';
    
    // Helper function for processing images
    const processImage = async (file: Express.Multer.File, imageNumber: number) => {
      try {
        const fileName = `${newServiceId.toString()}-image${imageNumber}.png`;
        const filePath = path.join(uploadDir, fileName);
        
        console.log(`Processing image${imageNumber}:`, file.originalname);
        console.log(`Saving to:`, filePath);
        
        // Save the file
        await sharp(file.buffer)
          .resize({ width: 800, height: 600, fit: 'inside' })
          .toFormat('png')
          .toFile(filePath);
        
        // Check if file was created
        if (fs.existsSync(filePath)) {
          console.log(`✅ Image${imageNumber} saved successfully`);
          // Get file stats
          const stats = fs.statSync(filePath);
          console.log(`File size: ${stats.size} bytes`);
          
          return `/uploads/jobServiceImages/${fileName}`;
        } else {
          console.error(`❌ Failed to save image${imageNumber} - file doesn't exist after save`);
          return '';
        }
      } catch (err) {
        console.error(`❌ Error processing image${imageNumber}:`, err);
        return '';
      }
    };
    
    // Process first image if it exists
    if (files && files.image1 && files.image1[0]) {
      console.log("Processing image1");
      image1Path = await processImage(files.image1[0], 1);
    } else {
      console.log("No image1 found in request");
    }
    
    // Process second image if it exists
    if (files && files.image2 && files.image2[0]) {
      console.log("Processing image2");
      image2Path = await processImage(files.image2[0], 2);
    } else {
      console.log("No image2 found in request");
    }
    
    // Prepare the service request data with image paths
    const serviceRequestData = {
      ...serviceData,
      _id: newServiceId,
      image1Path: image1Path || undefined,
      image2Path: image2Path || undefined,
      createdAt: new Date().toISOString()
    };
    
    console.log("Final service request data to save:");
    console.log("- ID:", serviceRequestData._id);
    console.log("- Service Type:", serviceRequestData.serviceType);
    console.log("- Image1Path:", serviceRequestData.image1Path);
    console.log("- Image2Path:", serviceRequestData.image2Path);
    
    // Create the new service request in the database
    const newServiceRequest = await NewServiceRequestModel.create(serviceRequestData);
    console.log("✅ Service request created in database");
    
    // Send the response
    res.status(201).json(newServiceRequest);
    
    // Emit socket event
    io.emit("newBarServiceRequest", newServiceRequest);
    console.log("Socket event emitted successfully");
    console.log("==== SERVICE REQUEST HANDLING COMPLETE ====\n\n");
  } catch (error) {
    console.error("❌ ERROR CREATING SERVICE REQUEST:", error);
    next(error);
  }
};


export const updateNewServiceRequest: RequestHandler = async (req, res, next) => {
  try {
    const serviceRequestId = req.params.id;
    const { state } = req.body;

    // Validate state
    if (!["pending", "answered", "approved"].includes(state)) {
      res.status(400).json({
        error: "Invalid state value. Must be 'pending', 'answered', or 'approved'",
      });
      return;
    }

    // Replace `NewEstimateModel` with your actual service request model name
    const updatedServiceRequest = await NewServiceRequestModel.findByIdAndUpdate(
      serviceRequestId,
      { state },
      { new: true }
    );

    if (!updatedServiceRequest) {
      res.status(404).json({ error: "Service request not found" });
      return;
    }

    // Emit socket event for the update
    io.emit('serviceRequestUpdated', updatedServiceRequest);

    res.json(updatedServiceRequest);
  } catch (error) {
    next(error);
    console.error("Error updating service request:", error);
    res.status(500).json({
      error: "Failed to update service request",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};


// export const updateBarServiceQuotation: RequestHandler = async (req, res, next) => {
//   try {
//     const quotationId = req.params.id;
//     const { state } = req.body;

//     if (!["pending", "answered", "approved"].includes(state)) {
//       res.status(400).json({
//         error: "Invalid state value. Must be 'pending', 'answered', or 'approved'"
//       });
//       return;
//     }

//     const updatedQuotation = await BarServiceQuotationModel.findByIdAndUpdate(
//       quotationId,
//       { state },
//       { new: true }
//     );

//     if (!updatedQuotation) {
//       res.status(404).json({ error: "Quotation not found" });
//       return;
//     }

//     // Emit socket event for the update
//     io.emit('quotationUpdated', updatedQuotation);
    
//     res.json(updatedQuotation);
//   } catch (error) {
//     next(error);
//     console.error("Error updating quotation:", error);
//     res.status(500).json({
//       error: "Failed to update quotation",
//       details: error instanceof Error ? error.message : "Unknown error"
//     });
//   }
// };