import express from 'express';
import auth from './auth.js';
import movie from './movie.js'
import tv from './tv.js'
import search from './search.js'
import { isLogin } from '../middlewares/permissions.js';


const router = express.Router();

router.use('/auth', auth)

router.use('/movie', isLogin, movie)

router.use('/tv', isLogin, tv)

router.use('/search', isLogin, search)

export default router;