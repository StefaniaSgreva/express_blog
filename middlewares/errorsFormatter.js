// Common JS
// Middleware di gestione errori, formattazione della risposta in base al tipo di richiesta
module.exports = function(err, req, res, next) {
  // Imposta codice risposta, usa 500 se non specificato nell'errore
  const statusCode = err.status || 500;

  // Usando res.format() rispondiamo in JSON o HTML a seconda dell'header Accept della richiesta
  res.format({
    // Risposta JSON per richieste API
    json: () => {
      res.status(statusCode).json({
        code: statusCode,
        message: err.message || "Oops, something went wrong"
      });
    },
    // Risposta HTML (es. browser) come fallback
    default: () => {
            res.status(statusCode).send("<h1>" + (err.message || "Oops, something went wrong") + "</h1>");
    }
  });
};

// ES6
// const errorsFormatter = (err, req, res, next) => {
//   const statusCode = err.status || 500;

//   res.format({
//     json: () => {
//       res.status(statusCode).json({
//         message: "Oops, mi sa che qualcosa è andato storto",
//         error: err.message,
//       });
//     },
//     default: () => {
//       res.status(statusCode).send("<h1>Oops, mi sa che qualcosa è andato storto</h1>");
//     },
//   });
// };

// export default errorsFormatter;

