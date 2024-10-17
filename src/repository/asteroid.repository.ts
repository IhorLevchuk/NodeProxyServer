import NasaNearEarthObjectsResponse from '../dto/nasa/nasa.near.earth.objects.response'
import { IAsteroidRepository } from './asteroid.repository.interface'
import { inject, injectable } from 'inversify'
import { TYPES } from '../constants/constants'
import { AxiosConfig } from '../config/axios'

@injectable()
class AsteroidRepository implements IAsteroidRepository {
  constructor (
      @inject(TYPES.AxiosConfig) private readonly axios: AxiosConfig
  ) {
    this.axios = axios
  }

  async fetchAsteroids (startDate: string, endDate: string): Promise<NasaNearEarthObjectsResponse> {
    const response = await this.axios.getInstance().get('/neo/rest/v1/feed', {
      params: {
        start_date: startDate,
        end_date: endDate
      }
    })
    return response.data.near_earth_objects
  }
}

export { AsteroidRepository }
