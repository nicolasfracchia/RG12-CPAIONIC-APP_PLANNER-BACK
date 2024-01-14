require('dotenv').config();
const database = require('./config/database');
const express = require('express');
const app = express();
const port = 3000;
const Sequelize = require('sequelize'); 
const { Goals, Status, Tasks, Notes, Priorities } = require('./models');

database.authenticate()
.then(function(){console.log('DB CONNECTED SUCCESSFULLY');})
.catch(function(error){console.log('DATABASE CONNECTION ERROR:',error);})

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.listen(port, () => {console.log(`Server running on port: ${port}`);});

app.get('/', (req, res) => {res.send('WORKS!');});

app.get('/goals', async (req, res) => {
    try {
      const goals = await Goals.findAll({
        where: {
          status: { [Sequelize.Op.not]: 3 }
        },
        include: [{ model: Status, attributes: ['name'] }]
      });
  
      res.status(200).send(goals);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/tasks', async (req, res) => {
    try {
      const tasks = await Tasks.findAll({
        where: {
          status: { [Sequelize.Op.not]: 3 }
        },
        include: [{ model: Status, attributes: ['name'] }]
      });
  
      res.status(200).send(tasks);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/notes', async (req, res) => {
    try {
      const notes = await Notes.findAll({
        include: [{ model: Priorities, attributes: ['name'] }]
      });
  
      res.status(200).send(notes);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });