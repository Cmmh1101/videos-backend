import {Router} from 'express';
import {getVideos} from './videos.controller';

const router = Router();

router.get('/videos', getVideos );

export default router