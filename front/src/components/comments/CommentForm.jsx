import { useState } from 'react';
import { addComment } from '../../services/CommentService.js';
import { COMMENT_CONFIG } from '../../config/constants.js';

// Ce composant affiche un formulaire pour écrire et envoyer un commentaire
function CommentForm({ videoId, onCommentAdded }) {
    // On garde en mémoire le texte que l'utilisateur écrit dans le formulaire
    const [content, setContent] = useState('');
    // On garde en mémoire si on est en train d'envoyer le commentaire (pour éviter de cliquer plusieurs fois)
    const [isSubmitting, setIsSubmitting] = useState(false);
    // etat pour la note selectionnée
    const [rating, setRating] = useState(0);
  
    // Cette fonction est appelée quand l'utilisateur clique sur "Publier"
    const handleSubmit = async (e) => {
      e.preventDefault(); // On empêche le formulaire de se recharger la page
      
      // On vérifie que l'utilisateur a bien écrit quelque chose
      if (!content.trim()) {
        alert('Veuillez saisir un commentaire');
        return;
      }
      
      // On vérifie que le commentaire ne dépasse pas la limite maximale
      if (content.length > COMMENT_CONFIG.MAX_LENGTH) {
        alert(`Le commentaire ne peut pas dépasser ${COMMENT_CONFIG.MAX_LENGTH} caractères`);
        return;
      }
  
      // On dit qu'on est en train d'envoyer le commentaire
      setIsSubmitting(true);
      try {
        // On appelle le service pour envoyer le commentaire au serveur
        const result = await addComment(videoId, content, rating);
        
        // Si ça a marché, on vide le formulaire et on dit au parent qu'un nouveau commentaire a été ajouté
        if (result.success) {
          setContent(''); // On vide le champ de texte
          setRating(0); //reintialiser la note
          onCommentAdded && onCommentAdded(result.data); // On informe le composant parent
        } else {
          // Si ça n'a pas marché, on affiche un message d'erreur
          alert(result.message || "Erreur lors de l'ajout du commentaire");
        }
      } catch (error) {
        // Si une erreur se produit, on l'affiche
        console.error('Erreur:', error);
        alert("Erreur lors de l'ajout du commentaire");
      } finally {
        // Dans tous les cas, on dit qu'on a fini d'envoyer
        setIsSubmitting(false);
      }
    };
    
    // On retourne le formulaire avec un champ de texte et un bouton mais 
    // je ne sais pas comment le mettre en place dans la page avec un taiwindcss 
    
    return (
        <form onSubmit={handleSubmit} className="comment-form" style={{ 
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: 'white',  // ← JUSTE le fond blanc
          borderRadius: '5px'
        }}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Ajouter un commentaire..."
                required
                style={{ width: '100%', minHeight: '80px', marginBottom: '10px' }}
            />

        {/* Zone de notation avec des étoiles */}
<div className="rating rating-sm mb-3">
  {/* Petit texte pour inviter à noter */}
  <span className="mr-2 text-sm">Notez la vidéo :</span>

  {/* On affiche 5 étoiles */}
  {[1, 2, 3, 4, 5].map((star) => (
    <div
      key={star}
      // L’étoile est visible ou atténuée selon la note choisie
      className={`mask mask-star bg-primary cursor-pointer ${
        star <= rating ? 'opacity-100' : 'opacity-30'
      }`}
      aria-label={`${star} star`}
      // Clic sur une étoile = on enregistre la note
      onClick={() => setRating(star)}
      // Au survol, on montre la note si rien n’est encore choisi
      onMouseEnter={(e) => {
        if (rating === 0) {
          e.currentTarget.parentElement
            .querySelectorAll('.mask-star')
            .forEach((s, i) => {
              if (i < star) s.classList.add('opacity-100');
            });
        }
      }}
      // Quand on quitte le survol, on remet l’affichage par défaut
      onMouseLeave={(e) => {
        if (rating === 0) {
          e.currentTarget.parentElement
            .querySelectorAll('.mask-star')
            .forEach((s) => {
              s.classList.remove('opacity-100');
              s.classList.add('opacity-30');
            });
        }
      }}
    />
  ))}

  {/* Affiche la note une fois sélectionnée */}
  {rating > 0 && (
    <span className="ml-2 text-sm text-gray-600">{rating}/5</span>
  )}
</div>


            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Envoi...' : 'Publier'}
            </button>
        </form>
    );
}
export default CommentForm;