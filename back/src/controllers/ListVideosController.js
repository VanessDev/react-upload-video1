import { pool } from "../db/pool.js";

export async function listVideosController(req, res) {
  try {
    const { title, theme, note, date } = req.query;

    const where = [];
    const params = [];

    if (title) {
      where.push("v.title LIKE ?");
      params.push(`%${title}%`);
    }

    if (theme) {
      where.push("t.name = ?");
      params.push(theme);
    }

    if (date) {
      where.push("DATE(v.created_at) = ?");
      params.push(date);
    }

    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";

    const havingSql = note
      ? "HAVING COALESCE(AVG(n.notation), 0) >= ?"
      : "";

    const sql = `
      SELECT 
        v.id,
        v.title,
        v.description,
        v.created_at,
        COALESCE(AVG(n.notation), 0) AS avg_note,
        t.name AS theme
      FROM videos v
      LEFT JOIN notations n ON n.video_id = v.id
      LEFT JOIN theme t ON t.video_id = v.id
      ${whereSql}
      GROUP BY v.id, t.name
      ${havingSql}
      ORDER BY v.created_at DESC
    `;

    if (note) params.push(Number(note));

    const [rows] = await pool.execute(sql, params);

    res.status(200).json({ videos: rows });
  } catch (error) {
    console.error("listVideosController error:", error);
    res.status(500).json({
      error: "Erreur serveur",
      details: error.message,
    });
  }
}
