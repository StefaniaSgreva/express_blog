const fs = require('fs');
const path = require('path');

// Funzione per generare slug da un titolo
function generateSlug(title) {
  return title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // sostituisce caratteri non alfanumerici con '-'
    .replace(/(^-|-$)/g, '');    // rimuove trattini iniziali o finali
}

// Percorso al file JSON da aggiornare
const filePath = path.join(__dirname, 'db', 'posts.json');

// Leggi contenuto del file
const rawData = fs.readFileSync(filePath, 'utf-8');
const posts = JSON.parse(rawData);

// Aggiungi campo slug a ogni post
const postsWithSlug = posts.map(post => ({
  ...post,
  slug: generateSlug(post.title)
}));

// Scrivi di nuovo nel file JSON
fs.writeFileSync(filePath, JSON.stringify(postsWithSlug, null, 2), 'utf-8');

console.log('Slug generati e file aggiornato con successo!');
