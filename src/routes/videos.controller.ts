import {RequestHandler} from 'express';
import Video from '../models/Video';
import User, {IUser} from '../models/User';


import jwt from 'jsonwebtoken';

export const signup: RequestHandler = async (req, res) => {
    // saving a new user
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    user.password = await user.encryptPassword(user.password)

    const savedUser = await user.save();

    // creating a token
    const token:string = jwt.sign({_id: savedUser._id}, process.env.TOKEN_SECRET || "tokentest" )
    res.header('auth-token', token).json(savedUser)
}

export const signin: RequestHandler = async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).json('Email or password does not match out records. Try again');

    const correctPassword: boolean = await user.validatePassword(req.body.password)
    if(!correctPassword) return res.status(400).json('Invalid Password')

    const token = jwt.sign(
        {_id: user._id}, process.env.TOKEN_SECRET || 'tokentest', {
        expiresIn: 60 * 60 * 24
    }) 

    res.header('auth-token', token).json(user)

    res.send('login')
}


export const profile: RequestHandler = async (req, res) => {
//    const user = await User.findById(req.userId);
//     if(!user) return res.status(404).json('No User Found');
if(req.header('auth-token')) {
console.log('data')
res.send('profile')
} else {
res.json('no data found')
}

    
}

export const createVideo: RequestHandler = async (req, res) => {
const videoFound = await Video.findOne({url: req.body.url})
if(videoFound) 
    return res.status(301).json({message: 'The URL already exists, please enter a new URL'})
    const video = new Video(req.body)
    const savedVideo = await video.save()
    console.log(video)
    res.json(savedVideo)
} 
export const getVideos: RequestHandler = async (req, res) => {
    try {
const videos = await Video.find()
    return res.json(videos)
    } catch (error) {
        res.json(error)
    }
} 
export const getVideo: RequestHandler = async (req, res) => {
    const videoFound = await Video.findById(req.params.id);
    if (!videoFound) return res.status(204).json({message: 'Video not found'});
    return res.json(videoFound)
} 
export const deleteVideo: RequestHandler = async (req, res) => {
    const videoFound = await Video.findByIdAndDelete(req.params.id);
    if (!videoFound) return res.status(204).json({message: 'Video not found'});
    return res.json(videoFound)
} 
export const updateVideo: RequestHandler = async (req, res) => {
    const updatedVideo = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedVideo) return res.status(204).json({message: 'Video not found'});
    res.json(updatedVideo)
} 