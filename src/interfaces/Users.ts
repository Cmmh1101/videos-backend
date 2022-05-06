//  no fazt

import { Document } from 'mongoose';

export default interface IUser extends Document {
    username: string
    email: string
    password: string
    encryptPassword(password: string): Promise<string>
    validatePassword (password: string): Promise<boolean>
}
