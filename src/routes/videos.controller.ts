import {RequestHandler} from 'express';

export const getVideos: RequestHandler = (req, res) => {
    res.json('getting videos')
} 