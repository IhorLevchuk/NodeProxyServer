import express from 'express'
import * as core from 'express-serve-static-core'

import { asteroidQuerySchema } from '../../validator/asteroidShema'
import { validateQuery } from '../../validator/validator'

import getAsteroid from '../asteroidControllerApi'
const router: core.Router = express.Router()

router.get('/api/asteroids', validateQuery(asteroidQuerySchema), getAsteroid)

export default router
