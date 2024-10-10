const Exception = require("../exception/Exception.js");
const getAsteroid = require('../usecases/fetchAsteroid')

const getAsteroids = (req, res, next) => {
    try {
        getAsteroid(req.query)
            .then(asteroidResponseDto => res.send(asteroidResponseDto));
    } catch (error) {
        next(new Exception(500, error.message));
    }
}

module.exports = getAsteroids;