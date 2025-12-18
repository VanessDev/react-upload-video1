/*********************************************
 * Validation des données de la vidéo
 *********************************************/
import { z } from "zod";

/********************************************
 * Formats de video acceptés (à compléter selon ton lecteur vidéo)
 *********************************************/
const videoFormats = [".mp4", ".avi", ".mov"];
const videoMimeTypes = ["video/mp4", "video/webm", "video/quicktime"]; // (si tu veux l'utiliser plus tard)
const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200 Mo en octets

/*********************************************
 * Helpers
 *********************************************/
const getFileExtension = (filename = "") => {
  const i = filename.lastIndexOf(".");
  if (i === -1) return "";
  return filename.substring(i).toLowerCase();
};

/*********************************************
 * Schéma pour la création d'une vidéo
 *********************************************/
export const createVideoSchema = z.object({
  title: z
    .string({ required_error: "Le titre est obligatoire" })
    .trim()
    .min(1, { message: "Le titre est obligatoire" })
    .max(255, { message: "Le titre ne doit pas dépasser 255 caractères" }),

  description: z
    .union([z.string(), z.undefined()])
    .transform((val) => (typeof val === "string" ? val.trim() : val))
    .refine(
      (val) => val === undefined || val.length <= 500,
      { message: "La description ne doit pas dépasser 500 caractères" }
    )
    .transform((val) => (val === "" ? "" : val))
    .optional(),

  theme_id: z
    .union([z.string(), z.number(), z.null(), z.undefined()])
    .transform((val) => {
      // si ça vient du front, c'est souvent une string
      if (val === undefined) return undefined; // champ absent => ok
      if (val === null) return null;
      if (typeof val === "number") return Number.isNaN(val) ? null : val;
      if (typeof val === "string") {
        const trimmed = val.trim();
        if (trimmed === "") return null;
        const n = parseInt(trimmed, 10);
        return Number.isNaN(n) ? null : n;
      }
      return null;
    })
    .refine(
      (val) =>
        val === undefined || val === null || (Number.isInteger(val) && val > 0),
      { message: "Le thème est invalide" }
    )
    .optional(),

  original_name: z
    .string({ required_error: "Le nom original est obligatoire" })
    .trim()
    .min(1, { message: "Le nom original est obligatoire" })
    .max(255, { message: "Le nom original ne doit pas dépasser 255 caractères" })
    .refine((val) => videoFormats.includes(getFileExtension(val)), {
      message: `Format vidéo non supporté. Formats acceptés : ${videoFormats.join(", ")}`,
    }),

  size: z
    .union([z.number(), z.string()])
    .transform((val) => (typeof val === "string" ? Number(val) : val))
    .refine((val) => typeof val === "number" && !Number.isNaN(val), {
      message: "La taille du fichier est requise",
    })
    .refine((val) => val > 0, {
      message: "La taille du fichier doit être positive",
    })
    .refine((val) => val <= MAX_FILE_SIZE, {
      message: `La taille du fichier ne doit pas dépasser ${
        MAX_FILE_SIZE / (1024 * 1024)
      } Mo`,
    }),
});

/*********************************************
 * Schéma pour la mise à jour d'une vidéo
 * (tous les champs deviennent optionnels)
 *********************************************/
export const updateVideoSchema = createVideoSchema.partial();
