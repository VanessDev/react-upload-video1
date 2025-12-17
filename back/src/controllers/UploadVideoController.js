import path from "path";
import { pool } from "../db/pool.js";

/**
 * POST /api/video
 * Upload d'une vidéo + insertion en base de données
 */
export async function uploadVideoController(req, res) {
  try {
    // 1️Vérification fichier
    if (!req.file) {
      return res.status(400).json({
        error: "Aucun fichier video reçu",
      });
    }

    // 2️ Correction du mime-type via l'extension
    const ext = path.extname(req.file.originalname).toLowerCase();
    const correctedMime =
      ext === ".mp4"
        ? "video/mp4"
        : ext === ".webm"
        ? "video/webm"
        : ext === ".mov"
        ? "video/quicktime"
        : req.file.mimetype;

    // Données formulaire
    const { title, description } = req.body;

    //  Insertion en base de données
    const [result] = await pool.execute(
      `
      INSERT INTO videos
      (title, description, filename, original_name, mime_type, size, path)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        title ?? null,
        description ?? null,
        req.file.filename,
        req.file.originalname,
        correctedMime,
        req.file.size,
        req.file.path,
      ]
    );

    // Réponse OK
    return res.status(201).json({
      message: "Vidéo uploadée avec succès",
      video: {
        id: result.insertId,
        title,
        description,
        filename: req.file.filename,
        original_name: req.file.originalname,
        mime_type: correctedMime,
        size: req.file.size,
        path: req.file.path,
      },
    });
  } catch (error) {
    console.error("uploadVideoController error:", error);
    return res.status(500).json({
      error: "Erreur serveur",
      details: error.message,
    });
  }
}

/**
 * GET /api/video/test
 */
export function testController(req, res) {
  return res.json({
    ok: true,
    message: "Route /api/video/test OK",
  });
}
