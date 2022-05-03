
import { Request } from "express"

// declare namespace Express {
//     export interface Request {
//         userId?: string;
//     }
// }

export interface Request extends Request {
  userId:  JwtPayload
}

// declare module 'express-serve-static-core' {
//   export interface Request {
//     userId: string | JwtPayload
//   }
// }