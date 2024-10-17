import AsteroidsResponse from '../dto/asteroids.response'
import { IAsteroidService } from './asteroid.service.interface'
import NasaNearEarthObjectsResponse from '../dto/nasa/nasa.near.earth.objects.response'
import AsteroidResponse from '../dto/asteroid.response'
import { inject, injectable } from 'inversify'
import { TYPES } from '../constants/constants'
import { IAsteroidRepository } from '../repository/asteroid.repository.interface'
import { Configuration } from '../config/config'

@injectable()
class AsteroidService implements IAsteroidService {
  private startDate: string
  private endDate: string

  constructor (
        @inject(TYPES.IAsteroidRepository) private readonly asteroidRepository: IAsteroidRepository,
        @inject(TYPES.Configuration) private readonly config: Configuration
  ) {
    this.startDate = this.config.get('START_DATE')
    this.endDate = this.config.get('END_DATE')
  }

  async getAsteroid (date?: string, hasCount?: boolean, isDangerous?: boolean): Promise<AsteroidsResponse> {
    const { startDate, endDate } = this.getStartAndEndDates(date)

    const response: NasaNearEarthObjectsResponse = await this.asteroidRepository.fetchAsteroids(startDate, endDate)

    const asteroids: Array<AsteroidResponse> = Object.values(response).flatMap(d => d)
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

    const result: AsteroidsResponse = { asteroids }

    if (hasCount) {
      result.count = asteroids.length
    }

    if (isDangerous) {
      result.wereDangerousMeteors = asteroids.filter((meteor) => meteor.is_potentially_hazardous_asteroid).length > 0
    }

    return result
  }

  private getStartAndEndDates (date?: string) {
    if (date) {
      return { startDate: date, endDate: date }
    }

    return { startDate: this.startDate, endDate: this.endDate }
  }
}

export { AsteroidService }
