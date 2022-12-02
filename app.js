// Importation des middlewares
const express = require('express');
const mongoose = require('mongoose');;
const bodyParser = require('body-parser')

// Ajout d'Helmet contre les attaques XXS
const helmet = require("helmet");
// Ajout de mongoSanitize pour éviter les injections SQL
const mongoSanitize = require('express-mongo-sanitize')

const app = express();


const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const path = require('path');

// Connexion à la base de donné MongoDb
mongoose.connect('mongodb+srv://KevinSingaye:Mongodb936!@cluster0.t3dpx.mongodb.net/bddsauce?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Ajout headers pour les requetes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Routes
app.use(helmet({ crossOriginResourcePolicy: false, }));
app.use(mongoSanitize());
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));



module.exports = app;
