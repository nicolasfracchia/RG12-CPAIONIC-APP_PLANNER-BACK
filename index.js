require('dotenv').config();
const database = require('./config/database');
const express = require('express');
const app = express();
const port = 3000;
const Sequelize = require('sequelize');
const { Goals, Status, Tasks, Notes, Priorities } = require('./models');
const cors = require('cors');

app.use(cors());

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
            include: [{ model: Status, attributes: ['name', 'color'] }]
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
            return res.status(404).send('There are missing fields');
        }

        const status_validation = await Status.findOne({ where: { id: status } });
        if (!status_validation) { return res.status(404).send('Invalid status ID'); }

        const goal = await Goals.create({ name, description, date_of_start, date_of_end, status });

        res.status(200).send(goal);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.patch('/goals/:id', async (req, res) => {
    try {
        const goalId = req.params.id;
        const { status } = req.body;

        if (status === undefined) { return res.status(400).send('There are missing fields'); }

        const goal = await Goals.findByPk(goalId);
        if (!goal) { return res.status(404).send('Goal not found'); }

        const status_validation = await Status.findOne({ where: { id: status } });
        if (!status_validation) { return res.status(404).send('Invalid status ID'); }

        goal.status = status;
        await goal.save();

        res.status(200).send(goal);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.delete('/goals/:id', async (req, res) => {
    try {
        const goalId = req.params.id;

        const goal = await Goals.findByPk(goalId);
        if (!goal) { return res.status(404).send('Goal not found'); }

        await goal.destroy();

        res.status(200).send(goal);
    } catch (error) {
        console.error('Error:', error);
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
            include: [{ model: Status, attributes: ['name', 'color'] }]
        });

        res.status(200).send(tasks);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;

        const task = await Tasks.findByPk(taskId);
        if (!task) { return res.status(404).send('Task not found'); }

        res.status(200).send(task);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/tasks', async (req, res) => {
    try {
        const { name, description, date_of_start, date_of_end, status } = req.body;

        if (!name || !description || !date_of_start || !date_of_end || status === undefined) {
            return res.status(404).send('There are missing fields');
        }

        const status_validation = await Status.findOne({ where: { id: status } });
        if (!status_validation) { return res.status(404).send('Invalid status ID'); }

        const task = await Tasks.create({ name, description, date_of_start, date_of_end, status });

        res.status(200).send(task);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.patch('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const { status } = req.body;

        if (status === undefined) { return res.status(400).send('There are missing fields'); }

        const task = await Tasks.findByPk(taskId);
        if (!task) { return res.status(404).send('Task not found'); }

        const status_validation = await Status.findOne({ where: { id: status } });
        if (!status_validation) { return res.status(404).send('Invalid status ID'); }

        task.status = status;
        await task.save();

        res.status(200).send(task);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.put('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;
        const { status, name, description, date_of_end, date_of_start } = req.body.frmData;
        const task = await Tasks.findByPk(taskId);

        if (!task) { return res.status(404).send('Task not found'); }
        
        task.status = (status) ? status : task.status;
        task.name = (name) ? name : task.name;
        task.description = (description) ? description : task.description;
        task.date_of_end = (date_of_end) ? date_of_end : task.date_of_end;
        task.date_of_start = (date_of_start) ? date_of_start : task.date_of_start;

        await task.save();

        res.status(200).send(task);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.delete('/tasks/:id', async (req, res) => {
    try {
        const taskId = req.params.id;

        const task = await Tasks.findByPk(taskId);
        if (!task) { return res.status(404).send('Task not found'); }

        await task.destroy();

        res.status(200).send(task);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


// ROUTES - NOTES
app.get('/notes', async (req, res) => {
    try {
        const notes = await Notes.findAll({
            include: [{ model: Priorities, attributes: ['name', 'color'] }]
        });

        res.status(200).send(notes);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/goals/:id', async (req, res) => {
    try {
        const goalId = req.params.id;

        const goal = await Goals.findByPk(goalId);
        if (!goal) { return res.status(404).send('Goal not found'); }

        res.status(200).send(goal);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/notes', async (req, res) => {
    try {
        const { name, header, details, importance } = req.body;

        if (!name || !header || !details || importance === undefined) {
            return res.status(404).send('There are missing fields');
        }

        const importance_validation = await Priorities.findOne({ where: { id: importance } });
        if (!importance_validation) { return res.status(404).send('Invalid importance ID'); }

        const note = await Notes.create({ name, header, details, importance });

        res.status(200).send(note);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.patch('/goals/:id', async (req, res) => {
    try {
        const goalkId = req.params.id;
        const { status } = req.body;

        if (status === undefined) { return res.status(400).send('There are missing fields'); }

        const goal = await Goals.findByPk(goalId);
        if (!goal) { return res.status(404).send('Goal not found'); }

        const status_validation = await Status.findOne({ where: { id: status } });
        if (!status_validation) { return res.status(404).send('Invalid status ID'); }

        goal.status = status;
        await goal.save();

        res.status(200).send(goal);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.put('/goals/:id', async (req, res) => {
    try {
        const goalId = req.params.id;
        const { status, name, description, date_of_end, date_of_start } = req.body.frmData;
        const goal = await Goals.findByPk(goalId);

        if (!goal) { return res.status(404).send('Goal not found'); }
        
        goal.status = (status) ? status : goal.status;
        goal.name = (name) ? name : goal.name;
        goal.description = (description) ? description : goal.description;
        goal.date_of_end = (date_of_end) ? date_of_end : goal.date_of_end;
        goal.date_of_start = (date_of_start) ? date_of_start : goal.date_of_start;

        await goal.save();

        res.status(200).send(goal);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.delete('/notes/:id', async (req, res) => {
    try {
        const noteId = req.params.id;

        const note = await Notes.findByPk(noteId);
        if (!note) { return res.status(404).send('Note not found'); }

        await note.destroy();

        res.status(200).send(note);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

// ROUTES - ACHIEVEMENTS
app.get('/achievements', async (req, res) => {
    let _tasks = Tasks.findAll({
        where: { status: 3 },
        include: [{ model: Status, attributes: ['name', 'color'] }]
    });

    let _goals = Goals.findAll({
        where: { status: 3 },
        include: [{ model: Status, attributes: ['name', 'color'] }]
    });

    let [tasks, goals] = await Promise.all([_tasks, _goals]);

    res.status(200).send({ tasks: tasks, goals: goals });
});

// ROUTES - GENERAL
app.get('/statuses', async (req, res) => {
    try {
        const statuses = await Status.findAll();
        res.status(200).send(statuses);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/priorities', async (req, res) => {
    try {
        const priorities = await Priorities.findAll();
        res.status(200).send(priorities);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});