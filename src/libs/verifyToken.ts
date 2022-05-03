import { Response, NextFunction, RequestHandler} from 'express'
import jwt from 'jsonwebtoken'
import { Request } from "../../types";


interface IPayload {
    _id: string;
    iat: number;
    exp: number;
}

export const TokenValidation = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('auth-token');
    if(!token) {return res.status(401).json('Access denided')}
    try {
        const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest')
        req.userId = payload
        console.log(req.userId)
    } catch(err) {
        return res.status(400).json("Token invalid")
    }
    next();    
}