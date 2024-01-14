require('dotenv').config();
const database = require('./config/database');
const express = require('express');
const app = express();
const port = 3000;

database.authenticate()
.then(function(){console.log('DB CONNECTED SUCCESSFULLY');})
.catch(function(error){console.log('DATABASE CONNECTION ERROR:',error);})

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.listen(port, () => {console.log(`Server running on port: ${port}`);});

app.get('/', (req, res) => {res.send('WORKS!');});