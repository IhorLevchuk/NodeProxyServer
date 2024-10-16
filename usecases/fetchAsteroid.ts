import fetchAsteroids from '../repository/asteroidRepository'
import config from '../config/config'
import AsteroidsResponseDto from '../dto/asteroidsResponseDto'
import AsteroidResponseDto from '../dto/asteroidResponseDto'
import NasaNearEarthObjectsResponseDto from '../dto/nasa/nasaNearEarthObjectsResponseDto'

async function fetchAsteroid (date: string | undefined, wereDangerousMeteors: boolean, count: boolean): Promise<AsteroidsResponseDto> {
  const { startDate, endDate } = getStartAndEndDates(date)

  const response: NasaNearEarthObjectsResponseDto = await fetchAsteroids(startDate, endDate)

  const asteroids: Array<AsteroidResponseDto> = Object.values(response).flatMap(d => d)
    .map(asteroid => {
      return {
        id: asteroid.id,
        name: asteroid.name,
        diameter: asteroid.estimated_diameter.meters,
        is_potentially_hazardous_asteroid: asteroid.is_potentially_hazardous_asteroid,
        close_approach_date_full: asteroid.close_approach_data[0].close_approach_date_full,
        relative_velocity: asteroid.close_approach_data[0].relative_velocity.kilometers_per_second
      }
    })

  const result: AsteroidsResponseDto = { asteroids }

  if (count) {
    result.count = asteroids.length
  }

  if (wereDangerousMeteors) {
    result.wereDangerousMeteors = wereDangerousMeteors
  }

  return result
}

const getStartAndEndDates = (date: string | undefined) => {
  if (date) {
    return { startDate: date, endDate: date }
  }

  return { startDate: config.startDate, endDate: config.endDate }
}

export default fetchAsteroid
