
const getAsteroid = require('../usecases/fetchAsteroid')

const getAsteroids = (req, res) => {
    getAsteroid(req.query)
        .then(body => res.render('index.html', {body: body}));
}

module.exports = getAsteroids;