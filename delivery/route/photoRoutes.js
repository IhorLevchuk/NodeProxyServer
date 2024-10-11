import express from 'express'
const router = express.Router();

import { photoRequestSchema } from "../../validator/photoShema.js"
import { validateBody } from "../../validator/validator.js";

import { getPhotoForm, getPhoto } from "../photoController.js";

router.get('/photo', getPhotoForm);

router.post('/photo', validateBody(photoRequestSchema), getPhoto);

export default router;