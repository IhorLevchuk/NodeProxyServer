import Exception from '../exception/Exception.js'
import getLatestRoverPhoto from '../usecases/fetchRoverPhoto.js'

const getPhoto = async (req, res, next) => {
  try {
    const { userApiKey } = req.body

    const photo = await getLatestRoverPhoto(userApiKey)

    res.send({ photoUrl: photo })
  } catch (error) {
    next(new Exception(error.code, error.message))
  }
}

export default getPhoto
