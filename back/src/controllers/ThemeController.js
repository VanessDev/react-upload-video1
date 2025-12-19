import { pool } from "../db/pool.js";

export async function listThemesController(req, res) {
  try {
    const [rows] = await pool.execute(`
      SELECT id, name
      FROM theme
      ORDER BY name ASC
    `);

    return res.status(200).json({ themes: rows });
  } catch (error) {
    console.error("listThemesController error:", error);
    return res.status(500).json({
      error: "Erreur serveur",
      details: error.message,
    });
  }
}
