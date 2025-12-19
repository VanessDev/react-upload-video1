# Présentation Frontend : Système de Notation des Vidéos

## 🎯 Vue d'ensemble

Interface utilisateur pour noter les vidéos avec des étoiles et afficher la moyenne des notes.

---

## 🎨 Frontend

### 1. Formulaire de notation

**Fichier** : `front/src/components/comments/CommentForm.jsx`

```javascript
// État pour stocker la note choisie (0 = aucune, 1-5 = nombre d'étoiles)
const [rating, setRating] = useState(0);

// Envoi : envoyer la note seulement si elle est > 0, sinon null
const noteAEnvoyer = rating > 0 ? rating : null;
await addComment(videoId, content, noteAEnvoyer);

// Affichage des 5 étoiles
{[1, 2, 3, 4, 5].map((star) => (
  <div
    // Étoile pleine si star <= rating, sinon transparente
    className={`mask mask-star ${star <= rating ? 'opacity-100' : 'opacity-30'}`}
    // Clic sur une étoile → enregistrer sa valeur
    onClick={() => setRating(star)}
  />
))}
```

---

### 2. Affichage de la moyenne

**Fichier** : `front/src/components/Pages/Stream.jsx`

```javascript
// États pour stocker la moyenne et le nombre de votes
const [averageRating, setAverageRating] = useState(null);
const [ratingCount, setRatingCount] = useState(0);

// Chargement : récupérer la moyenne depuis le serveur
const ratingData = await getVideoAverageRating(id);
setAverageRating(ratingData.data.average);  // Ex: 4.25
setRatingCount(ratingData.data.count);      // Ex: 10

// Affichage des étoiles selon la moyenne
{[1, 2, 3, 4, 5].map((star) => {
  // Arrondir la moyenne (ex: 4.25 → 4)
  const moyenneArrondie = averageRating ? Math.round(averageRating) : 0;
  return (
    // Étoile pleine si star <= moyenne arrondie
    <div className={`mask mask-star ${star <= moyenneArrondie ? 'opacity-100' : 'opacity-30'}`} />
  );
})}
// Afficher le texte seulement si une moyenne existe
{averageRating !== null && <span>{averageRating.toFixed(1)}/5 ({ratingCount} votes)</span>}
```

---

### 3. Service API

**Fichier** : `front/src/services/CommentService.js`

```javascript
// Fonction pour créer un commentaire avec note optionnelle
export async function addComment(videoId, comment, rating) {
  const donnees = {
    comment: comment,
    video_id: videoId,
    rating: rating || null // Note optionnelle (1-5 ou null)
  };
  
  // Envoyer une requête POST avec les données
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(donnees),
  });
  return await response.json();
}

// Fonction pour récupérer la moyenne des notes
export async function getVideoAverageRating(videoId) {
  // Faire une requête GET vers l'API
  const response = await fetch(`${API_BASE_URL}/video/${videoId}/average`);
  return await response.json();
}
```


