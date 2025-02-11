import { RequestHandler } from 'express';
import BarServiceQuotationModel from '../models/BarServiceQuotation';
import NewEstimateModel from '../models/NewEstimate';
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

export const getNewEstimatesbystate: RequestHandler = async (req, res, next) => {
  try {
    const { state } = req.query; // Extract the `state` query parameter

    // Build the filter based on the `state` parameter
    const filter = state ? { state } : {};

    const barServiceQuotations = await NewEstimateModel.find(filter).exec();

    res.status(200).json(barServiceQuotations);
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

export const createNewEstimate: RequestHandler = async (req, res, next) => {
  try {
// Log the incoming request
console.log("Received POST request to /new-estimate");
console.log("Headers:", req.headers);
const estimateData = req.body;
console.log("Estimate data before creation:", estimateData);

const newEstimate = await NewEstimateModel.create(estimateData);
console.log("Created estimate:", newEstimate);

res.status(201).json(newEstimate);
console.log('About to emit socket event for estimate:', newEstimate._id);
io.emit("newBarServiceQuotation", newEstimate);
console.log('Socket event emitted successfully');
}catch (error) {
console.error("Error creating estimate:", error);

next(error);
}
};

export const updateNewEstimate: RequestHandler = async (req, res, next) => {
  try {
    const quotationId = req.params.id;
    const { state } = req.body;

    if (!["pending", "answered", "approved"].includes(state)) {
      res.status(400).json({
        error: "Invalid state value. Must be 'pending', 'answered', or 'approved'"
      });
      return;
    }

    const updatedQuotation = await NewEstimateModel.findByIdAndUpdate(
      quotationId,
      { state },
      { new: true }
    );

    if (!updatedQuotation) {
      res.status(404).json({ error: "Quotation not found" });
      return;
    }

    // Emit socket event for the update
    io.emit('quotationUpdated', updatedQuotation);
    
    res.json(updatedQuotation);
  } catch (error) {
    next(error);
    console.error("Error updating quotation:", error);
    res.status(500).json({
      error: "Failed to update quotation",
      details: error instanceof Error ? error.message : "Unknown error"
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