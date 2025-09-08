// CommonJS
const dotenv = require('dotenv');
const express = require('express');
const app = express();

// Alternativa ES6 Modules (aggiungere "type": "module" in package.json):
// import dotenv from "dotenv";
// import express from 'express';
// const app = express();

dotenv.config();

// le rotte
app.get('/', (req, res) => {
  res.send('<h1>Benvenuto nel mio Blog!</h1>');
});

// il server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

