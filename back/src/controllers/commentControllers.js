// Connexion DB (ES Modules)
import { pool } from "../db/pool.js";

// Configuration des commentaires (pour éviter les codes en dur)
const COMMENT_CONFIG = {
  MAX_LENGTH: 500,
  MIN_LENGTH: 1,
};

// CREATE
export async function createComment(req, res) {
  try {
    const { comment, video_id, rating } = req.body;

    if (!comment || !comment.trim()) {
      return res.status(400).json({
        success: false,
        message: "Le commentaire ne peut pas être vide",
        data: null,
      });
    }

    if (comment.length > COMMENT_CONFIG.MAX_LENGTH) {
      return res.status(400).json({
        success: false,
        message: `Le commentaire ne peut pas dépasser ${COMMENT_CONFIG.MAX_LENGTH} caractères`,
        data: null,
      });
    }

    if (!video_id) {
      return res.status(400).json({
        success: false,
        message: "video_id est obligatoire",
        data: null,
      });
    }

    const [videoExists] = await pool.execute(
      "SELECT id FROM videos WHERE id = ?",
      [video_id]
    );

    if (videoExists.length === 0) {
      return res.status(404).json({
        success: false,
        message: "La vidéo spécifiée n'existe pas",
        data: null,
      });
    }

    const [result] = await pool.execute(
      "INSERT INTO comments (comment, video_id) VALUES (?, ?)",
      [comment.trim(), video_id]
    );

    // Si une note est fournie, l'ajouter à la base de données (table notations)
    if (rating !== undefined && rating !== null) {
      const ratingNum = parseInt(rating, 10);

      // Validation de la note (entre 1 et 5)
      if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
        return res.status(400).json({
          success: false,
          message: "La note doit être entre 1 et 5",
          data: null,
        });
      }

      // Toujours insérer une nouvelle note (plusieurs notes possibles par vidéo)
      await pool.execute(
        "INSERT INTO notations (notation, video_id) VALUES (?, ?)",
        [ratingNum, video_id]
      );
    }

    const [newComment] = await pool.execute(
      "SELECT * FROM comments WHERE id = ?",
      [result.insertId]
    );

    return res.status(201).json({
      success: true,
      message: "Commentaire créé avec succès",
      data: newComment[0],
    });
  } catch (error) {
    console.error("Erreur createComment:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la création du commentaire",
      data: null,
    });
  }
}

// READ all
export async function getComments(req, res) {
  try {
    const [result] = await pool.execute("SELECT * FROM comments");

    return res.status(200).json({
      success: true,
      message: "Commentaires récupérés avec succès",
      data: result,
    });
  } catch (error) {
    console.error("Erreur getComments:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des commentaires",
      data: null,
    });
  }
}

// READ by video
export async function getCommentsByVideo(req, res) {
  try {
    const { videoId } = req.params;

    const [result] = await pool.execute(
      "SELECT * FROM comments WHERE video_id = ? ORDER BY id DESC",
      [videoId]
    );

    return res.status(200).json({
      success: true,
      message: "Commentaires récupérés avec succès",
      data: result,
    });
  } catch (error) {
    console.error("Erreur getCommentsByVideo:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des commentaires",
      data: null,
    });
  }
}

// UPDATE
export async function updateComment(req, res) {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    if (!comment || !comment.trim()) {
      return res.status(400).json({
        success: false,
        message: "Le commentaire ne peut pas être vide",
        data: null,
      });
    }

    if (comment.length > COMMENT_CONFIG.MAX_LENGTH) {
      return res.status(400).json({
        success: false,
        message: `Le commentaire ne peut pas dépasser ${COMMENT_CONFIG.MAX_LENGTH} caractères`,
        data: null,
      });
    }

    const [commentExists] = await pool.execute(
      "SELECT id FROM comments WHERE id = ?",
      [id]
    );

    if (commentExists.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Le commentaire spécifié n'existe pas",
        data: null,
      });
    }

    await pool.execute("UPDATE comments SET comment = ? WHERE id = ?", [
      comment.trim(),
      id,
    ]);

    const [updatedComment] = await pool.execute(
      "SELECT * FROM comments WHERE id = ?",
      [id]
    );

    return res.status(200).json({
      success: true,
      message: "Commentaire mis à jour avec succès",
      data: updatedComment[0],
    });
  } catch (error) {
    console.error("Erreur updateComment:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour du commentaire",
      data: null,
    });
  }
}

// DELETE
export async function deleteComment(req, res) {
  try {
    const { id } = req.params;

    const [commentExists] = await pool.execute(
      "SELECT id FROM comments WHERE id = ?",
      [id]
    );

    if (commentExists.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Le commentaire spécifié n'existe pas",
        data: null,
      });
    }

    await pool.execute("DELETE FROM comments WHERE id = ?", [id]);

    return res.status(200).json({
      success: true,
      message: "Commentaire supprimé avec succès",
      data: { id: Number(id) },
    });
  } catch (error) {
    console.error("Erreur deleteComment:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression du commentaire",
      data: null,
    });
  }
}

// ANNOTATIONS : Calculer la moyenne des notes d'une vidéo
export async function getVideoAverageRating(req, res) {
  try {
    const { videoId } = req.params;

    // Calcul de la moyenne et du nombre de votes avec SQL
    const [result] = await pool.execute(
      "SELECT AVG(notation) as average, COUNT(*) as count FROM notations WHERE video_id = ?",
      [videoId]
    );

    // Préparer les données à retourner
    let moyenne = null;
    if (result[0].average) {
      // Si une moyenne existe, la convertir en nombre décimal
      moyenne = parseFloat(result[0].average);
    }
    const nombreVotes = result[0].count || 0;

    return res.status(200).json({
      success: true,
      message: "Moyenne récupérée avec succès",
      data: {
        average: moyenne,
        count: nombreVotes,
      },
    });
  } catch (error) {
    console.error("Erreur getVideoAverageRating:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération de la moyenne",
      data: null,
    });
  }
}
