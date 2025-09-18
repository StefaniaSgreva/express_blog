// CommonJS
const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    // Leggi il token JWT dall'header Authorization, solitamente nel formato "Bearer <token>"
    const bearerToken = req.header("Authorization");

    console.log("Authorization header:", bearerToken);

    // Controlla che il token sia presente, altrimenti rispondi con 401 Unauthorized
    if (!bearerToken) {
        return res.status(401).json({ message: "Token mancante" });
    }

    // Estrai la parte del token eliminando la parola "Bearer " e lo spazio
    const token = bearerToken.slice(bearerToken.indexOf(" ") + 1);

    console.log("Token estratto:", token);

    try {
       // Verifica la validità del token usando la chiave segreta definita in .env
        const jwtPayload = jwt.verify(token, process.env.JWT_SECRET);

        // Aggiungi i dati decodificati dal token alla proprietà "user" della richiesta
        req.user = jwtPayload;

        // Continua al prossimo middleware o handler della rotta
        next();
    } catch (err) {
        // Se il token non è valido o scaduto, setta errore con status 403 Forbidden
        err.status = 403;
        err.message = "Token non valido o scaduto";

        // Passa l'errore al middleware di gestione errori globale (errorsFormatter.js)
        next(err);
    }
};

// ES6
// import jwt from "jsonwebtoken";

// const authMiddleware = (req, res, next) => {
//     const bearerToken = req.header("Authorization");

//     console.log("Authorization header:", bearerToken);

//     if (!bearerToken) {
//         return res.status(401).json({ message: "Token mancante" });
//     }

//     const token = bearerToken.slice(bearerToken.indexOf(" ") + 1);

//     console.log("Token estratto:", token);

//     try {
//         const jwtPayload = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = jwtPayload;
//         next();
//     } catch (err) {
//         err.status = 403;
//         err.message = "Token non valido o scaduto";
//         next(err);
//     }
// };

// export default authMiddleware;

