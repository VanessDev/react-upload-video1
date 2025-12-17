import { useState } from 'react';
import { updateComment, deleteComment } from '../../services/CommentService';

// Ce composant affiche un seul commentaire avec la possibilité de le modifier ou le supprimer
function CommentItem({ comment, onCommentUpdated, onCommentDeleted, videoId }) {
  // On garde en mémoire si on est en train de modifier le commentaire
  const [isEditing, setIsEditing] = useState(false);
  // On garde en mémoire le texte modifié du commentaire
  const [editContent, setEditContent] = useState(comment.comment);

  // Cette fonction est appelée quand on clique sur "Enregistrer" après avoir modifié
  const handleUpdate = async () => {
    try {
      // On envoie la modification au serveur
      const result = await updateComment(comment.id, editContent);
      
      if (result.success) {
        setIsEditing(false); // On sort du mode édition
        onCommentUpdated && onCommentUpdated(result.data); // On informe le composant parent
      } else {
        // Si ça n'a pas marché, on affiche un message d'erreur
        alert(result.message || 'Erreur lors de la modification');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la modification');
    }
  };

  // Cette fonction est appelée quand on clique sur "Supprimer"
  const handleDelete = async () => {
    // On demande confirmation à l'utilisateur avant de supprimer
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      return; // Si l'utilisateur dit non, on ne fait rien
    }

    try {
      // On envoie la demande de suppression au serveur
      const result = await deleteComment(comment.id);
      
      if (result.success) {
        onCommentDeleted && onCommentDeleted(comment.id); // On informe le composant parent
      } else {
        // Si ça n'a pas marché, on affiche un message d'erreur
        alert(result.message || 'Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la suppression');
    }
  };

  return (
    <div className="comment-item" style={{ marginBottom: '15px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
      {/* Si on est en train de modifier, on affiche un champ de texte avec des boutons */}
      {isEditing ? (
        <div>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)} // Quand l'utilisateur tape, on met à jour le texte
            style={{ width: '100%', minHeight: '60px', marginBottom: '10px' }}
          />
          <button onClick={handleUpdate} style={{ marginRight: '10px' }}>Enregistrer</button>
          <button onClick={() => setIsEditing(false)}>Annuler</button> {/* On annule et on sort du mode édition */}
        </div>
      ) : (
        // Sinon, on affiche le commentaire avec des boutons pour modifier ou supprimer
        <div>
          <div className="comment-content" style={{ marginBottom: '10px' }}>{comment.comment}</div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setIsEditing(true)} style={{ fontSize: '12px', padding: '5px 10px' }}>Modifier</button>
            <button onClick={handleDelete} style={{ fontSize: '12px', padding: '5px 10px', backgroundColor: '#ff4444', color: 'white', border: 'none', borderRadius: '3px' }}>Supprimer</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default CommentItem;