import { useEffect, useState } from "react";
import "../../assets/style/Home.css";
import { getVideosList } from "../../services/ApiVideos";

function Home() {

    const [videos, setVideos] = useState([]);
    const [error, setError] = useState("");

    async function videoList() {

        console.log("fonction videolist ok");

        try {
            console.log("try ok");

            const data = await getVideosList();
            console.log(data);
            console.log(data.videos);      

            setVideos(data.videos);

        } catch (err) {

            setError("Erreur serveur");

        }
    }

    useEffect(() => {
        videoList();
    }, [])

    return(
        <div className="home-page">
            <h2>Bienvenue sur VIADEO !</h2>
            <div>
               {error && <p>{error}</p>} 
            </div>
            { videos.map((v) => (
            <div className="video-card" key={v.id}>
                <p className="title-video-card">{v.title}</p>
                <video controls width="600" src={`http://localhost:3000/api/video/${v.id}/stream`} ></video>
                <p className="video-card-description">{v.description}</p>
            </div>
            ))}
        </div>
    )
}

export default Home