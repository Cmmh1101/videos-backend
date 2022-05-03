import {Request, Response, NextFunction, RequestHandler} from 'express'
import jwt from 'jsonwebtoken'

interface IPayload {
    _id: string;
    iat: number;
    exp: number;
}

export const TokenValidation= async (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) {return res.status(401).json('Access denided')}


    try {
        const payload = await jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest')
        req.userId = payload
        console.log(payload)
    } catch(err) {
        return res.status(400).json("Token invalid")
    }
    

//     const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest') as IPayload
// console.log(payload)

    next();    
}