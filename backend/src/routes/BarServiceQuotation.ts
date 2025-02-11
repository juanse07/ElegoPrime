import express from "express";
import * as BarServiceQuotationController from "../controllers/BarServiceQuotation";

const router = express.Router();

router.get("/",BarServiceQuotationController.getNewEstimatesbystate);
// router.post("/",BarServiceQuotationController.createBarServiceQuotation);

router.patch("/:id", BarServiceQuotationController.updateNewEstimate);

router.post("/", BarServiceQuotationController.createNewEstimate);
export default router;