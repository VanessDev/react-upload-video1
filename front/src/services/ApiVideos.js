const API_URL = import.meta.env.VITE_API_URL;

export async function getVideosList() {
    console.log("fonction getVideosList ok");
    
    const response = await fetch(`${API_URL}/api/video/`);
    
    if (!response.ok) {
        console.error("Erreur lors du chargement des vidéos");
    }

    const data = await response.json();
    console.log(data);

    return data;
}

export async function getStream(id) {
    console.log("fonction getStream dans ApiVideos.js ok");
    
    const response = await fetch(`${API_URL}/api/video/${id}`);

    if (!response.ok) {
        console.error("Erreur lors du chargement de la vidéo");
    }

    const data = await response.json();

    console.log(data);
    
    return data;
}