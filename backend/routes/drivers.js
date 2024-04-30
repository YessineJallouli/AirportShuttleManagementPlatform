import express from "express";
import {register} from "../controllers/drivers.js";
import {login} from "../controllers/drivers.js";

const router = express.Router()

router.post('/register', register)
router.post('/login', login);
export default router;