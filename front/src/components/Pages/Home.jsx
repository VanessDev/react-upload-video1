import { useEffect, useState } from "react";
import "../../assets/style/Home.css";

function Home() {

    const [videos, setVideos] = useState([]);
    const [error, setError] = useState("");

    async function videoList() {

        console.log("fonction videolist ok");

        try {
            console.log("try ok");
            
            const response = await fetch("http://localhost:3000/api/video/");

            if (response.ok) {

                const data = await response.json();
                console.log(data);
                console.log(data.videos);
                
                setVideos(data.videos);

            } else {

                setError("Erreur lors du chargement des vidéos");

            }

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
            <div className="video-card">
                <p className="title-video-card">{v.title}</p>
                <video controls width="600" src={`http://localhost:3000/api/video/${id}/stream`} ></video>
                <p className="video-card-description">{v.description}</p>
            </div>
            ))}
        </div>
    )
}

export default Home