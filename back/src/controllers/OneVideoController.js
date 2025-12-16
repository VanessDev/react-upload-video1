import { pool } from "../db/pool.js";

export async function OneVideoController(req, res) {
  try {
    const { id } = req.params;

    const [rows] = await pool.execute(
      `
      SELECT 
        id,
        title,
        description,
        filename,
        original_name,
        mime_type,
        size,
        path,
        created_at
      FROM video
      WHERE id = ?
      `,
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({
        error: "Vidéo introuvable",
      });
    }

    return res.status(200).json({
      video: rows[0],
    });
  } catch (error) {
    console.error("readVideoController error:", error);

    return res.status(500).json({
      error: "Erreur serveur",
      details: error.message,
    });
  }
}
