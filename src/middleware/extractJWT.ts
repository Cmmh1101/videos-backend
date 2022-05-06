//  no fazt

import {Request, Response, NextFunction, RequestHandler} from 'express'
import jwt from 'jsonwebtoken'

export const extractJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('auth-token');
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest', (error, decoded) => {
            if (error) {
                return res.status(404).json({
                    message: error.message,
                    error
                });
            } else {
                res.locals.jwt = decoded
                next();
            }
        })
    } else {
        return res.status(401).json({
                    message: "Unauthorized"
                });
    }
}