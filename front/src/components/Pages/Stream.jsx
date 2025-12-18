import { useEffect, useState } from "react"
import { getStream } from "../../services/ApiVideos";
import { useParams } from "react-router-dom";
import { getVideoAverageRating } from "../../services/CommentService";
// Import du composant CommentList pour afficher le formulaire de commentaires et la liste
import CommentList from "../comments/CommentList";

function Stream() {
    const { id } = useParams();

    const [video, setVideo] = useState(null);
    const [error, setError] = useState("");
    // note moyenne de la video
    const [averageRating, setAverageRating] = useState(null);
    // nombre total de note
    const [ratingCount, setRatingCount] = useState(0)

    async function getVideo() {
        console.log("fonction getVideo dans Stream.jsx ok");
        try {

            console.log("try ok");

            const data = await getStream(id);
            console.log(data);
            console.log(data.video);
            setVideo(data.video);

            // Charger la moyenne des notes
            try {
                const ratingData = await getVideoAverageRating(id);
                if (ratingData.success && ratingData.data) {
                    setAverageRating(ratingData.data.average);
                    setRatingCount(ratingData.data.count);
                }
            } catch (ratingError) {
                console.error("Erreur lors du chargement de la moyenne:", ratingError);
                // On ne bloque pas l'affichage de la vidéo si la moyenne échoue
            }

        } catch (error) {
            console.error("Erreur serveur");
            setError("Erreur serveur");
        }
    }

    useEffect(() => {
        if (!id) return;
        getVideo();
    }, [id])

    if (error) {
        return <p>{error}</p>
    }

    if (!video) {
        return <p>Chargement...</p>;
    }

    return (
        <div className="page gap-[24px]">
            <h2 className="text-primary font-bold text-4xl">{video.title}</h2>
            <video controls width="1000" src={`http://localhost:3000/api/video/${video.id}/stream`} className="h-[80vh]"></video>
            <div style={{ width: '700px', backgroundColor: '#fff', padding: '15px', borderRadius: '5px', border: '1px solid #ddd', marginTop: '20px' }}>
                <p style={{ color: '#333', marginBottom: '10px' }}>{video.theme}</p>
                <p style={{ color: '#333', marginBottom: '15px' }}>{video.description}</p>
                <div className="flex items-center gap-2">
                    <div className="rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <div
                                key={star}
                                className={`mask mask-star ${
                                    averageRating && star <= Math.round(averageRating) ? 'opacity-100' : 'opacity-30'
                                }`}
                                style={{ backgroundColor: '#F4D211' }}
                                aria-label={`${star} star`}
                            />
                        ))}
                    </div>
                    {averageRating !== null && (
                        <span className="text-sm text-gray-700">
                            {parseFloat(averageRating).toFixed(1)}/5 ({ratingCount} {ratingCount > 1 ? 'votes' : 'vote'})
                        </span>
                    )}
                    {averageRating === null && ratingCount === 0 && (
                        <span className="text-sm text-gray-700 font-medium">Aucune note</span>
                    )}
                </div>
            </div>
            <CommentList videoId={video.id} />
        </div>
    )
}

export default Stream