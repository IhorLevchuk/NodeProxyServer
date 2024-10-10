const express = require('express');
const router = express.Router();

const getAsteroid = require("../asteroidController");

router.get('/asteroids', getAsteroid);

module.exports = router;