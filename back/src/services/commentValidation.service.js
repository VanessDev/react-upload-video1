/********************************************* 
 * Validation des données de commentaire
 *********************************************/
import { z } from "zod";


/********************************************* 
 * Schéma pour la création d'un commentaire
 *********************************************/
export const createCommentSchema = z.object({
    // comment : obligatoire, string, min 1, max 255, trim pour éviter les espaces inutiles
    comment: z
        .string()
        .transform((val) => val.trim())
        .min(1,
            { message: "Le commentaire est obligatoire" }
        )
        .max(255,
            { message: "Le commentaire ne doit pas dépasser 255 caractères" }
        ),
});