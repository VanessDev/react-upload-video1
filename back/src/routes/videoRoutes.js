import { Router } from "express";
import { testController, uploadVideoController } from "../controllers/UploadVideoController.js";

const router = Router();

router.get('/test', testController);
router.post('/', uploadVideoController);

export default router;