// eslint-disable-next-line import/no-extraneous-dependencies
import {NextFunction, Request, Response} from "express";
import {AuthRequest} from "../types/userTypes";

const jwt = require('jsonwebtoken');
const createHttpError = require("http-errors");

const {NODE_ENV, JWT_SECRET} = process.env;

const auth = (request: Request, res: Response, next: NextFunction) => {

    // @ts-ignore
    const req = request as AuthRequest
    // @ts-ignore
    const {authorization} = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        createHttpError(402, 'Invalid token');
    }
    const token = authorization?.replace('Bearer ', '');
    let payload;
    try {
        payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    } catch (err) {
        res.status(402).send({message: 'Invalid token'})
    }
    req.user = payload;
    next();
};

export default auth;