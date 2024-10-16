import getMarsPhotos from '../repository/photoRepository'
import config from '../config/config'
import Exception from '../exception/Exception'
import PhotoRequestDto from '../dto/photoRequestDto'
import NasaPhotosResponseDto from '../dto/nasa/nasaPhotosResponseDto'
import PhotoResponseDto from '../dto/photoResponseDto'

async function getLatestRoverPhoto (request: PhotoRequestDto): Promise<PhotoResponseDto> {
  const nasaResponse: NasaPhotosResponseDto = await getMarsPhotos(request.userApiKey, config.lastDayOfPhotosFromMars!)
  if (nasaResponse.photos.length === 0) {
    throw new Exception(500, 'Internal server error', { error: 'Incorrect server configuration' })
  }
  return {
    url: nasaResponse.photos[nasaResponse.photos.length - 1].img_src
  }
}

export default getLatestRoverPhoto
