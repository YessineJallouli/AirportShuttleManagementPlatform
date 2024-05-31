import express from 'express';
import {register, login, requestRide, userData, confirmRide, cancelRide} from '../controllers/users.js';

const router = express.Router()

router.post('/register', register)
router.post('/login', login);
router.post('/userData', userData);
router.post('/requestRide', requestRide);
router.post('/confirmRide', confirmRide);
router.post('/cancelRide', cancelRide);

export default router;
