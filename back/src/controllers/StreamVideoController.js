import fs from "fs";
import { pool } from "../db/pool.js";

export async function streamVideoController(req, res) {
  try {
    const { id } = req.params;

    
    const [rows] = await pool.execute(
      "SELECT path, mime_type FROM videos WHERE id = ?",
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({ error: "Vidéo introuvable" });
    }

    const videoPath = rows[0].path;
    const mimeType = rows[0].mime_type || "video/mp4";

    // 2) On vérifie que le fichier existe sur le serveur
    if (!videoPath || !fs.existsSync(videoPath)) {
      return res.status(404).json({ error: "Fichier vidéo introuvable sur le serveur" });
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    // 3) Si le navigateur demande un Range (seek / streaming)
    if (range) {
      const parts = range.replace("bytes=", "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (Number.isNaN(start) || start >= fileSize || end >= fileSize) {
        return res.status(416).send("Range Not Satisfiable");
      }

      const chunkSize = end - start + 1;
      const file = fs.createReadStream(videoPath, { start, end });

      res.writeHead(206, {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunkSize,
        "Content-Type": mimeType,
      });

      return file.pipe(res);
    }

    // 4) Sinon on envoie le fichier en entier
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": mimeType,
      "Accept-Ranges": "bytes",
    });

    return fs.createReadStream(videoPath).pipe(res);
  } catch (error) {
    console.error("streamVideoController error:", error);
    return res.status(500).json({ error: "Erreur serveur", details: error.message });
  }
}
