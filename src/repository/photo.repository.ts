import { inject, injectable } from 'inversify'
import { TYPES } from '../constants/constants'
import { AxiosConfig } from '../config/axios'
import { IPhotoRepository } from './photo.repository.interface'
import NasaPhotosResponse from '../dto/nasa/nasa.photos.response'

@injectable()
class PhotoRepository implements IPhotoRepository {
  constructor (
      @inject(TYPES.AxiosConfig) private readonly axios: AxiosConfig
  ) {
    this.axios = axios
  }

  async fetchMarsPhotos (apiKey: string, date: string): Promise<NasaPhotosResponse> {
    const response = await this.axios.getInstance().get('/mars-photos/api/v1/rovers/curiosity/photos', {
      params: {
        api_key: apiKey,
        earth_date: date
      }
    })
    return response.data
  }
}

export { PhotoRepository }
