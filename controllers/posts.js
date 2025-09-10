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
  // Cerca il post corrispondente allo slug
  const post = posts.find(p => p.slug === slug);

  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: "Post non trovato" });
  }
}

// CommonJS
module.exports = { 
  index,
  show 
};

// ES6
// export default { index };
