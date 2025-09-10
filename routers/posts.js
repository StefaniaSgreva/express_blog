// CommonJS
// Importa Express e crea un'istanza di router
const express = require("express");
const router = express.Router();

// Importa il controller dei post che contiene la logica delle rotte
const postsController = require("../controllers/posts");

/* Alternativa ES6 Modules (per usarla, aggiungi "type": "module" in package.json):
import express from 'express';
const router = express.Router();
import postsController from '../controllers/posts.js';*/


// Definisce la rotta GET per la radice ('/') di questo router
// Quando arriva una richiesta GET a '/posts/', viene chiamata la funzione index del controller
router.get("/", postsController.index);

// Rotta create con un h1 o error 406
router.get('/create', postsController.create);

// Rotta per mostrare un post specifico tramite slug
router.get('/:slug', postsController.show);

// Rotta che scarica l'immagine del post rappresentato dallo slug
router.get('/:slug/download', postsController.download);

// CommonJS
// Esporta il router usando CommonJS per poterlo usare nel file server.js
module.exports = router;

// ES6
// export default router;


