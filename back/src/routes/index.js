import { Router } from "express";
import videoRoutes from "./videoRoutes.js";
import commentRoutes from "./commentRoutes.js";

const router = Router();

// routes publiques
router.use("/video", videoRoutes);
router.use("/", commentRoutes);

// routes protégées (plus tard)

// export
export default router;