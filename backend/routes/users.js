import express from 'express';
import {register} from '../controllers/users.js';
import {login} from '../controllers/users.js';

const router = express.Router()

router.post('/register', register)
router.post('/login', login);

export default router;
