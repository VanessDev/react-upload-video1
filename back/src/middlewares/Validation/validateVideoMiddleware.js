import { createVideoSchema } from "../../services/videoValidation.service.js";
import { ZodError } from "zod";

// Middleware pour valider la création d'une vidéo
export const validateCreateVideo = (req, res, next) => {
  // console.log("req.file dans validateCreateVideo :", req.file);
  // console.log("req.body dans validateCreateVideo :", req.body);
  try {
    // Vérifier la présence du fichier vidéo
    if (!req.file) {
      return res.status(400).json({
        error: "Aucune vidéo n'a été uploadée",
      });
    }

    // Fusionne req.body et les infos du fichier pour Zod
    const dataToValidate = {
      ...req.body,
  original_name: req.file?.originalname,
  size: req.file?.size
    };

    // Valider les données du body (title, etc.)
    createVideoSchema.parse(dataToValidate);

    next(); // Si tout est valide, on passe au middleware suivant
  } catch (error) {
    if (error instanceof ZodError) {
      const messages = error.issues.map(e => e.message).join(", ");
      return res.status(400).json({ error: messages });
    }

    return res.status(400).json({
      error: "Erreur de validation",
    });
  }
};