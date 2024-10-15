import express from 'express'

import { photoRequestSchema } from '../../validator/photoShema.js'
import { validateBody } from '../../validator/validator.js'

import { getPhotoForm, getPhoto } from '../photoController.js'
const router = express.Router()

router.get('/photo', getPhotoForm)

router.post('/photo', validateBody(photoRequestSchema), getPhoto)

export default router
