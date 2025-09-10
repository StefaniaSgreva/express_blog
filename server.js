// CommonJS - Importazioni con require (default in Node.js)
// dotenv serve per caricare variabili d'ambiente da file .env
const dotenv = require('dotenv');
// express è il framework per creare il server HTTP
const express = require('express');
// creiamo un'istanza dell'app Express
const app = express();
// Importa il router dedicato alle rotte dei post dalla cartella 'routers'
const postsRouter = require('./routers/posts');



// Alternativa ES6 Modules (per usarla aggiungi "type": "module" in package.json):
// import dotenv from 'dotenv';
// import express from 'express';
// const app = express();
// import posts from './db/posts.json' assert { type: 'json' };


// Configura dotenv per caricare variabili ambiente
dotenv.config();

// Configuro i file statici
app.use(express.static("public"));

// Rotta root che risponde con un h1 di benvenuto
app.get('/', (req, res) => {
  res.send('<h1>Benvenuto nel mio Blog!</h1>');
});

// Usa il router che contiene tutte le rotte posts
app.use('/posts', postsRouter);

// Impostiamo la porta presa da .env o fallback a 3000
const port = process.env.PORT || 3000;
// Avviamo il server e logghiamo l'url di ascolto
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
