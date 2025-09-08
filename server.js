// CommonJS - Importazioni con require (default in Node.js)
// dotenv serve per caricare variabili d'ambiente da file .env
const dotenv = require('dotenv');
// express è il framework per creare il server HTTP
const express = require('express');
// creiamo un'istanza dell'app Express
const app = express();
// Importa dati dei post da file JSON (cartella db)
const posts = require('./db/posts.json');


// Alternativa ES6 Modules (per usarla aggiungi "type": "module" in package.json):
// import dotenv from 'dotenv';
// import express from 'express';
// const app = express();
// import posts from './db/posts.json' assert { type: 'json' };


// Configura dotenv per caricare variabili ambiente
dotenv.config();


// Rotta root che risponde con un h1 di benvenuto
app.get('/', (req, res) => {
  res.send('<h1>Benvenuto nel mio Blog!</h1>');
});

// Rotta /posts che restituisce in JSON l'array di post
app.get('/posts', (req, res) => {
  res.json(posts);
});


// Impostiamo la porta presa da .env o fallback a 3000
const port = process.env.PORT || 3000;
// Avviamo il server e logghiamo l'url di ascolto
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
