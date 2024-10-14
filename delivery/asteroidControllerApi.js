import Exception from '../exception/Exception.js'
import getAsteroid from '../usecases/fetchAsteroid.js'

const getAsteroids = async (req, res, next) => {
  try {
    const { count, wereDangerousMeteors, date } = req.query

    const asteroidResponseDto = await getAsteroid(date, wereDangerousMeteors, count)

    res.send(asteroidResponseDto)
  } catch (error) {
    next(new Exception(error.code, error.message))
  }
}

export default getAsteroids
