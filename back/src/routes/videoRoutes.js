import { Router } from "express";
import {
  testController,
  uploadVideoController,
} from "../controllers/UploadVideoController.js";
import upload from "../middlewares/uploadVideoMiddleware.js";

const router = Router();


router.get("/test", testController);

// IMPORTANT : "video" = nom du champ Postman
router.post("/", upload.single("video"), uploadVideoController);

export default router;
