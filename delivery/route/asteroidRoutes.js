import express from 'express'
const router = express.Router();

import getAsteroid from '../asteroidController.js';

router.get('/asteroids', getAsteroid);

export default  router;