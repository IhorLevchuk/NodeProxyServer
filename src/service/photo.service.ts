import { IPhotoService } from './photo.service.interface'
import { inject, injectable } from 'inversify'
import { TYPES } from '../constants/constants'
import { Configuration } from '../config/config'
import PhotoRequest from '../dto/photo.request'
import PhotoResponse from '../dto/photo.response'
import NasaPhotosResponse from '../dto/nasa/nasa.photos.response'
import Exception from '../common/exception'
import { IPhotoRepository } from '../repository/photo.repository.interface'

@injectable()
class PhotoService implements IPhotoService {
  private lastDayOfPhotosFromMars: string

  constructor (
        @inject(TYPES.IPhotoRepository) private readonly photoRepository: IPhotoRepository,
        @inject(TYPES.Configuration) private readonly config: Configuration
  ) {
    this.lastDayOfPhotosFromMars = this.config.get('LAST_DAY_OF_PHOTOS_FROM_MARS')
  }

  async getLatestRoverPhoto (request: PhotoRequest): Promise<PhotoResponse> {
    const nasaResponse: NasaPhotosResponse = await this.photoRepository.fetchMarsPhotos(request.userApiKey, this.lastDayOfPhotosFromMars)
    if (nasaResponse.photos.length === 0) {
      throw new Exception(500, 'Internal server error', { error: 'Incorrect server configuration' })
    }
    return {
      url: nasaResponse.photos[nasaResponse.photos.length - 1].img_src
    }
  }
}

export { PhotoService }
