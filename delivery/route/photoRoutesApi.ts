import express from 'express'
import * as core from 'express-serve-static-core'

import { photoRequestSchema } from '../../validator/photoShema'
import { validateBody } from '../../validator/validator'

import getPhoto from '../photoControllerApi'
const router: core.Router = express.Router()

router.post('/api/photo', validateBody(photoRequestSchema), getPhoto)

export default router
