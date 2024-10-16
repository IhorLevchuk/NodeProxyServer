import Exception from '../exception/Exception'
import getLatestRoverPhoto from '../usecases/fetchRoverPhoto'
import { NextFunction, Request, Response } from 'express'
import PhotoResponseDto from '../dto/photoResponseDto'

const getPhoto = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userApiKey } = req.body

    const photo: PhotoResponseDto = await getLatestRoverPhoto(userApiKey)

    res.send({ photoUrl: photo })
  } catch (error: any) {
    next(new Exception(500, error.message, {}))
  }
}

export default getPhoto
