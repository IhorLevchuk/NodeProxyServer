import dotenv from 'dotenv'

dotenv.config()

interface Config {
  serverPort: string | number
  startDate: string
  endDate: string
  nasaAsteroidsUrl: string
  nasaPhotoUrl: string
  lastDayOfPhotosFromMars: string
}

/* eslint-disable no-undef */
const config: Config = {
  serverPort: process.env.SERVER_PORT || 4000,

  nasaAsteroidsUrl: `${process.env.NASA_BASE_URL}/neo/rest/v1/feed?api_key=${process.env.NASA_API_KEY}`,
  nasaPhotoUrl: `${process.env.NASA_BASE_URL}/mars-photos/api/v1/rovers/curiosity/photos`,
  startDate: process.env.START_DATE || '2024-02-19',
  endDate: process.env.END_DATE || '2024-02-20',
  lastDayOfPhotosFromMars: process.env.LAST_DAY_OF_PHOTOS_FROM_MARS || '2024-02-19'
}

export default config
