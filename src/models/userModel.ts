//  no fazt

import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import IUser from '../interfaces/Users'

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        lowercase: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    versionKey: false,
    timestamps: true
})

userSchema.methods.encryptPassword = async (password: string): Promise<string> => {
   const salt = await bcrypt.genSalt(10);
   return bcrypt.hash(password, salt)
}

userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

export default model<IUser>('User', userSchema);