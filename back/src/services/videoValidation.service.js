import { z } from "zod";

// Schéma pour la création d'une vidéo
// Correspond aux colonnes utilisées dans INSERT INTO videos (...)
export const createVideoSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Le titre est requis" })
    .max(255, { message: "Le titre ne doit pas dépasser 255 caractères" }),

  description: z
    .string()
    .max(500, {
      message: "La description ne doit pas dépasser 500 caractères",
    })
    .optional()
    .or(z.literal("")),

  // Colonne theme_id (INT, nullable) -> envoyée comme string depuis le front
  theme_id: z
    .string()
    .transform((val) => (val === "" ? null : parseInt(val, 10)))
    .refine(
      (val) => val === null || (!isNaN(val) && val > 0),
      {
        message: "Le thème doit être un identifiant valide",
      }
    )
    .optional(),
});

// Schéma pour la mise à jour d'une vidéo (tous les champs optionnels)
export const updateVideoSchema = z.object({
  title: z
    .string()
    .max(255, { message: "Le titre ne doit pas dépasser 255 caractères" })
    .optional(),

  description: z
    .string()
    .max(2000, {
      message: "La description ne doit pas dépasser 2000 caractères",
    })
    .optional(),

  theme_id: z
    .string()
    .transform((val) => (val === "" ? null : parseInt(val, 10)))
    .refine(
      (val) => val === null || (!isNaN(val) && val > 0),
      {
        message: "Le thème doit être un identifiant valide",
      }
    )
    .optional(),
});

