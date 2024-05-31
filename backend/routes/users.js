import express from 'express';
import {register, login, requestRide, userData} from '../controllers/users.js';

const router = express.Router()

router.post('/register', register)
router.post('/login', login);
router.post('/userData', userData);
router.post('/requestRide', requestRide);

export default router;
