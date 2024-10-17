import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { BaseController } from '../common/controller/base.controller'
import { TYPES } from '../constants/constants'
import { ValidateMiddleware } from '../common/validate.middleware'
import { IPhotoService } from '../service/photo.service.interface'
import { photoSchema } from '../common/validation_schema/photo.schema'
import { IPhotoController } from './photo.controller.interface'
import PhotoRequest from '../dto/photo.request'
import PhotoResponse from '../dto/photo.response'

@injectable()
class PhotoController extends BaseController implements IPhotoController {
  constructor (
        @inject(TYPES.IPhotoService) private photoService: IPhotoService
  ) {
    super()
    this.bindRoutes([
      {
        path: '/',
        method: 'post',
        func: this.getPhoto,
        middlewares: [
          new ValidateMiddleware(photoSchema, 'body')
        ]
      },
      {
        path: '/',
        method: 'get',
        func: this.getPhotoForm,
        middlewares: []
      }
    ])
  }

  async getPhoto (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const request: PhotoRequest = req.body

      const result: PhotoResponse = await this.photoService.getLatestRoverPhoto(request)

      this.render(res, 'photo.html', { photoUrl: result.url })
    } catch (err) {
      return next(err)
    }
  }

  async getPhotoForm (req: Request, res: Response): Promise<void> {
    this.render(res, 'photoForm.html')
  }
}

export { PhotoController }
