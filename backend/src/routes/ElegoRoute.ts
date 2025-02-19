import express from "express";
import * as NewServiceRequestController from "../controllers/ElegoController";

const router = express.Router();

router.get("/",NewServiceRequestController.getNewServiceRequestsByState);
// router.post("/",BarServiceQuotationController.createBarServiceQuotation);

router.patch("/:id", NewServiceRequestController.updateNewServiceRequest);

router.post("/", NewServiceRequestController.createNewServiceRequest);
export default router;