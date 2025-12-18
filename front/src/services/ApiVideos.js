const API_URL = import.meta.env.VITE_API_URL;

export async function getVideosList(filters = {}) {
  console.log("fonction getVideosList ok");

  if (!API_URL) {
    throw new Error("VITE_API_URL est undefined (vérifie ton .env et redémarre Vite)");
  }

  const params = new URLSearchParams();

  if (filters.title) params.set("title", filters.title);
  if (filters.theme) params.set("theme", filters.theme);
  if (filters.note) params.set("note", filters.note);
  if (filters.date) params.set("date", filters.date);

  const url = `${API_URL}/api/video${params.toString() ? `?${params}` : ""}`;

  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Erreur API ${response.status}: ${text}`);
  }

  return await response.json();
}

export async function getStream(id) {
  console.log("fonction getStream dans ApiVideos.js ok");

  const response = await fetch(`${API_URL}/api/video/${id}`);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Erreur API ${response.status}: ${text}`);
  }

  return await response.json();
}
