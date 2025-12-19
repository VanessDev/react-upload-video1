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
    <div className="comment-item" style={{ 
      marginBottom: '15px', 
      padding: '10px', 
      backgroundColor: 'white',  
      border: '1px solid #ddd', 
      borderRadius: '5px' 
    }}>
      {isEditing ? (
        <div>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            style={{ width: '100%', minHeight: '60px', marginBottom: '10px' }}
          />
          <button onClick={handleUpdate} style={{ fontSize: '12px', padding: '5px 10px', marginRight: '10px' }}>Enregistrer</button>
          <button onClick={() => setIsEditing(false)} style={{ fontSize: '12px', padding: '5px 10px' }}>Annuler</button>
        </div>
      ) : (
        <div>
          <div className="comment-content" style={{ marginBottom: '10px' }}>{comment.comment}</div>
          {/* <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setIsEditing(true)} style={{ fontSize: '12px', padding: '5px 10px', border: '1px solid #03023E', color: '#03023E', backgroundColor: 'transparent', borderRadius: '3px' }}>Modifier</button>
            <button onClick={handleDelete} style={{ fontSize: '12px', padding: '5px 10px', backgroundColor: '#ff4444', color: 'white', border: 'none', borderRadius: '3px' }}>Supprimer</button>
          </div> */}
        </div>
      )}
    </div>
  );
}
export default CommentItem;