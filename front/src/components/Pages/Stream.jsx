import { useEffect, useState } from "react"
import { getStream } from "../../services/ApiVideos";
import { useParams } from "react-router-dom";
import { getVideoAverageRating } from "../../services/CommentService";

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
            <video controls width="1000" src={`http://localhost:3000/api/video/${video.id}/stream`}></video>
            <p>{video.theme}</p>
            <p>{video.description}</p>
            <div className="rating flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <div
                        key={star}
                        className={`mask mask-star bg-primary ${
                            averageRating && star <= Math.round(averageRating) ? 'opacity-100' : 'opacity-30'
                        }`}
                        aria-label={`${star} star`}
                    />
                ))}
                {averageRating !== null && (
                    <span className="ml-2 text-sm">
                        {parseFloat(averageRating).toFixed(1)}/5 ({ratingCount} {ratingCount > 1 ? 'votes' : 'vote'})
                    </span>
                )}
                {averageRating === null && ratingCount === 0 && (
                    <span className="ml-2 text-sm text-gray-400">Aucune note</span>
                )}
            </div>
        </div>
    )
}

export default Stream