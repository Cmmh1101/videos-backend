import {RequestHandler} from 'express';
import Video from './Video';

export const signup = () => {
    
}
export const signin = () => {

}
export const profile = () => {

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