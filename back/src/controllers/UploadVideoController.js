import path from "path";

export async function uploadVideoController(req, res) {
  // (optionnel) logs de debug
  console.log("req.file =", req.file);
  console.log("req.files =", req.files);
  console.log("req.body =", req.body);

  if (!req.file) {
    return res.status(400).json({
      error: "Aucun fichier video reçu",
    });
  }

 
  const ext = path.extname(req.file.originalname).toLowerCase();
  const correctedMime =
    ext === ".mp4" ? "video/mp4" :
    ext === ".webm" ? "video/webm" :
    ext === ".mov" ? "video/quicktime" :
    req.file.mimetype;

  const { title, description } = req.body;

  const videoData = {
    title,
    description,
    filename: req.file.filename,
    original_name: req.file.originalname,
    mime_type: correctedMime, // 👈 ici
    size: req.file.size,
    path: req.file.path,
  };

  return res.status(201).json({
    message: "Vidéo uploadée avec succès",
    video: videoData,
  });
}

export function testController(req, res) {
  return res.json({
    ok: true,
    message: "Route /api/video/test OK",
  });
}
