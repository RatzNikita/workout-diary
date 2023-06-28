import TrainingProgram from '../models/trainingProgram'
import {TrainingProgramType} from "../types/workoutTypes";
import {Request, Response} from "express";

export function createProgram(req: Request, res : Response) {
    console.log(req.body)
    const program: TrainingProgramType = req.body;
    TrainingProgram.create(program)
        .then((program :TrainingProgramType) => res.send(program))
        .catch((err :Error) => res.status(500).send({message: err.message}))
}