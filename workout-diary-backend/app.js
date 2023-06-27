const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect('mongodb://localhost:27017/workout-diary');

app.listen(3001,() => {
    console.log('Server listening on port 3001')
})
