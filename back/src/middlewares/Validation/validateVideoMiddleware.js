// import { ZodError } from "zod";
// import { createVideoSchema } from "../../services/videoValidation.service.js";

// // Middleware pour valider la création d'une vidéo
// export const validateCreateVideo = (req, res, next) => {
//   try {
//     // Vérifier la présence du fichier vidéo
//     if (!req.file) {
//       return res.status(400).json({
//         error: "Aucune vidéo n'a été uploadée",
//       });
//     }

//     // Valider les données du body (title, etc.)
//     createVideoSchema.parse(req.body);

//     // Si tout est valide, on passe au middleware suivant
//     return next();
//   } catch (error) {
//     if (error instanceof ZodError && error.issues?.length) {
//       return res.status(400).json({
//         error: error.issues[0].message,
//       });
//     }

//     return res.status(400).json({
//       error: "Erreur de validation",
//     });
//   }
// };

// // Middleware pour valider la mise à jour d'une vidéo
// export const validateUpdateVideo = (req, res, next) => {
//   try {
//     // Ici, le fichier est optionnel, on valide uniquement le body
//     updateVideoSchema.parse(req.body);

//     return next();
//   } catch (error) {
//     if (error instanceof ZodError && error.issues?.length) {
//       return res.status(400).json({
//         error: error.issues[0].message,
//       });
//     }

//     return res.status(400).json({
//       error: "Erreur de validation",
//     });
//   }
// };