import {Router} from 'express';
import * as videoCtrl from './videos.controller';

import {TokenValidation} from '../libs/verifyToken'

import { signup, signin, profile} from './videos.controller'

const router = Router();


router.post('/signin', signin)

router.get('/videos', videoCtrl.getVideos);

// routs that need auth to access

router.post('/signup', signup )

router.get('/profile', TokenValidation, videoCtrl.profile)

// router.get('/videos', videoCtrl.getVideos);

router.get('/videos/:id', TokenValidation, videoCtrl.getVideo);

router.post('/videos', TokenValidation, videoCtrl.createVideo);


router.delete('/videos/:id', TokenValidation,  videoCtrl.deleteVideo);

router.put('/videos/:id', TokenValidation, videoCtrl.updateVideo);

export default router