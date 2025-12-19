const API_URL = import.meta.env.VITE_API_URL;

export async function getThemes() {
  const response = await fetch(`${API_URL}/api/theme`);

  if (!response.ok) {
    throw new Error("Erreur chargement thèmes");
  }

  const data = await response.json();
  return data.themes;
}
