import { API_BASE_URL } from "../config/constants";

// ANNOTATIONS : Créer un commentaire avec note optionnelle
export async function addComment(videoId, comment, rating) {
  const donnees = {
    comment: comment,
    video_id: videoId,
    rating: rating || null // Note optionnelle (1-5 ou null)
  };

  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      comment: comment,
      video_id: videoId,
      rating: rating || null, // Envoyer la note si elle existe
    }),
  });

  return await response.json();
}

export async function getCommentsByVideo(videoId) {
  const response = await fetch(`${API_BASE_URL}/video/${videoId}`);
  const data = await response.json();
  return data;
}

export async function updateComment(commentId, comment) {
  const response = await fetch(`${API_BASE_URL}/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      comment: comment,
    }),
  });

  const data = await response.json();
  return data;
}

export async function deleteComment(commentId) {
  const response = await fetch(`${API_BASE_URL}/${commentId}`, {
    method: "DELETE",
  });

  const data = await response.json();
  return data;
}

// ANNOTATIONS : Récupérer la moyenne des notes d'une vidéo
export async function getVideoAverageRating(videoId) {
  const response = await fetch(`${API_BASE_URL}/video/${videoId}/average`);
  return await response.json();
}
