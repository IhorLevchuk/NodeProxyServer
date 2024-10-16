import Exception from '../exception/Exception'
import getLatestRoverPhoto from '../usecases/fetchRoverPhoto'
import { Request, Response, NextFunction } from 'express'
import PhotoResponseDto from '../dto/photoResponseDto'
import PhotoRequestDto from '../dto/photoRequestDto'

export const getPhotoForm = async (req: Request, res: Response): Promise<void> => {
  res.render('photoForm.html')
}

export const getPhoto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request: PhotoRequestDto = req.body

    const photo: PhotoResponseDto = await getLatestRoverPhoto(request)

    res.render('photo.html', { photoUrl: photo.url })
  } catch (error: any) {
    next(new Exception(500, error.message, {}))
  }
}
