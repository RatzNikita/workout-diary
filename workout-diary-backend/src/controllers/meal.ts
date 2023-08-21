import {NextFunction, Response} from "express";
import Meal from "../models/meal";
import {AuthRequest} from "../types/userTypes";
import createHttpError from "http-errors";


export async function addMeal(req: AuthRequest, res: Response, next: NextFunction) {
    await Meal.create({...req.body,owner: req.user._id})
        .then((user) => {
            res.status(201).send(user)
        })
        .catch(() => createHttpError(400, 'Meal cant be created'))
}

