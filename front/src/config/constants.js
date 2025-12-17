// Fichier de configuration pour éviter les codes en dur dans l'application

// Configuration de l'API
export const API_CONFIG = {
  // L'URL de base de l'API (on peut la changer facilement ici)
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  // Le chemin pour les commentaires
  COMMENTS_PATH: '/api/comments'
};

// Configuration des commentaires
export const COMMENT_CONFIG = {
  // La longueur maximale d'un commentaire (en caractères)
  MAX_LENGTH: 500,
  // La longueur minimale d'un commentaire (en caractères)
  MIN_LENGTH: 1
};

// On construit l'URL complète pour les commentaires
export const API_BASE_URL = `${API_CONFIG.BASE_URL}${API_CONFIG.COMMENTS_PATH}`;
