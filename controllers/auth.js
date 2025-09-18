// CommonJS
// Importa funzione utilities che crea il token JWT firmato
const generateJWT = require("../utilities/generateJWT");

function login(req, res) {
    // Legge username e password dal corpo della richiesta
    const { username, password } = req.body;

    // Verifica che username e password siano forniti
    if (!username || !password) {
        return res.status(400).json({ message: "Username e password sono obbligatori" });
    }

    // Carica gli utenti da un file JSON simulando un database
    const users = require("../db/users.json");

    // Cerca un utente che corrisponda a username e password
    // In un app reale la password sarà hashata e verificata con bcrypt o simili (qui solo rapido test)
    const user = users.find((user) => user.username === username && user.password === password);

    // Se non esiste un utente valido, invia errore 401
    if (!user) {
        return res.status(401).json({ message: "Username e/o password errati" });
    }

    // Una volta trovato un utente con quell' username e password,
    // Possiamo generare un token JWT e inviarlo al client
    const token = generateJWT(user);

    // Rispondi con un JSON che contiene il token JWT
    res.json({ token });
}

module.exports = {
    login,
};


// ES6
// import generateJWT from "../utilities/generateJWT.js";

// export function login(req, res) {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ message: "Username e password sono obbligatori" });
//   }

//   const users = await import('../db/users.json', { assert: { type: "json" } });
//   const usersList = users.default;

//   const user = usersList.find(user => user.username === username && user.password === password);

//   if (!user) {
//     return res.status(401).json({ message: "Username e/o password errati" });
//   }

//   const token = generateJWT(user);

//   res.json({ token });
// }
