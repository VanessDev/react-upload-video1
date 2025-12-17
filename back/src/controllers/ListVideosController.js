import { pool } from "../db/pool.js";


export async function listVideosController(req, res) {
  try {
    const [videos] = await pool.execute(
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
      FROM videos
      ORDER BY created_at DESC
      `
    );

    return res.status(200).json({ videos });
  } catch (error) {
    console.error("listVideosController error:", error);

    return res.status(500).json({
      error: "Erreur serveur",
      details: error.message,
    });
  }
}
