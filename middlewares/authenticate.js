// CommonJS
const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
    // Leggi il token JWT dall'header Authorization, solitamente nel formato "Bearer <token>"
    const bearerToken = req.header("Authorization");

    console.log("Authorization header:", bearerToken);

    // Controlla che il token sia presente, altrimenti rispondi con 401 Unauthorized
    if (!bearerToken) {
        // return res.status(401).json({ message: "Token mancante" });
        const err = new Error("Token mancante");
        err.status = 401; // Unauthorized
        return next(err);
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
        if (err.name === "TokenExpiredError") {
            err.status = 401; // Unauthorized per token scaduto
            err.message = "Token scaduto";
        } else if (err.name === "JsonWebTokenError") {
            err.status = 403; // Forbidden per token invalido
            err.message = "Token non valido";
        } else {
            err.status = 403;
            err.message = "Errore di autenticazione";
        }
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

