// CommonJS
// Import dei moduli core necesari per file system, path e slug generation
const fs = require('fs');
const path = require('path');
const slugify = require('slugify');

// Carica il file JSON contenente i post in memoria
let posts = require('../db/posts.json');
// Percorso assoluto al file JSON per aggiornamenti
const postsFilePath = path.join(__dirname, '..', 'db', 'posts.json');

// Alternativa ES6 Modules (se usi module):
// import posts from '../db/posts.json' assert { type: 'json' };

// Controller che restituisce la lista di tutti i post
function index(req, res) {
  const accept = req.headers.accept || '';

  if (accept.includes('application/json')) {
    // Risposta in formato JSON
    res.json(posts);
  } else if (accept.includes('text/html')) {
    // Risposta in formato HTML con un semplice stile
    let html = `
      <h1>Lista dei Post</h1>
      <ul style="list-style-type:none; padding: 0;">
    `;

    posts.forEach(post => {
      html += `
        <li style="margin-bottom: 25px; border-bottom: 1px solid #ddd; padding-bottom: 15px;">
          <h2><a href="/posts/${post.slug}">${post.title}</a></h2>  
          <img src="/images/posts_cover/${post.image}" alt="${post.title}" style="max-width: 100%; height: auto;">
          <p>${post.content}</p>
          <p><strong>Tags:</strong> ${post.tags.map(tag => `<span style="background:#eee; border-radius:5px; padding:2px 8px; margin-right:5px;">${tag}</span>`).join('')}</p>
        </li>
      `;
    });

    html += `</ul>`;
    res.send(html);
  } else {
    // Risposta di fallback in JSON se l'header Accept non è specificato
    res.json(posts);
  }
}

// Controller che mostra un singolo post in base allo "slug"
function show(req, res) {
  const slug = req.params.slug;
  const post = posts.find(post => post.slug === slug);

  if (post) {
    // Costruisco URL assoluti per l'immagine e per il download
    const baseUrl = `${req.protocol}://${req.get('host')}/posts/${slug}`;
    const postWithUrls = {
      ...post,
      image_url: `${req.protocol}://${req.get('host')}/images/posts_cover/${post.image}`,
      image_download_url: `${baseUrl}/download`
    };
    res.json(postWithUrls);
  } else {
    // Se lo slug non esiste, restituisco errore 404
    res.status(404).json({ error: "Post non trovato" });
  }
}

// Funzione store per creare un nuovo post da dati POST urlencoded
function store(req, res) {
  const { title, content, tags } = req.body;

  // Validazione semplice
  if (!title || !content) {
    return res.status(400).send('Titolo e contenuto sono obbligatori');
  }

  // Recupero tutti gli id attuali per assegnare il nuovo ID
  let idList = posts.map(post => post.id || 0);
  idList.sort((a, b) => b - a);
  const newId = idList.length > 0 ? idList[0] + 1 : 1;

  // Generazione slug dal titolo
  const slug = slugify(title, { lower: true, strict: true });

  // Verifica se tags è array, altrimenti default a []
  const parsedTags = Array.isArray(tags) ? tags : [];

  // Creazione nuovo post
  const newPost = {
    id: newId,
    title,
    content,
    slug,
    image: 'placeholder.jpg',
    tags: parsedTags,
    updatedAt: new Date().toISOString()
  };

  // Salvataggio
  posts.push(newPost);
  savePosts();

  const accept = req.headers.accept || '';
  if (accept.includes('text/html')) {
    res.redirect('/posts');
  } else {
    res.json(newPost);
  }
}


// Controller per la creazione di un nuovo post
function create(req, res) {
  const accept = req.headers.accept || '';

  if (accept.includes('text/html')) {
    // Visualizza una semplice pagina HTML per la creazione
    res.send('<h1>Creazione nuovo post</h1>');
  } else {
    // Caso in cui il client non supporta il formato atteso
    res.status(406).send({ error: 'Not Acceptable: solo content-type HTML supportato' });
  }
}

function download(req, res) {
  const slug = req.params.slug;
  const post = posts.find(post => post.slug === slug);

  if (!post) {
    // Se il post non esiste, errore 404
    return res.status(404).json({ error: "Post non trovato" });
  }

  // Percorso assoluto del file immagine
  const imagePath = path.join(__dirname, '..', 'public', 'images', 'posts_cover', post.image);

  // Invio file da scaricare
  res.download(imagePath, post.image, (err) => {
    if (err) {
      res.status(500).json({ error: "Errore nel download dell'immagine" });
    }
  });
}

// Funzione di utilità per salvare la lista post aggiornata su file JSON
function savePosts() {
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), 'utf-8');
}

// Esportazione dei controller per il router
// CommonJS
module.exports = { 
  index,
  show,
  create,
  download,
  store 
};

// ES6 Modules
// export default { index };
