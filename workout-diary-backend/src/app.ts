import exerciseRouter from './routes/exercise'
import {Request, Response} from "express";
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect('mongodb://localhost:27017/workout-diary');

app.use('/exercises',exerciseRouter)

app.use('/', (req :Request, res : Response) => {
    res.status(404).send({ message: 'Страница с указанным адресом не найдена' });
});

app.listen(3001,() => {
    console.log('Server listening on port 3001')
})
