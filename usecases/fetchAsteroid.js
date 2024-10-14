import fetchAsteroids from '../repository/asteroidRepository.js'
import { config } from 'dotenv'

async function fetchAsteroid (date, wereDangerousMeteors, count) {
  const { startDate, endDate } = getStartAndEndDates(date)

  const jsonBody = await fetchAsteroids(startDate, endDate)
  return transformBody(jsonBody, count, wereDangerousMeteors)
}

function transformBody (jsonBody, showCount, showDangerous) {
  const result = {}
  let wereDangerousMeteors = false

  const asteroids = Object.values(jsonBody.near_earth_objects).flatMap(d => d)
    .map(asteroid => {
      if (!wereDangerousMeteors && asteroid.is_potentially_hazardous_asteroid) {
        wereDangerousMeteors = true
      }
      return {
        id: asteroid.id,
        name: asteroid.name,
        diameter: asteroid.estimated_diameter.meters,
        is_potentially_hazardous_asteroid: asteroid.is_potentially_hazardous_asteroid,
        close_approach_date_full: asteroid.close_approach_data[0].close_approach_date_full,
        relative_velocity: asteroid.close_approach_data[0].relative_velocity.kilometers_per_second
      }
    })

  if (showCount) {
    result.count = asteroids.length
  }

  if (showDangerous) {
    result.wereDangerousMeteors = wereDangerousMeteors
  }

  result.asteroids = asteroids

  return result
}

const getStartAndEndDates = (date) => {
  if (date) {
    return { startDate: date, endDate: date }
  }

  return { startDate: config.startDate, endDate: config.endDate }
}

export default fetchAsteroid
