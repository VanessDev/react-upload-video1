import { useEffect, useState } from "react";
import "../../assets/style/Home.css";

function Home() {

    const [videos, setVideos] = useState([]);
    const [error, setError] = useState("");

    async function videoList() {

        console.log("fonction videolist ok");

        try {
            console.log("try ok");
            
            const response = await fetch("http://localhost:3000/api/video");

            if (response.ok) {

                const data = await response.json();
                console.log(data);
                
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
            <div className="video-card">
                <p className="title-video-card">Title</p>
                <video src=""></video>
                <p className="video-card-description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio error voluptatum doloremque, illum facilis at, hic labore cum mollitia perspiciatis possimus in nisi totam est laborum earum culpa. Nemo, vitae!</p>
            </div>
        </div>
    )
}

export default Home