const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const config = require('./config.js');
const mongoose = require('mongoose');
require('./product.routes')(app);
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// default route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome Home"});
});

const PORT = 3001; 
app.listen(config.serverport, () => {
    console.log(`Listeing on port ${PORT}`);
});
