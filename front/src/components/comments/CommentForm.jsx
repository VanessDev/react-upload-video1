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
        <div className='bg-white flex flex-col items-center justify-center gap-[20px] margin-[15px] p-[20px] section-form-comments rounded-[20px]'>
          <h2 className="text-primary text-xl font-bold">Ajouter un commentaire</h2>
          <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-[24px]">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Ajouter un commentaire..."
                required
                className='textarea textarea-primary'
            />
            <button type="submit" disabled={isSubmitting} className='btn btn-primary btn-upload'>
              {isSubmitting ? 'Envoi...' : 'Publier'}
            </button>
          </form>
        </div>
    );
}
export default CommentForm;