import {NextFunction, Response} from "express";
import Meal from "../models/meal";
import createHttpError from "http-errors";
import {AuthRequest} from "../types/userTypes";


export async function createMeal(request: Request, res: Response, next: NextFunction) {
    const req = request as AuthRequest
    await Meal.create({...req.body,owner: req.user._id})
        .then((user) => {
            res.status(201).send(user)
        })
        .catch(() => next(createHttpError(400, 'Meal cant be created')))
}

