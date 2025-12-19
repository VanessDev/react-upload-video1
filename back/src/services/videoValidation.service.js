/********************************************* 
 * Validation des données de la vidéo
 *********************************************/
import { z } from "zod";

/********************************************
 * Formats de video acceptés ( a complété en fonction du lecteur vidéo)
 *********************************************/
const videoFormats = [".mp4", ".avi", ".mov"];
const videoMimeTypes = ["video/mp4", "video/webm", "video/quicktime"];
const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200 Mo (en octets)
const MAX_FILE_SIZE_IN_MO = 200;

/********************************************* 
 * Schéma pour la création d'une vidéo
 *********************************************/
// Schéma pour la création d'une vidéo
export const createVideoSchema = z.object({
  title: z
  // Titre : obligatoire, string, min 1, max 255, trim pour éviter les espaces inutiles
    .string() //verifie que le titre est une string
    .trim() //supprime les espaces en début et en fin de string (on evite que " " soit accepté)
    // .transform((val) => val.trim()) //supprime les espaces en début et en fin de string (on evite que " " soit accepté)
    .min(1,{ message: "Le titre est obligatoire" })
    .max(255,
      { message: "Le titre ne doit pas dépasser 255 caractères" }
    ),


  description: z
  // Description : optionnelle, string max 500, trim, autorise vide ou undefined
    .string()
    .trim() //supprime les espaces en début et en fin de string (on evite que " " soit accepté)
    // .transform((val) => val.trim()) //evite des string qui ne contiennent que des espaces
    .max(
      500, 
      { message: "La description ne doit pas dépasser 500 caractères",}
    )
    .optional() //le champ peut etre undefined
    .or(z.literal("")), // autorise une string vide


  // theme: z
  // // theme_id : optionnel, envoyé comme string depuis le front, transformé en int ou null
  //   .string()
  //   .transform((val) => val.trim())
  //   .transform((val) => (val === "" ? null : parseInt(val, 10)))
  //   .refine(
  //     (val) => val === null || (!isNaN(val) && val > 0), // val doit etre soit null, soit un nombre entier positif
  //     { message: "Le thème est invalide" }
  //   )
  //   .optional(),

    original_name: z
    .string()
    .trim()
    // .transform((val) => val.trim())
    .min(1, { message: "Le nom original est obligatoire" })
    .max(255, { message: "Le nom original ne doit pas dépasser 255 caractères" })
    .refine(
      (val) => {
      // Récupère l'extension en minuscule et vérifie si elle est dans la liste des formats acceptés
        const extension = val.substring(val.lastIndexOf(".")).toLowerCase();
        return videoFormats.includes(extension);
      },
      { message: `Format vidéo non supporté. Formats acceptés : ${videoFormats.join(", ")}` }
    ),

  size: z
  // Taille du fichier : obligatoire, nombre positif, max 200 Mo
    .number({ message: "La taille du fichier est requise" })
    .positive({ message: "La taille du fichier doit être positive" })
    .max(MAX_FILE_SIZE, { 
      message: `La taille du fichier ne doit pas dépasser ${MAX_FILE_SIZE_IN_MO} Mo` 
    }),
});

/********************************************* 
 * Schéma pour la mise à jour d'une vidéo
 *********************************************/