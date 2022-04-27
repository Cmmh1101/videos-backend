import {RequestHandler} from 'express';

export const createVideo: RequestHandler = (req, res) => {
    console.log(req.body)
    res.json('video saved')
} 
export const getVideos: RequestHandler = (req, res) => {
    res.json('getting videos')
} 
export const getVideo: RequestHandler = (req, res) => {
    res.json('getting video')
} 
export const deleteVideo: RequestHandler = (req, res) => {
    res.json('deletting a video')
} 
export const updateVideo: RequestHandler = (req, res) => {
    res.json('updating a video')
} 