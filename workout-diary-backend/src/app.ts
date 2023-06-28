import exerciseRouter from './routes/exercise'
import trainingProgramRouter from './routes/trainingProgram'
import {Request, Response} from "express";
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect('mongodb://localhost:27017/workout-diary');

app.use('/exercises',exerciseRouter)
app.use('/trainingProgram',trainingProgramRouter)

app.use('/', (req :Request, res : Response) => {
    res.status(404).send({ message: 'Страница с указанным адресом не найдена' });
});

app.listen(3001,() => {
    console.log('Server listening on port 3001')
})
