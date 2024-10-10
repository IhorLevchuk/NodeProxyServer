import express from 'express'
const router = express.Router();

import getPhoto from "../photoControllerApi.js";

router.post('/api/photo', getPhoto);

export default router;