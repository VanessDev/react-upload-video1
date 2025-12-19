# Présentation Backend : Système de Notation des Vidéos

## 🎯 Vue d'ensemble

Gestion des notes côté serveur : enregistrement des notes dans la base de données et calcul de la moyenne.

---

## 🔧 Backend

### 1. Enregistrement de la note

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

### 2. Calcul de la moyenne

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

### 3. Route API

**Fichier** : `back/src/routes/commentRoutes.js`

```javascript
// Route GET pour récupérer la moyenne d'une vidéo
// Exemple : GET /api/comments/video/123/average
router.get("/comments/video/:videoId/average", getVideoAverageRating);
```


