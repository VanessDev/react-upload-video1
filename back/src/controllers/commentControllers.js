// On importe la connexion à la base de données
const {pool} = require('../db/index.js');

// Configuration des commentaires (pour éviter les codes en dur)
const COMMENT_CONFIG = {
    MAX_LENGTH: 500, // Longueur maximale d'un commentaire
    MIN_LENGTH: 1    // Longueur minimale d'un commentaire
};

// Cette fonction crée un nouveau commentaire dans la base de données
const createComment = async (req, res) => {
    try {
        // On récupère le texte du commentaire et l'identifiant de la vidéo depuis la requête
        const { comment, video_id } = req.body;
        
        // On vérifie que le commentaire n'est pas vide
        if (!comment || !comment.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Le commentaire ne peut pas être vide',
                data: null
            });
        }
        
        // On vérifie que le commentaire ne dépasse pas la limite maximale
        if (comment.length > COMMENT_CONFIG.MAX_LENGTH) {
            return res.status(400).json({
                success: false,
                message: `Le commentaire ne peut pas dépasser ${COMMENT_CONFIG.MAX_LENGTH} caractères`,
                data: null
            });
        }
        
        // On vérifie que la vidéo existe avant d'ajouter un commentaire
        const [videoExists] = await pool.query('SELECT id FROM videos WHERE id = ?', [video_id]);
        if (videoExists.length === 0) {
            return res.status(404).json({
                success: false,
                message: "La vidéo spécifiée n'existe pas",
                data: null
            });
        }
        
        // On insère le nouveau commentaire dans la table comments
        const [result] = await pool.query('INSERT INTO comments (comment, video_id) VALUES (?, ?)', [comment.trim(), video_id]);
        // On récupère le commentaire qu'on vient de créer pour le renvoyer
        const [newComment] = await pool.query('SELECT * FROM comments WHERE id = ?', [result.insertId]);
        // On renvoie une réponse de succès avec le commentaire créé
        res.status(201).json({
            success: true,
            message: 'Commentaire créé avec succès',
            data: newComment[0]
        });
    } catch (error) {
        // Si une erreur se produit, on l'affiche et on renvoie une erreur
        console.error('Erreur createComment:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la création du commentaire',
            data: null
        });
    }
};

// Cette fonction récupère tous les commentaires de toutes les vidéos
const getComments = async (req, res) => {
    try {
        // On demande à la base de données tous les commentaires
        const [result] = await pool.query('SELECT * FROM comments');
        // On renvoie tous les commentaires
        res.status(200).json({
            success: true,
            message: 'Commentaires récupérés avec succès',
            data: result
        });
    } catch (error) {
        // Si une erreur se produit, on l'affiche et on renvoie une erreur
        console.error('Erreur getComments:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des commentaires',
            data: null
        });
    }
};

// Cette fonction récupère tous les commentaires d'une vidéo précise
const getCommentsByVideo = async (req, res) => {
    try {
        // On récupère l'identifiant de la vidéo depuis l'URL
        const { videoId } = req.params;
        // On demande à la base de données tous les commentaires de cette vidéo, du plus récent au plus ancien
        const [result] = await pool.query('SELECT * FROM comments WHERE video_id = ? ORDER BY id DESC', [videoId]);
        // On renvoie tous les commentaires de cette vidéo
        res.status(200).json({
            success: true,
            message: 'Commentaires récupérés avec succès',
            data: result
        });
    } catch (error) {
        // Si une erreur se produit, on l'affiche et on renvoie une erreur
        console.error('Erreur getCommentsByVideo:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des commentaires',
            data: null
        });
    }
};

// Cette fonction modifie un commentaire existant dans la base de données
const updateComment = async (req, res) => {
    try {
        // On récupère l'identifiant du commentaire depuis l'URL et le nouveau texte depuis la requête
        const { id } = req.params;
        const { comment } = req.body;
        
        // On vérifie que le commentaire n'est pas vide
        if (!comment || !comment.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Le commentaire ne peut pas être vide',
                data: null
            });
        }
        
        // On vérifie que le commentaire ne dépasse pas la limite maximale
        if (comment.length > COMMENT_CONFIG.MAX_LENGTH) {
            return res.status(400).json({
                success: false,
                message: `Le commentaire ne peut pas dépasser ${COMMENT_CONFIG.MAX_LENGTH} caractères`,
                data: null
            });
        }
        
        // On vérifie que le commentaire existe avant de le modifier
        const [commentExists] = await pool.query('SELECT id FROM comments WHERE id = ?', [id]);
        if (commentExists.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Le commentaire spécifié n'existe pas",
                data: null
            });
        }
        
        // On met à jour le commentaire dans la base de données
        await pool.query('UPDATE comments SET comment = ? WHERE id = ?', [comment.trim(), id]);
        // On récupère le commentaire modifié pour le renvoyer
        const [updatedComment] = await pool.query('SELECT * FROM comments WHERE id = ?', [id]);
        // On renvoie une réponse de succès avec le commentaire modifié
        res.status(200).json({
            success: true,
            message: 'Commentaire mis à jour avec succès',
            data: updatedComment[0]
        });
    } catch (error) {
        // Si une erreur se produit, on l'affiche et on renvoie une erreur
        console.error('Erreur updateComment:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la mise à jour du commentaire',    
            data: null
        });
    }
};

// Cette fonction supprime un commentaire de la base de données
const deleteComment = async (req, res) => {
    try {
        // On récupère l'identifiant du commentaire depuis l'URL
        const { id } = req.params;
        
        // On vérifie que le commentaire existe avant de le supprimer
        const [commentExists] = await pool.query('SELECT id FROM comments WHERE id = ?', [id]);
        if (commentExists.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Le commentaire spécifié n'existe pas",
                data: null
            });
        }
        
        // On supprime le commentaire de la base de données
        await pool.query('DELETE FROM comments WHERE id = ?', [id]);
        // On renvoie une réponse de succès
        res.status(200).json({
            success: true,
            message: 'Commentaire supprimé avec succès',
            data: { id: parseInt(id) }
        });
    } catch (error) {
        // Si une erreur se produit, on l'affiche et on renvoie une erreur
        console.error('Erreur deleteComment:', error);
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la suppression du commentaire',
            data: null
        });
    }
};

module.exports = {
    createComment,
    getComments,
    getCommentsByVideo,
    updateComment,
    deleteComment
};