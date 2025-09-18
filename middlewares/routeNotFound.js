// CommonJS
module.exports = function(req, res) {
  // Usa res.format per rispondere diversamente a seconda del tipo di richiesta
  res.format({
    // Se il client accetta html, restituisci una semplice pagina HTML
    html: () => res.status(404).send("<h1>404 Not Found</h1>"),

    // Se accetta json, restituisci un json con messaggio
    json: () => res.status(404).json({ message: "404 Not Found" }),

    // Default (per altri tipi di Accept) restituisci un testo semplice
    default: () => res.status(404).send("404 Not Found")
  });

  // Nota: non chiami next() perché è l'ultimo handler per questa richiesta
};

// ES&
// export default (req, res) => {
//   res.format({
//     html: () => res.status(404).send("<h1>404 Not Found</h1>"),
//     json: () => res.status(404).json({ message: "404 Not Found" }),
//     default: () => res.status(404).send("404 Not Found")
//   });
// };
