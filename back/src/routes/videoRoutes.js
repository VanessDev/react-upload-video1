import { Router } from "express";
import {
  testController,
  uploadVideoController,
} from "../controllers/UploadVideoController.js";
import { OneVideoController } from "../controllers/OneVideoController.js";

import * as ListVideosController from "../controllers/ListVideosController.js";
import upload from "../middlewares/uploadVideoMiddleware.js";
import { streamVideoController } from "../controllers/StreamVideoController.js";

const router = Router();

// route de test
router.get("/test", testController);

// READ : liste des vidéos
router.get("/", ListVideosController.listVideosController);

// READ: voir qu'une vidéo
router.get("/:id", OneVideoController);

router.get("/:id/stream", streamVideoController);

// CREATE : upload vidéo
router.post("/", upload.single("video"), uploadVideoController);

export default router;
