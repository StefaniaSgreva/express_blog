const fs = require('fs');
const path = require('path');
const slugify = require('slugify');

// Percorso al file JSON da aggiornare
const filePath = path.join(__dirname, 'db', 'posts.json');

// Leggi contenuto del file
const rawData = fs.readFileSync(filePath, 'utf-8');
const posts = JSON.parse(rawData);

// Aggiungi campo slug a ogni post usando slugify
const postsWithSlug = posts.map(post => ({
  ...post,
  slug: slugify(post.title, { lower: true, strict: true }) // lowercase, no special chars
}));

// Scrivi di nuovo nel file JSON
fs.writeFileSync(filePath, JSON.stringify(postsWithSlug, null, 2), 'utf-8');

console.log('Slug generati con slugify e file aggiornato!');
