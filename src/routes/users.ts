// no fazt
import express from 'express';
import controllers from '../controllers/user'
import {extractJWT} from '../middleware/extractJWT'

const router = express.Router();

router.get('/api/auth/validate', extractJWT, controllers.validateToken);
router.get('/api/auth/register', extractJWT, controllers.register);
router.get('/api/auth/loging', controllers.login);
router.get('/api/auth/getAllUsers', extractJWT, controllers.getAllUsers);

export default router;