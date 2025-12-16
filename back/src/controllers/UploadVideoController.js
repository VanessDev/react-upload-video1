



export async function uploadVideoController(req, res) {  

  console.log('reqlogdebut', req, 'fin');
  

  if (!req.file) {
    return res.status(400).json({
      error: "Aucun fichier video reçu",
    });
  }
  
  console.log('after 400');
  

  const { title, description } = req.body;

  const videoData = {
    title,
    description,
    filename: req.file.filename,
    original_name: req.file.originalname,
    mime_type: req.file.mimetype,
    size: req.file.size,
    path: req.file.path,
  };

  // TODO: createVideo(videoData) si DB plus tard

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
