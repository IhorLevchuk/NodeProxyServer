import dotenv from 'dotenv'

dotenv.config()

/* eslint-disable no-undef */
const config = {
  serverPort: process.env.SERVER_PORT || 4000,

  nasaAsteroidsUrl: `${process.env.NASA_BASE_URL}/neo/rest/v1/feed?api_key=${process.env.NASA_API_KEY}`,
  nasaPhotoUrl: `${process.env.NASA_BASE_URL}/mars-photos/api/v1/rovers/curiosity/photos`,
  startDate: process.env.START_DATE,
  endDate: process.env.END_DATE,
  lastDayOfPhotosFromMars: process.env.LAST_DAY_OF_PHOTOS_FROM_MARS
}

export default config
