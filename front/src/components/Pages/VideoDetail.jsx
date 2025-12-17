import { useParams } from 'react-router-dom';
import CommentList from '../comments/CommentList';

// Cette page affiche les détails d'une vidéo et ses commentaires
function VideoDetail() {
  // On récupère l'identifiant de la vidéo depuis l'URL
  const { videoId } = useParams();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Détails de la vidéo #{videoId}</h1>
      
      {/* Ici vous pouvez ajouter les détails de la vidéo (titre, description, etc.) */}
      <div style={{ marginBottom: '30px' }}>
        <p>Informations de la vidéo à afficher ici...</p>
      </div>

      {/* On affiche la liste des commentaires pour cette vidéo */}
      <CommentList videoId={parseInt(videoId)} />
    </div>
  );
}

export default VideoDetail;
