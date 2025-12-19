# Présentation : Système de Notation des Vidéos - Flux Complet

## 🎯 Vue d'ensemble

Système permettant de noter les vidéos (1-5 étoiles) lors de la création d'un commentaire, avec affichage de la moyenne des notes.

---

## 🔄 Flux 1 : Création d'une note

### Étape 1 : Frontend - Formulaire de notation

**Fichier** : `front/src/components/comments/CommentForm.jsx`

```javascript
// État pour stocker la note choisie (0 = aucune, 1-5 = nombre d'étoiles)
const [rating, setRating] = useState(0);

// Affichage des 5 étoiles
{[1, 2, 3, 4, 5].map((star) => (
  <div
    // Étoile pleine si star <= rating, sinon transparente
    className={`mask mask-star ${star <= rating ? 'opacity-100' : 'opacity-30'}`}
    // Clic sur une étoile → enregistrer sa valeur
    onClick={() => setRating(star)}
  />
))}

// Envoi : envoyer la note seulement si elle est > 0, sinon null
const noteAEnvoyer = rating > 0 ? rating : null;
await addComment(videoId, content, noteAEnvoyer);
```

---

### Étape 2 : Frontend - Service API

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
```

---

### Étape 3 : Backend - Route API

**Fichier** : `back/src/routes/commentRoutes.js`

```javascript
// Route POST pour créer un commentaire (avec note optionnelle)
router.post("/comments", createComment);
```

---

### Étape 4 : Backend - Contrôleur

**Fichier** : `back/src/controllers/commentControllers.js` - fonction `createComment()`

```javascript
// Vérifier si une note a été envoyée
if (rating !== undefined && rating !== null) {
  // Convertir la note en nombre (ex: "3" → 3)
  const ratingNum = parseInt(rating, 10);
  // Vérifier que la note est entre 1 et 5
  if (ratingNum >= 1 && ratingNum <= 5) {
    // Enregistrer la note dans la base de données
    await pool.execute(
      "INSERT INTO notations (notation, video_id) VALUES (?, ?)",
      [ratingNum, video_id]
    );
  }
}
```

---

## 🔄 Flux 2 : Affichage de la moyenne

### Étape 1 : Frontend - Chargement de la vidéo

**Fichier** : `front/src/components/Pages/Stream.jsx`

```javascript
// États pour stocker la moyenne et le nombre de votes
const [averageRating, setAverageRating] = useState(null);
const [ratingCount, setRatingCount] = useState(0);

// Chargement : récupérer la moyenne depuis le serveur
const ratingData = await getVideoAverageRating(id);
setAverageRating(ratingData.data.average);  // Ex: 4.25
setRatingCount(ratingData.data.count);      // Ex: 10
```

---

### Étape 2 : Frontend - Service API

**Fichier** : `front/src/services/CommentService.js`

```javascript
// Fonction pour récupérer la moyenne des notes
export async function getVideoAverageRating(videoId) {
  // Faire une requête GET vers l'API
  const response = await fetch(`${API_BASE_URL}/video/${videoId}/average`);
  return await response.json();
}
```

---

### Étape 3 : Backend - Route API

**Fichier** : `back/src/routes/commentRoutes.js`

```javascript
// Route GET pour récupérer la moyenne d'une vidéo
// Exemple : GET /api/comments/video/123/average
router.get("/comments/video/:videoId/average", getVideoAverageRating);
```

---

### Étape 4 : Backend - Contrôleur

**Fichier** : `back/src/controllers/commentControllers.js` - fonction `getVideoAverageRating()`

```javascript
// Requête SQL pour calculer automatiquement :
// AVG(notation) = calcule la moyenne de toutes les notes
// COUNT(*) = compte combien il y a de notes
const [result] = await pool.execute(
  "SELECT AVG(notation) as average, COUNT(*) as count FROM notations WHERE video_id = ?",
  [videoId]
);

// Préparer les données à retourner
let moyenne = null;
if (result[0].average) {
  // Si une moyenne existe, la convertir en nombre décimal
  moyenne = parseFloat(result[0].average);
}
const nombreVotes = result[0].count || 0;

return res.status(200).json({
  success: true,
  message: "Moyenne récupérée avec succès",
  data: {
    average: moyenne,  // null si aucune note, sinon un nombre (ex: 4.25)
    count: nombreVotes  // Nombre de votes (0 si aucun)
  }
});
```

---

### Étape 5 : Frontend - Affichage

**Fichier** : `front/src/components/Pages/Stream.jsx`

```javascript
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

## 📊 Résumé du flux

**Création d'une note** :
1. Utilisateur clique sur étoile → `setRating(3)` (Frontend)
2. Clic sur "Publier" → `addComment(..., 3)` (Frontend Service)
3. Requête `POST /api/comments` (Route Backend)
4. Validation et `INSERT INTO notations` (Contrôleur Backend)
5. Retour du commentaire créé (Frontend)

**Affichage de la moyenne** :
1. Chargement vidéo → `getVideoAverageRating(id)` (Frontend)
2. Requête `GET /api/comments/video/:id/average` (Frontend Service)
3. Route backend → `getVideoAverageRating` (Route Backend)
4. Calcul SQL `SELECT AVG(notation), COUNT(*)` (Contrôleur Backend)
5. Retour `{ average: 4.25, count: 10 }` (Frontend)
6. Affichage des étoiles selon `Math.round(4.25) = 4` (Frontend)

