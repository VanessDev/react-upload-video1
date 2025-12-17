import { useState, useEffect } from 'react';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import { getCommentsByVideo } from '../../services/CommentService';

// Ce composant affiche la liste de tous les commentaires d'une vidéo
function CommentList({ videoId }) {
  // On garde en mémoire la liste des commentaires
  const [comments, setComments] = useState([]);
  // On garde en mémoire si on est en train de charger les commentaires
  const [loading, setLoading] = useState(true);
  // On garde en mémoire s'il y a une erreur
  const [error, setError] = useState(null);

  // Cette fonction charge les commentaires depuis le serveur
  const loadComments = async () => {
    try {
      setLoading(true); // On dit qu'on commence à charger
      // On demande au serveur tous les commentaires de cette vidéo
      const result = await getCommentsByVideo(videoId);
      
      if (result.success) {
        // Si ça a marché, on met à jour la liste des commentaires
        setComments(result.data);
        setError(null); // Pas d'erreur
      } else {
        // Si ça n'a pas marché, on affiche un message d'erreur
        setError(result.message || 'Erreur lors du chargement des commentaires');
      }
    } catch (err) {
      // Si une erreur se produit, on l'affiche
      console.error('Erreur:', err);
      setError('Erreur lors du chargement des commentaires');
    } finally {
      setLoading(false); // On dit qu'on a fini de charger
    }
  };

  // Cette fonction s'exécute automatiquement quand le composant apparaît ou quand videoId change
  useEffect(() => {
    if (videoId) {
      loadComments(); // On charge les commentaires
    }
  }, [videoId]);

  // Cette fonction est appelée quand un nouveau commentaire est ajouté
  const handleCommentAdded = (newComment) => {
    // On ajoute le nouveau commentaire au début de la liste
    setComments([newComment, ...comments]);
  };

  // Cette fonction est appelée quand un commentaire est modifié
  const handleCommentUpdated = (updatedComment) => {
    // On remplace l'ancien commentaire par le nouveau dans la liste
    setComments(comments.map(c => 
      c.id === updatedComment.id ? updatedComment : c
    ));
  };

  // Cette fonction est appelée quand un commentaire est supprimé
  const handleCommentDeleted = (commentId) => {
    // On enlève le commentaire de la liste
    setComments(comments.filter(c => c.id !== commentId));
  };

  // Si on est en train de charger, on affiche un message
  if (loading) {
    return <div>Chargement des commentaires...</div>;
  }

  // S'il y a une erreur, on l'affiche en rouge
  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  // On affiche le formulaire pour ajouter un commentaire et la liste des commentaires
  return (
    <div style={{ marginTop: '30px' }}>
      <h2 style={{ marginBottom: '20px' }}>
        Commentaires ({comments.length}) {/* On affiche le nombre de commentaires */}
      </h2>
      
      {/* Le formulaire pour ajouter un nouveau commentaire */}
      <CommentForm
        videoId={videoId}
        onCommentAdded={handleCommentAdded}
      />

      {/* Si il n'y a pas de commentaires, on affiche un message */}
      {comments.length === 0 ? (
        <p style={{ color: '#666', fontStyle: 'italic' }}>
          Aucun commentaire pour le moment. Soyez le premier à commenter !
        </p>
      ) : (
        // Sinon, on affiche tous les commentaires un par un
        <div>
          {comments.map((comment) => (
            <CommentItem
              key={comment.id} // Chaque commentaire a un identifiant unique
              comment={comment}
              onCommentUpdated={handleCommentUpdated}
              onCommentDeleted={handleCommentDeleted}
              videoId={videoId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CommentList;