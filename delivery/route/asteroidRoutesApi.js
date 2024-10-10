const express = require('express');
const router = express.Router();

const getAsteroid = require("../asteroidControllerApi");

router.get('/api/asteroids', getAsteroid);

module.exports = router;