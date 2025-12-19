import { useState } from 'react';
import { addComment } from '../../services/CommentService.js';
import { COMMENT_CONFIG } from '../../config/constants.js';

// Liste d'emojis populaires
const popularEmojis = [
  '😀', '😂', '❤️', '😍', '🤔', '😊', '👍', '👎',
  '😎', '🥳', '😢', '😮', '😴', '🤗', '🙄', '😋',
  '😉', '🤩', '😏', '😭', '😱', '😤', '🤯', '😇',
  '🙏', '✌️', '👌', '🤞', '🤝', '💪', '🎉', '🔥',
  '⭐', '💯', '✅', '❌', '💔', '💖', '💕', '💗'
];


// Ce composant affiche un formulaire pour écrire et envoyer un commentaire
function CommentForm({ videoId, onCommentAdded }) {
    // ============================================
    // ÉTATS (variables qui changent dans le composant)
    // ============================================
    // On garde en mémoire le texte que l'utilisateur écrit dans le formulaire
    const [content, setContent] = useState('');
    // On garde en mémoire si on est en train d'envoyer le commentaire (pour éviter de cliquer plusieurs fois)
    const [isSubmitting, setIsSubmitting] = useState(false);
    // ANNOTATIONS : État pour la note choisie (0 = aucune, 1-5 = nombre d'étoiles)
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
        // ANNOTATIONS : Envoyer la note si elle a été choisie (sinon null)
        const noteAEnvoyer = rating > 0 ? rating : null;
        const result = await addComment(videoId, content, noteAEnvoyer);
        
        // Si ça a marché, on vide le formulaire et on dit au parent qu'un nouveau commentaire a été ajouté
        if (result.success) {
          setContent('');
          // ANNOTATIONS : Réinitialiser la note après l'envoi
          setRating(0);
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
    
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    
    const handleEmojiClick = (emoji) => {
      setContent(prev => prev + emoji);
      setShowEmojiPicker(false); // Fermer le picker après sélection
    };
    // On retourne le formulaire avec un champ de texte et un bouton mais 
    // je ne sais pas comment le mettre en place dans la page avec un taiwindcss 
    
    return (
        <div className='bg-white flex flex-col items-center justify-center gap-[20px] margin-[15px] p-[20px] section-form-comments rounded-[20px]'>

          {/* Titre du formulairte */}

          <h2 className="text-primary text-xl font-bold">Ajouter un commentaire</h2>

          {/* Formulaire */}

          <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-[24px]">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Ajouter un commentaire..."
                required
                className='textarea textarea-primary'
            />
            <div className='flex justify-center items-center gap-[20px]'>
              <div>
                {/* Zone de notation avec des étoiles */}
                <div className="flex items-center gap-2 mb-3">
                  {/* Petit texte pour inviter à noter */}
                  <span className="text-sm text-gray-700 font-medium">Notez la vidéo :</span>

                  {/* On affiche 5 étoiles */}
                  <div className="rating rating-sm">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        // L'étoile est visible ou atténuée selon la note choisie
                        className={`mask mask-star cursor-pointer ${
                          star <= rating ? 'opacity-100' : 'opacity-30'
                        }`}
                        style={{ backgroundColor: '#F4D211' }}
                        aria-label={`${star} star`}
                        // Clic sur une étoile = on enregistre la note
                        onClick={() => setRating(star)}
                        // Au survol, on montre la note si rien n'est encore choisi
                        onMouseEnter={(e) => {
                          if (rating === 0) {
                            e.currentTarget.parentElement
                              .querySelectorAll('.mask-star')
                              .forEach((s, i) => {
                                if (i < star) s.classList.add('opacity-100');
                              });
                          }
                        }}
                        // Quand on quitte le survol, on remet l'affichage par défaut
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
                  </div>

                  {/* Affiche la note une fois sélectionnée */}
                  {rating > 0 && (
                    <span className="text-sm text-gray-700 font-medium">{rating}/5</span>
                  )}
                </div>
              </div>
              <div>
                <button 
                  type="button" 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation(); 
                    setShowEmojiPicker(!showEmojiPicker); 
                  }}
                  className='btn btn-emoji w-[50px]'>
                    😊 
                </button>
                <div className='relative z-1000'>
                  {showEmojiPicker && (
                    <div className='absolite z-1000 max-w-[100%] mt-[10px] bg-[rgb(255, 255, 255)] border-[1px solid #ddd] rounded-[10px] p-[15px] shadow-[0 4px 6px rgba(0,0,0,0.1)]'>
                      <div className='grid grid-cols-8 gap-[8px] max-h-[200px] overflow-y-auto'>
                        {popularEmojis.map((emoji, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleEmojiClick(emoji)}
                            className='text-[24px] p-[8px] border-none bg-transparent cursor-pointer rounded-[5px] transition  delay-[0.2s]'
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}  
                </div>            
              </div>
            </div>
            <button type="submit" disabled={isSubmitting} className='btn btn-primary w-[100px]'>
              {isSubmitting ? 'Envoi...' : 'Publier'}
            </button>

          </form>
        </div>
    );
}
export default CommentForm;