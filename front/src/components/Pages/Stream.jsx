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
    // ANNOTATIONS : Note moyenne de la vidéo
    const [averageRating, setAverageRating] = useState(null);
    // ANNOTATIONS : Nombre total de votes
    const [ratingCount, setRatingCount] = useState(0)

    async function getVideo() {
        console.log("fonction getVideo dans Stream.jsx ok");
        try {

            console.log("try ok");

            const data = await getStream(id);
            console.log(data);
            console.log(data.video);
            setVideo(data.video);

            // ANNOTATIONS : Charger la moyenne des notes
            try {
                const ratingData = await getVideoAverageRating(id);
                if (ratingData.success && ratingData.data) {
                    setAverageRating(ratingData.data.average);
                    setRatingCount(ratingData.data.count);
                }
            } catch (ratingError) {
                console.error("Erreur lors du chargement de la moyenne:", ratingError);
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
            <p className="text-left w-full m-8">{video.theme || "-" }</p>
            <div className="text-left w-full flex gap-10 m-[20px]">    
                <p className="text-left w-full">{video.description}</p>
                <div className="flex items-center gap-2 flex-col">
                    <div className="rating">
                        {[1, 2, 3, 4, 5].map((star) => {
                            const moyenneArrondie = averageRating ? Math.round(averageRating) : 0;
                            const estPleine = star <= moyenneArrondie;
                            return (
                                <div
                                    key={star}
                                    className={`mask mask-star ${estPleine ? 'opacity-100' : 'opacity-30'}`}
                                    style={{ backgroundColor: '#F4D211' }}
                                />
                            );
                        })}
                    </div>
                    {averageRating !== null ? (
                        <span className="text-sm text-gray-700">
                            {averageRating.toFixed(1)}/5 ({ratingCount} {ratingCount > 1 ? 'votes' : 'vote'})
                        </span>
                    ) : (
                        <span className="text-sm text-gray-700 font-medium">Aucune note</span>
                    )}
                </div>
            </div>
            <CommentList videoId={video.id} />
        </div>
    )
}

export default Stream