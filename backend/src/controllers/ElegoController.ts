import { RequestHandler } from 'express';
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
    // Log the incoming request
    console.log("Received POST request to /new-service-request");
    console.log("Headers:", req.headers);

    const serviceRequestData = req.body;
    console.log("Service request data before creation:", serviceRequestData);

    // Use your actual model name here, e.g. `NewServiceRequestModel`
    const newServiceRequest = await NewServiceRequestModel.create(serviceRequestData);
    console.log("Created service request:", newServiceRequest);

    res.status(201).json(newServiceRequest);

    console.log("About to emit socket event for service request:", newServiceRequest._id);
    // Adjust the event name if you also wish to rename it
    io.emit("newBarServiceRequest", newServiceRequest);
    console.log("Socket event emitted successfully");
  } catch (error) {
    console.error("Error creating service request:", error);
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