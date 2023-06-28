import {Request, Response} from "express";
import Exercise from "../models/exercise"
import {ExerciseType} from "../types/workoutTypes";



export function createExercise(req: Request, res : Response) {
    const {name, muscle, group} = req.body;
    Exercise.create({name, muscle, group})
        .then((exercise : ExerciseType) => {
            res.send(exercise)
        })
        .catch((err : Error) => res.status(500).send({message: err.message}))
}

export function getExercises(req: Request, res : Response) {
    Exercise.find({})
        .then((exercises : ExerciseType) => {
            res.send(exercises)
        })
        .catch((err : Error) => res.status(500).send({message: err.message}))
}