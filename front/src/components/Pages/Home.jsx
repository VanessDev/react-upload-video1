import { useEffect, useState } from "react";

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
        <div>
            <h2>Bienvenue sur VIADEO !</h2>
            <div>
               {error && <p>{error}</p>} 
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default Home