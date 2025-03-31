import express from "express";
import * as BusyTimeController from "../controllers/busyTimeController";

const router = express.Router();

router.get("/", BusyTimeController.getBusyTimeSlots);

export default router;