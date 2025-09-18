// CommonJS - Importazioni con require (default in Node.js)
// Importa express, il framework per creare il server HTTP
const express = require('express');
// Crea un'istanza dell'app Express
const app = express();
// Importa dotenv per caricare variabili d'ambiente da file .env
const dotenv = require('dotenv');
// Importa il router dedicato alle rotte dei post dalla cartella 'routers'
const postsRouter = require('./routers/posts');
// Importa le rotte di autenticazione JWT e sessione utente
const authRouter = require('./routers/auth');
// Importa il middleware per gestione degli errori globali (error handler)
const errorsFormatterMiddleware = require('./middlewares/errorsFormatter.js');
// Importa il middleware per gestire le richieste a rotte inesistenti (404 handler)
const routeNotFoundMiddleware = require('./middlewares/routeNotFound.js');

// Alternativa ES6 Modules (per usarla aggiungi "type": "module" in package.json):
// import express from 'express';
// const app = express();
// import dotenv from 'dotenv';
// import postsRouter from './routers/posts.js';
// import authRouter from './routers/auth.js';
// import adminRouter from './routers/admin.js';
// import errorsFormatterMiddleware from './middlewares/errorsFormatter.js';
// import routeNotFoundMiddleware from './middlewares/routeNotFound.js';

// Configura dotenv per caricare le variabili d'ambiente definite nel file .env in process.env
dotenv.config();

// Permette di ricevere il body delle richieste in formato application/json
app.use(express.json());

// Permette di ricevere il body delle richieste in formato application/x-www-form-urlencoded (form classico HTML)
app.use(express.urlencoded({extended: true}));

// Configura la cartella pubblica per servire file statici (immagini, css, js client, ecc.)
app.use(express.static("public"));

// =========================
//   DEFINIZIONE DELLE ROTTE
// =========================

// Rotta di root "/" che risponde con un h1 di benvenuto
app.get('/', (req, res) => {
  res.send('<h1>Benvenuto nel mio Blog!</h1>');
});

// Rotta di autenticazione JWT (es. login/logout/registrazione)
// Usata sia per ottenere il token JWT sia per gestire sessione utente se previsto
app.use('/', authRouter);

// Rotte dei post: crea, mostra, lista, elimina...
app.use('/posts', postsRouter);

// ================================
//   MIDDLEWARE DI GESTIONE ERRORI
// ================================

// Middleware globale per formattare e restituire errori come JSON
// Deve essere SEMPRE PRIMA di quello 404, così gestisce tutti gli errori generati dai controller e dai middleware successivi
app.use(errorsFormatterMiddleware);

// Middleware che gestisce tutte le richieste verso rotte non esistenti (errore 404)
// Va SEMPRE messo per ultimo dopo tutte le altre rotte/middleware
app.use(routeNotFoundMiddleware);

// =======================
//   AVVIO DEL SERVER
// =======================

// Imposta la porta letta da variabili d'ambiente, oppure fallback su 3000
const port = process.env.PORT || 3000;
// Avvia il server HTTP Express e stampa in console l'url su cui è in ascolto
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
