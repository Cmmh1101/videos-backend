//  no fazt
import {Request, Response, NextFunction } from "express"
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import User from '../models/userModel'
import signJWT from "../functions/signJWT"


const NAMESPACE = "User"

const validateToken = (req: Request, res: Response, next: NextFunction) => {
   return res.status(200).json({
       message: 'Authorized'
   })
}

const register = (req: Request, res: Response, next: NextFunction) => {
    let { username, password, email } = req.body;

    bcrypt.hash(password, 10, (hashError, hash) => {
        if (hashError) {
            return res.status(500).json({
                message: hashError.message,
                error: hashError
            })
        }

        // save user to mongoDB
        const _user = new User({
            _id: new mongoose.Types.ObjectId(),
            username,
            password: hash,
            email,
        })

        return _user.save()
        .then( user => {
            return res.status(201).json({
                user
            });
        })
        .catch( error => {
            return res.status(500).json({
                message: error.message,
                error
            })
        })
    })
}

const login = (req: Request, res: Response, next: NextFunction) => {
  let { username, password, email } = req.body;
   User.find({ username })
   .exec()
   .then(users => {
       if ( users.length !== 1) {
           return res.status(401).json({
               message: 'Unauthorized'
           });
       }

       bcrypt.compare(password, users[0].password, (error, result) => {
        if ( error ) {
            return res.status(401).json({
               message: 'Unauthorized'
           });
        } else if ( result ) {
            signJWT(users[0], (_error, token) => {
                if ( _error ) {
                    return res.status(401).json({
                        message: 'Unauthorized',
                        error: _error
                    });
                }
                else if ( token ) {
                    return res.status(200).json({
                        message: 'Auth Successful',
                        token, 
                        user: users[0]
                    })
                }
            }) 
        }
       })
   })
   .catch( error => {
       res.status(500).json({
           message: error.message,
           error
       })
   })
}

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    User.find()
    .select('-password')
    .exec()
    .then(users => {
        return res.status(200).json({
            users,
            count: users.length
        })
    })
    .catch( error => {
       res.status(500).json({
           message: error.message,
           error
       })
   })
}

export default { validateToken, register, login, getAllUsers }
