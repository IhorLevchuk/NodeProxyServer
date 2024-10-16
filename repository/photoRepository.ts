import axios from '../config/axios'
import config from '../config/config'
import NasaPhotosResponseDto from '../dto/nasa/nasaPhotosResponseDto'

async function getMarsPhotos (apiKey: string, data: string): Promise<NasaPhotosResponseDto> {
  const response = await axios.get(config.nasaPhotoUrl, {
    params: {
      api_key: apiKey,
      earth_date: data
    }
  })
  return response.data
}

export default getMarsPhotos
