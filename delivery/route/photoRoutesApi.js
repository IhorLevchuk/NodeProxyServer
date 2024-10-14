import express from 'express'

import { photoRequestSchema } from '../../validator/photoShema.js'
import { validateBody } from '../../validator/validator.js'

import getPhoto from '../photoControllerApi.js'
const router = express.Router()

router.post('/api/photo', validateBody(photoRequestSchema), getPhoto)

export default router
