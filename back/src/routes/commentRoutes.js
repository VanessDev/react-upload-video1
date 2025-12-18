import express from "express";
import {
  createComment,
  getComments,
  getCommentsByVideo,
  updateComment,
  deleteComment,
} from "../controllers/commentControllers.js";

const router = express.Router();

// GET all comments
router.get("/comments", getComments);

// GET comments by video
router.get("/comments/video/:videoId", getCommentsByVideo);

// POST new comment
router.post("/comments", createComment);

// PUT update comment
router.put("/comments/:id", updateComment);

// DELETE comment
router.delete("/comments/:id", deleteComment);

export default router;