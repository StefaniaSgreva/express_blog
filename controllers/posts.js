// CommonJS
const posts = require('../db/posts.json');

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

// Per gestire il download del file immagine
const path = require('path');

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

// Esportazione dei controller
// CommonJS
module.exports = { 
  index,
  show,
  create,
  download 
};

// ES6 Modules
// export default { index };
