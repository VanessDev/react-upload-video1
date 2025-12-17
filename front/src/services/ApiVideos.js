const API_URL = import.meta.env.VITE_API_URL;

export async function getVideosList() {
    console.log("fonction getVideosList ok");
    
    const response = await fetch(`${API_URL}/api/video/`);
    
    if (!response) {
        setError("Erreur lors du chargement des vidéos");
    }

    const data = await response.json();
    console.log(data);

    return data;
}