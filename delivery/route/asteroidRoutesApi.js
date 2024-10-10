import express from 'express'
const router = express.Router();

import getAsteroid from '../asteroidControllerApi.js';

router.get('/api/asteroids', getAsteroid);

export default router;