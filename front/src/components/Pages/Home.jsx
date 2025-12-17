import { useEffect, useState } from "react";
import "../../assets/style/Home.css";
import { getVideosList } from "../../services/ApiVideos";
import { Link } from "react-router-dom";

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
                <Link to={`/${v.id}`} key={v.id} className="video-link">   
                    <div className="video-card">
                        <p className="title-video-card">{v.title}</p>
                        <video controls width="300" src={`http://localhost:3000/api/video/${v.id}/stream`} ></video>
                        <p>{v.theme}</p>
                        <p className="video-card-description">{v.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Home