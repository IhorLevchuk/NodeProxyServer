import express from 'express'
const router = express.Router();

import { asteroidQuerySchema } from "../../validator/asteroidShema.js"
import { validateQuery } from "../../validator/validator.js";

import getAsteroid from '../asteroidControllerApi.js';

router.get('/api/asteroids', validateQuery(asteroidQuerySchema), getAsteroid);

export default router;