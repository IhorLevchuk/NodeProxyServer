import Exception from '../exception/Exception.js'
import getLatestRoverPhoto from '../usecases/fetchRoverPhoto.js'

export const getPhotoForm = async (req, res) => {
  res.render('photoForm.html')
}

export const getPhoto = async (req, res, next) => {
  try {
    const { userApiKey } = req.body

    const photo = await getLatestRoverPhoto(userApiKey)

    res.render('photo.html', { photoUrl: photo })
  } catch (error) {
    next(new Exception(error.code, error.message))
  }
}
