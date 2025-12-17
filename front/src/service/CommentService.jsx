// On importe la configuration pour éviter les codes en dur
import { API_BASE_URL } from '../config/constants';

// Cette classe contient toutes les fonctions pour parler avec le serveur concernant les commentaires
class CommentService {
  // Fonction pour ajouter un nouveau commentaire à une vidéo
  async addComment(videoId, comment) {
    try {
      // On envoie une requête au serveur pour créer un commentaire
      const response = await fetch(API_BASE_URL, {
        method: 'POST', // Méthode POST = créer quelque chose de nouveau
        headers: {
          'Content-Type': 'application/json', // On dit au serveur qu'on envoie du JSON
        },
        body: JSON.stringify({
          comment: comment, // Le texte du commentaire
          video_id: videoId // L'identifiant de la vidéo
        })
      });
      
      // On récupère la réponse du serveur
      const result = await response.json();
      
      // Si la requête n'a pas réussi (erreur HTTP), on retourne le message d'erreur du serveur
      if (!response.ok) {
        return {
          success: false,
          message: result.message || "Erreur lors de l'ajout du commentaire",
          data: null
        };
      }
      
      return result;
    } catch (error) {
      // Si ça ne marche pas, on affiche l'erreur et on retourne un message d'erreur
      console.error('Erreur addComment:', error);
      return {
        success: false,
        message: "Erreur lors de l'ajout du commentaire",
        data: null
      };
    }
  }

  // Fonction pour récupérer tous les commentaires d'une vidéo
  async getCommentsByVideo(videoId) {
    try {
      // On demande au serveur tous les commentaires d'une vidéo précise
      const response = await fetch(`${API_BASE_URL}/video/${videoId}`);
      const result = await response.json();
      
      // Si la requête n'a pas réussi (erreur HTTP), on retourne le message d'erreur du serveur
      if (!response.ok) {
        return {
          success: false,
          message: result.message || 'Erreur lors du chargement des commentaires',
          data: null
        };
      }
      
      return result;
    } catch (error) {
      // Si ça ne marche pas, on affiche l'erreur et on retourne un message d'erreur
      console.error('Erreur getCommentsByVideo:', error);
      return {
        success: false,
        message: 'Erreur lors du chargement des commentaires',
        data: null
      };
    }
  }

  // Fonction pour modifier un commentaire existant
  async updateComment(commentId, comment) {
    try {
      // On envoie une requête au serveur pour modifier un commentaire
      const response = await fetch(`${API_BASE_URL}/${commentId}`, {
        method: 'PUT', // Méthode PUT = modifier quelque chose qui existe déjà
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          comment: comment // Le nouveau texte du commentaire
        })
      });
      
      const result = await response.json();
      
      // Si la requête n'a pas réussi (erreur HTTP), on retourne le message d'erreur du serveur
      if (!response.ok) {
        return {
          success: false,
          message: result.message || 'Erreur lors de la modification du commentaire',
          data: null
        };
      }
      
      return result;
    } catch (error) {
      // Si ça ne marche pas, on affiche l'erreur et on retourne un message d'erreur
      console.error('Erreur updateComment:', error);
      return {
        success: false,
        message: 'Erreur lors de la modification du commentaire',
        data: null
      };
    }
  }

  // Fonction pour supprimer un commentaire
  async deleteComment(commentId) {
    try {
      // On envoie une requête au serveur pour supprimer un commentaire
      const response = await fetch(`${API_BASE_URL}/${commentId}`, {
        method: 'DELETE' // Méthode DELETE = supprimer quelque chose
      });
      
      const result = await response.json();
      
      // Si la requête n'a pas réussi (erreur HTTP), on retourne le message d'erreur du serveur
      if (!response.ok) {
        return {
          success: false,
          message: result.message || 'Erreur lors de la suppression du commentaire',
          data: null
        };
      }
      
      return result;
    } catch (error) {
      // Si ça ne marche pas, on affiche l'erreur et on retourne un message d'erreur
      console.error('Erreur deleteComment:', error);
      return {
        success: false,
        message: 'Erreur lors de la suppression du commentaire',
        data: null
      };
    }
  }
}

// On crée une instance de la classe et on l'exporte pour pouvoir l'utiliser ailleurs
export const commentService = new CommentService();
