import { useEffect, useState } from "react"
import { getStream } from "../../services/ApiVideos";
import { useParams } from "react-router-dom";

function Stream() {
    const {id} = useParams();

    const [video, setVideo] = useState(null);
    const [error, setError] = useState("");

    async function getVideo() {
        console.log("fonction getVideo dans Stream.jsx ok");
        try {

            console.log("try ok");
            
            const data = await getStream(id);
            console.log(data);
            console.log(data.video);
            
            setVideo(data.video);

        } catch (error) {
            console.error("Erreur serveur");
            setError("Erreur serveur");
        }
    }

    useEffect(()=> {
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
            <p>{video.theme}</p>
            <p>{video.description}</p>
            <div className="rating">
                <div className="mask mask-star bg-primary" aria-label="1 star"></div>
                <div className="mask mask-star bg-primary" aria-label="2 star"></div>
                <div className="mask mask-star bg-primary" aria-label="3 star" aria-current="true"></div>
                <div className="mask mask-star bg-primary" aria-label="4 star"></div>
                <div className="mask mask-star bg-primary" aria-label="5 star"></div>
            </div>
        </div>
    )
}

export default Stream