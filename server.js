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
  const accept = req.headers.accept || '';

  if (accept.includes('application/json')) {
    // Risposta JSON
    res.json(posts);
  } else if (accept.includes('text/html')) {
    // Costruzione HTML con stile base per i post
    let html = `
      <h1>Lista dei Post</h1>
      <ul style="list-style-type:none; padding: 0;">
    `;

    posts.forEach(post => {
      html += `
        <li style="margin-bottom: 25px; border-bottom: 1px solid #ddd; padding-bottom: 15px;">
          <h2>${post.title}</h2>
          <img src="${post.image}" alt="${post.title}" style="max-width: 100%; height: auto;">
          <p>${post.content}</p>
          <p><strong>Tags:</strong> ${post.tags.map(tag => `<span style="background:#eee; border-radius:5px; padding:2px 8px; margin-right:5px;">${tag}</span>`).join('')}</p>
        </li>
      `;
    });

    html += `</ul>`;
    res.send(html);
  } else {
    res.json(posts);
  }
});

// Impostiamo la porta presa da .env o fallback a 3000
const port = process.env.PORT || 3000;
// Avviamo il server e logghiamo l'url di ascolto
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
