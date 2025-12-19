import express from "express";
import {
  createComment,
  getComments,
  getCommentsByVideo,
  updateComment,
  deleteComment,
  getVideoAverageRating,
} from "../controllers/commentControllers.js";

const router = express.Router();

// GET all comments
router.get("/comments", getComments);

// GET comments by video
router.get("/comments/video/:videoId", getCommentsByVideo);

// ANNOTATIONS : Obtenir la note moyenne d'une vidéo
router.get("/comments/video/:videoId/average", getVideoAverageRating);

// POST new comment
router.post("/comments", createComment);

// PUT update comment
router.put("/comments/:id", updateComment);

// DELETE comment
router.delete("/comments/:id", deleteComment);

export default router;