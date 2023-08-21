import {NextFunction, Request, Response} from "express";
import Food from "../models/food";
import createHttpError from "http-errors";


export async function addFood(req: Request, res: Response, next: NextFunction) {
    await Food
        .create(req.body)
        .then(food => {
            if(food) {
                res.status(201).send(food)
            } else {
                next(createHttpError(402,'Food with that name exist'))
            }
        })
        .catch(next)
}

export async function removeFood(req: Request, res: Response) {
    await Food.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(200)
        }).
        catch(() => createHttpError(404, 'Food not found'))
}