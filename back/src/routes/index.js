import { Router } from "express";
import videoRoutes from "./videoRoutes.js";

const router = Router();

// routes publiques
router.use("/video", videoRoutes);

// routes protégées (plus tard)

// export
export default router;