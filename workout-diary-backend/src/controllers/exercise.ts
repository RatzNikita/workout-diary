import {Request, Response} from "express";
import Exercise from "../models/exercise"
import {ExerciseType} from "../types/workoutTypes";

export function createExercise(req: Request, res : Response) {
    const {name, muscle, group} = req.body;
    Exercise.create({name, muscle, group})
        .then((exercise) => {
            res.send(exercise)
        })
        .catch((err : Error) => res.status(500).send({message: err.message}))
}

export function getExercises(req: Request, res : Response) {
    Exercise.find({})
        .then((exercises) => {
            res.send(exercises)
        })
        .catch((err : Error) => res.status(500).send({message: err.message}))
}

export function getExerciseById (req: Request, res : Response) {
    const {id} = req.params
    Exercise.findById({_id: id})
        .then( (exercise) => {
            res.send(exercise)
        })
        .catch((err : Error) => res.status(500).send({message: err.message}))
}