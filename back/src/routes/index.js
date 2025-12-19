import { Router } from "express";
import videoRoutes from "./videoRoutes.js";
import commentRoutes from "./commentRoutes.js";
import themeRoutes from "./themeRoutes.js"; 

const router = Router();


router.use("/video", videoRoutes);

router.use("/", commentRoutes);


router.use("/theme", themeRoutes);

export default router;
