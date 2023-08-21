import {NextFunction, Request, Response} from "express";
import User from "../models/user";
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { NODE_ENV, JWT_SECRET } = process.env;

export async function register(req: Request, res: Response, next: NextFunction) {
    const {
        name, about, avatar, email, password,
    } = req.body;
    bcrypt.hash(password, 10)
        .then((hash : string) => {
            User.create({
                name, about, avatar, email, password: hash,
            })
                .then((user) => res.status(201).send({
                    username: user.username,
                    _id: user._id,
                }))
                .catch(next);
        });
}

export async function login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    return User.findUserByCredentials(email, password)
        .then((user) => {
            const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
            res.send({ token });
        })
        .catch(next);
}