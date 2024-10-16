import axios from '../config/axios'
import config from '../config/config'
import NasaNearEarthObjectsResponseDto from '../dto/nasa/nasaNearEarthObjectsResponseDto'

async function fetchAsteroids (startDate: string, endDate: string): Promise<NasaNearEarthObjectsResponseDto> {
  const response = await axios.get(config.nasaAsteroidsUrl, {
    params: {
      start_date: startDate,
      end_date: endDate
    }
  })
  return response.data.near_earth_objects
}

export default fetchAsteroids
