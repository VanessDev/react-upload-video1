import { Router } from "express";
import { testController, uploadVideoController } from "../controllers/UploadVideoController.js";
import { listVideosController } from "../controllers/ListVideosController.js";
import { OneVideoController} from "../controllers/OneVideoController.js";
import { streamVideoController } from "../controllers/StreamVideoController.js";
// import {
//   validateCreateVideo,
//   // validateUpdateVideo,
// } from "../middlewares/Validation/validateVideoMiddleware.js";

import upload from "../middlewares/uploadVideoMiddleware.js";

const router = Router();

// route de test
router.get("/test", testController);

// READ : liste des vidéos
router.get("/", listVideosController);

// STREAM (mets-le AVANT /:id)
router.get("/:id/stream", streamVideoController);

// READ : une seule vidéo
router.get("/:id", OneVideoController);

// CREATE : upload vidéo
router.post("/", upload.single("video"), uploadVideoController);

export default router;
