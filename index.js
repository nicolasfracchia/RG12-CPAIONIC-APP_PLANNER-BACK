require('dotenv').config();
const database = require('./config/database');
const express = require('express');
const app = express();
const port = 3000;
const Sequelize = require('sequelize');
const { Goals, Status, Tasks, Notes, Priorities } = require('./models');

database.authenticate()
    .then(function () { console.log('DB CONNECTED SUCCESSFULLY'); })
    .catch(function (error) { console.log('DATABASE CONNECTION ERROR:', error); })

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(port, () => { console.log(`Server running on port: ${port}`); });

// ROUTES - GOALS
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
        console.log('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/goals', async (req, res) => {
    try {
        const { name, description, date_of_start, date_of_end, status } = req.body;

        if (!name || !description || !date_of_start || !date_of_end || status === undefined) {
            return res.status(400).send('There are missing fields');
        }

        const status_validation = await Status.findOne({ where: { id: status } });
        if (!status_validation) { return res.status(400).send('Invalid status ID'); }

        const goal = await Goals.create({ name, description, date_of_start, date_of_end, status });

        res.status(201).send(goal);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// ROUTES - TASKS
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
        console.log('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/tasks', async (req, res) => {
    try {
        const { name, description, date_of_start, date_of_end, status } = req.body;

        if (!name || !description || !date_of_start || !date_of_end || status === undefined) {
            return res.status(400).send('There are missing fields');
        }

        const status_validation = await Status.findOne({ where: { id: status } });
        if (!status_validation) { return res.status(400).send('Invalid status ID'); }

        const task = await Tasks.create({ name, description, date_of_start, date_of_end, status });

        res.status(201).send(task);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


// ROUTES - NOTES
app.get('/notes', async (req, res) => {
    try {
        const notes = await Notes.findAll({
            include: [{ model: Priorities, attributes: ['name'] }]
        });

        res.status(200).send(notes);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/notes', async (req, res) => {
    try {
        const { name, header, details, importance } = req.body;

        if (!name || !header || !details || importance === undefined) {
            return res.status(400).send('There are missing fields');
        }

        const importance_validation = await Priorities.findOne({ where: { id: importance } });
        if (!importance_validation) { return res.status(400).send('Invalid importance ID'); }

        const note = await Notes.create({ name, header, details, importance });

        res.status(201).send(note);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// ROUTES - ACHIEVEMENTS
app.get('/achievements', async (req, res) => {
    let _tasks = Tasks.findAll({
        where: { status: 3 },
        include: [{ model: Status, attributes: ['name'] }]
    });

    let _goals = Goals.findAll({
        where: { status: 3 },
        include: [{ model: Status, attributes: ['name'] }]
    });

    let [tasks, goals] = await Promise.all([_tasks, _goals]);

    res.status(200).send({ tasks: tasks, goals: goals });
});