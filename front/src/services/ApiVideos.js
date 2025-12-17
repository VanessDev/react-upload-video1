const API_URL = import.meta.env.VITE_API_URL;

export async function getVideosList() {
    console.log("fonction getVideosList ok");
    
    const response = await fetch(`${API_URL}/api/video/`);
    
    if (!response) {
        console.error("Erreur lors du chargement des vidéos");
    }

    const data = await response.json();
    console.log(data);

    return data;
}

export async function getStream() {
    console.log("fonction getStream dans ApiVideos.js ok");
    
    const response = await fetch(`${API_URL}/api/video/${id}/stream`);

    if (!response) {
        console.error("Erreur lors du chargement de la vidéo");
    }

    console.log(response);
    
    return response;
}