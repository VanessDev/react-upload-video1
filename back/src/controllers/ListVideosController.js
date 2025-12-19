import { pool } from "../db/pool.js";

export async function listVideosController(req, res) {
  try {
    const { title, theme, note, date } = req.query;

    let sql = `
      SELECT 
        v.id,
        v.title,
        v.description,
        v.created_at,

        -- moyenne des notes (sans GROUP BY)
        (
          SELECT AVG(n.notation)
          FROM notations n
          WHERE n.video_id = v.id
        ) AS avg_note,

        -- thème (1 seul thème par vidéo)
        (
          SELECT t.name
          FROM theme t
          WHERE t.video_id = v.id
          LIMIT 1
        ) AS theme

      FROM videos v
      WHERE 1 = 1
    `;

    const params = [];

    // recherche par titre
    if (title) {
      sql += " AND v.title LIKE ?";
      params.push(`%${title}%`);
    }

    // recherche par date (YYYY-MM-DD)
    if (date) {
      sql += " AND DATE(v.created_at) = ?";
      params.push(date);
    }

    // filtre thème (via sous requête)
    if (theme) {
      sql += `
        AND EXISTS (
          SELECT 1 FROM theme t
          WHERE t.video_id = v.id AND t.name = ?
        )
      `;
      params.push(theme);
    }

    // filtre note minimale (via sous requête)
    if (note) {
      sql += `
        AND (
          SELECT AVG(n.notation)
          FROM notations n
          WHERE n.video_id = v.id
        ) >= ?
      `;
      params.push(Number(note));
    }

    sql += " ORDER BY v.created_at DESC";

    const [rows] = await pool.execute(sql, params);

    return res.status(200).json({ videos: rows });
  } catch (error) {
    console.error("listVideosController error:", error);
    return res.status(500).json({
      error: "Erreur serveur",
      details: error.message,
    });
  }
}
