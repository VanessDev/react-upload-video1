import express from "express";

// Import des controllers commentaires
import {
  createComment,
  getComments,
  getCommentsByVideo,
  updateComment,
  deleteComment,
} from "../controllers/commentControllers.js";

// Création du router
const router = express.Router();

// Routes commentaires
router.get("/comments", getComments);
router.get("/comments/video/:videoId", getCommentsByVideo);
router.post("/comments", createComment);
router.put("/comments/:id", updateComment);
router.delete("/comments/:id", deleteComment);

// Export ES module
export default router;
