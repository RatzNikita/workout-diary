import {NextFunction, Request, Response} from "express";
import User from "../models/user";
import {AuthRequest} from "../types/userTypes";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const {NODE_ENV, JWT_SECRET} = process.env;

export async function register(req: Request, res: Response, next: NextFunction) {
    const {username, password} = req.body;
    bcrypt.hash(password, 10)
        .then((hash: string) => {
            User.create({
                username, password: hash,
            })
                .then((user) => res.status(201).send({
                    username: user.username,
                    _id: user._id,
                }))
                .catch(next);
        });
}

export async function login(req: Request, res: Response, next: NextFunction) {
    const {username, password} = req.body;
    return User.findUserByCredentials(username, password)
        .then((user) => {
            const token = jwt.sign({_id: user._id}, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {expiresIn: '7d'});
            res.send({token});
        })
        .catch(next);
}


export async function getUserInfo(request: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    const req = request as AuthRequest
    User.findById(req.user._id)
        .then((user) => {
            if (user) {
                res.send(user);
            } else {
                throw new Error('Not found')
            }
        })
        .catch(next);
}
