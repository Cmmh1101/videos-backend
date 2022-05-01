import {Router} from 'express';
import * as videoCtrl from './videos.controller';

import { signup, signin, profile} from './videos.controller'

const router = Router();

router.post('/signup', )
router.post('/signin', )
router.post('/profile', )

router.get('/videos', videoCtrl.getVideos);

router.get('/videos/:id', videoCtrl.getVideo);

router.post('/videos', videoCtrl.createVideo);


router.delete('/videos/:id', videoCtrl.deleteVideo);

router.put('/videos/:id', videoCtrl.updateVideo);

export default router