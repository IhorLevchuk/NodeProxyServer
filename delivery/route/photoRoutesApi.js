import express from 'express'
const router = express.Router();

import { photoRequestSchema } from "../../validator/photoShema.js"
import { validateBody } from "../../validator/validator.js";

import getPhoto from "../photoControllerApi.js";

router.post('/api/photo', validateBody(photoRequestSchema), getPhoto);

export default router;