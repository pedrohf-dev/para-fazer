const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Task = require('./models/model');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, '../src')));

mongoose.connect(`mongodb+srv://pedrocontahf:${process.env.DB_PASSWORD}@cluster0.hvbxbj7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

app.post('/save-task', async (req, res) => {
    const { text } = req.body;
    const saveTask = new Task({ text });
    await saveTask.save();
    res.json(saveTask);
})

app.get('/get-tasks', async (req, res) => {
    const tasks = await Task.find({});
    res.json(tasks);
});

app.delete('/delete-task/:id', async (req, res) => {
    const id = req.params.id
    await Task.findByIdAndDelete(id)
    res.json({sucess: true })
})