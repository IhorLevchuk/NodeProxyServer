import express from 'express'
import * as core from 'express-serve-static-core'

import { photoRequestSchema } from '../../validator/photoShema'
import { validateBody } from '../../validator/validator'

import { getPhotoForm, getPhoto } from '../photoController'
const router: core.Router = express.Router()

router.get('/photo', getPhotoForm)

router.post('/photo', validateBody(photoRequestSchema), getPhoto)

export default router
