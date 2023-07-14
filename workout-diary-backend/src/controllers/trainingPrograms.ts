import TrainingProgram from '../models/trainingProgram'
import {TrainingProgramType} from "../types/workoutTypes";
import {Request, Response} from "express";

export function createProgram(req: Request, res: Response) {
    const program: TrainingProgramType = req.body;
    TrainingProgram.create(program)
        .then((program) => {
            TrainingProgram.findOne({_id: program._id}).populate(
                {
                    path: 'workouts',
                    populate: {
                        path: 'exercises',
                        populate: {
                            path: 'exercise'
                        }
                    }
                }
            )
                .then((program) => res.send(program))
        })
        .catch((err: Error) => res.status(500).send({message: err.message}))
}

export function getAllPrograms(req: Request, res: Response) {
    TrainingProgram.find({}).populate(
        {
            path: 'workouts',
            populate: {
                path: 'exercises',
                populate: {
                    path: 'exercise'
                }
            }
        }
    )
        .then((programs) => res.send(programs))
        .catch((err: Error) => res.status(500).send({message: err.message}))

}

export function setWeight(req: Request, res: Response) {
    const {programID, workoutDay, exerciseID, weight} = req.body
    TrainingProgram.findOneAndUpdate({_id: programID},
        {$set: {"workouts.$[i].exercises.$[j].weight": weight}},
        {
            arrayFilters: [{
                "i.day": workoutDay
            }, {
                "j.exercise": exerciseID,
            }],
            new: true,
        })
        .populate({
            path: 'workouts',
            populate: {
                path: 'exercises',
                populate: {
                    path: 'exercise'
                }
            }
        })
        .then((program) => {
            console.log(program?.workouts)
            res.send(program?.workouts.find(w => w.day === workoutDay))
        })
        .catch((err: Error) => res.status(500).send({message: err.message}))
}