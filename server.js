const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'src')));

mongoose.connect(`mongodb+srv://pedrocontahf:${process.env.DB_PASSWORD}@cluster0.hvbxbj7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});