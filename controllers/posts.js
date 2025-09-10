// CommonJS
const posts = require('../db/posts.json');

// Alternativa ES6 Modules (se usi module):
// import posts from '../db/posts.json' assert { type: 'json' };

function index(req, res) {
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
          <img src="images/posts_cover/${post.image}" alt="${post.title}" style="max-width: 100%; height: auto;">
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
}

function show(req, res) {
  const slug = req.params.slug;
  const post = posts.find(post => post.slug === slug);

  if (post) {
    const baseUrl = `${req.protocol}://${req.get('host')}/posts/${slug}`;
    const postWithUrls = {
      ...post,
      image_url: `${req.protocol}://${req.get('host')}/images/posts_cover/${post.image}`,
      image_download_url: `${baseUrl}/download`
    };
    res.json(postWithUrls);
  } else {
    res.status(404).json({ error: "Post non trovato" });
  }
}

function create(req, res) {
  const accept = req.headers.accept || '';

  if (accept.includes('text/html')) {
    res.send('<h1>Creazione nuovo post</h1>');
  } else {
    res.status(406).send({ error: 'Not Acceptable: solo content-type HTML supportato' });
  }
}

const path = require('path');

function download(req, res) {
  const slug = req.params.slug;
  const post = posts.find(post => post.slug === slug);

  if (!post) {
    return res.status(404).json({ error: "Post non trovato" });
  }

  const imagePath = path.join(__dirname, '..', 'public', 'images', 'posts_cover', post.image);

  res.download(imagePath, post.image, (err) => {
    if (err) {
      res.status(500).json({ error: "Errore nel download dell'immagine" });
    }
  });
}


// CommonJS
module.exports = { 
  index,
  show,
  create,
  download 
};

// ES6
// export default { index };
