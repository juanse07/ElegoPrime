import express from "express";
import * as NewServiceRequestController from "../controllers/ElegoController";
import { jobImageUpload } from "../middlewares/image-upload";
const router = express.Router();

// Debug middleware to log file uploads
router.use((req, res, next) => {
    console.log("==== DEBUG ROUTE MIDDLEWARE ====");
    console.log(`Request method: ${req.method}`);
    console.log(`Request headers:`, req.headers);
    console.log(`Request has files?`, !!req.files);
    if (req.files) console.log(`Files received:`, Object.keys(req.files));
    next();
});

router.get("/",NewServiceRequestController.getNewServiceRequestsByState);
// router.post("/",BarServiceQuotationController.createBarServiceQuotation);

router.patch("/:id", NewServiceRequestController.updateNewServiceRequest);

// Update route to handle multiple images - using array to simplify
router.post("/", 
    jobImageUpload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 }
    ]), 
    (req, res, next) => {
        console.log("After multer middleware:");
        console.log("Files:", req.files);
        console.log("Body:", req.body);
        next();
    },
    NewServiceRequestController.createNewServiceRequest
);

export default router;