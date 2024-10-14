import express from 'express'

import { asteroidQuerySchema } from '../../validator/asteroidShema.js'
import { validateQuery } from '../../validator/validator.js'

import getAsteroid from '../asteroidController.js'
const router = express.Router()

router.get('/asteroids', validateQuery(asteroidQuerySchema), getAsteroid)

export default router
