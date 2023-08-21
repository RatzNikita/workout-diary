import exerciseRouter from './routes/exercise'
import trainingProgramRouter from './routes/trainingProgram'
import foodRouter from './routes/food'
import mealRouter from './routes/meal'
import {Request, Response} from "express";
import bodyParser from "body-parser";
import express from 'express'
import mongoose from "mongoose";
import cors from 'cors'
import {login, register} from "./controllers/user";

const auth = require('./middlewares/auth');

const app = express()

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost:27017/workout-diary');
}

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/signup', register)
app.use('/signin', login)
app.use(auth);
app.use('/exercises', exerciseRouter)
app.use('/trainingProgram', trainingProgramRouter)
app.use('/food', foodRouter)
app.use('/meal', mealRouter)

app.use('/', (req: Request, res: Response) => {
    res.status(404).send({message: 'Страница с указанным адресом не найдена'});
});

app.listen(3001, () => {
    console.log('Server listening on port 3001')
})

export default app;
