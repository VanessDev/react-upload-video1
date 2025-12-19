import { Router } from "express";
import { listThemesController } from "../controllers/ThemeController.js";

const router = Router();

router.get("/", listThemesController);

export default router;
