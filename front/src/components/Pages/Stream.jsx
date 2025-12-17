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
        <div className="page">
            <h2>{video.title}</h2>
            <video controls width="1000" src={`http://localhost:3000/api/video/${video.id}/stream`}></video>
        </div>
    )
}

export default Stream