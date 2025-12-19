import { Router } from "express";
import videoRoutes from "./videoRoutes.js";
import commentRoutes from "./commentRoutes.js";
import themeRoutes from "./themeRoutes.js"; 

const router = Router();

// routes publiques
router.use("/video", videoRoutes);

// si tes commentRoutes contiennent déjà /comments dedans, garde "/"
router.use("/", commentRoutes);

// ✅ IMPORTANT : /theme (pas ./theme)
router.use("/theme", themeRoutes);

export default router;
