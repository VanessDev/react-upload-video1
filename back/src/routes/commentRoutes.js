const express = require('express');
// On importe toutes les fonctions qui gèrent les commentaires
const { createComment, getComments, getCommentsByVideo, updateComment, deleteComment } = require('../controllers/commentControllers.js');

// On crée un routeur pour organiser les routes des commentaires
const router = express.Router();


router.get('/comments', getComments);
router.get('/comments/video/:videoId', getCommentsByVideo);
router.post('/comments', createComment);
router.put('/comments/:id', updateComment);
router.delete('/comments/:id', deleteComment);

// On exporte le routeur pour pouvoir l'utiliser dans app.js
module.exports = router;