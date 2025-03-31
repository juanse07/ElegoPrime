import express from "express";
import * as BusyTimeController from "../controllers/busyTimeController";

const router = express.Router();

router.get("/", BusyTimeController.getBusyTimeSlots);
router.post("/", BusyTimeController.createBusyTimeSlot);
router.delete("/:id", BusyTimeController.deleteBusyTimeSlot);
router.put("/:id", BusyTimeController.updateBusyTimeSlot);

export default router;