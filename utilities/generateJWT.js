// CommonJS
const jwt = require("jsonwebtoken");

module.exports = function(user) {
    // Dati inclusi nel token per non trasportare la password
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email
    }
    // Token JWT firmato con secret e scadenza 1h
    // sign richiede 3 argomanti: 
    // 1 - payload (dati da salvare all'interno del token)
    // 2 - secretKey (chiave inventata nel file.env)
    // 3 - opzioni (oggetto che permette di configurare il token - es. scade in 1h)
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
}

// ES6
// import jwt from "jsonwebtoken";

// const generateToken = (user) => {
//   const payload = {
//     id: user.id,
//     username: user.username,
//     email: user.email
//   };

//   return jwt.sign(payload, process.env.JWT_SECRET, {
//     expiresIn: '1h'
//   });
// };

// export default generateToken;
