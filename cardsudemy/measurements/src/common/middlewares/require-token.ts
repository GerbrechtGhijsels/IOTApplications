import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import jwt from 'jsonwebtoken';
import {ParamsDictionary} from "express-serve-static-core";


export const requireToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    var token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    var ctoken  = String(token);
    if(token == undefined)
    {
        throw new NotAuthorizedError();
    }

    if (token) {
        jwt.verify(ctoken, process.env.JWT_KEY!, (err, decoded) => {
            if (err) {
                throw new NotAuthorizedError();
            } else {
                (<any>req).decoded = decoded;
            }
        });
    } else {
        throw new NotAuthorizedError();
    }
    next();
};


