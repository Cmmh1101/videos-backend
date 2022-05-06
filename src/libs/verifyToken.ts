import {Request, Response, NextFunction, RequestHandler} from 'express'
import jwt from 'jsonwebtoken'

export const TokenValidation = async (req: Request, res: Response, next: NextFunction) => {
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


// fazt
// export const TokenValidation: RequestHandler = async (req, res, next) => {
//     const token = req.header('auth-token');
//     if(!token) {return res.status(401).json('Access denided')}

//     try {
//         const payload = await jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest')
//         // req.userId = payload
//         console.log(payload)
//     } catch(err) {
//         return res.status(400).json("Token invalid")
//     }
    

// //     const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest') as IPayload
// // console.log(payload)

//     next();    
// }

// no fazt 