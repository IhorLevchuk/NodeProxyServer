import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { StatusCodes } from 'http-status-codes'
import { BaseController } from '../../common/controller/base.controller'
import { TYPES } from '../../constants/constants'
import { ValidateMiddleware } from '../../common/validate.middleware'
import { IAsteroidApiController } from './asteroid.api.controller.interface'
import { IAsteroidService } from '../../service/asteroid.service.interface'
import { asteroidSchema } from '../../common/validation_schema/asteroid.schema'
import AsteroidsResponse from '../../dto/asteroids.response'

interface RequestQuery {
  date?: string;
  count?: boolean;
  wereDangerousMeteors?: boolean;
}

@injectable()
class AsteroidApiController extends BaseController implements IAsteroidApiController {
  constructor (
        @inject(TYPES.IAsteroidService) private asteroidService: IAsteroidService
  ) {
    super()
    this.bindRoutes([
      {
        path: '/',
        method: 'get',
        func: this.getByParam,
        middlewares: [
          new ValidateMiddleware(asteroidSchema, 'query')
        ]
      }
    ])
  }

  async getByParam (req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { count, wereDangerousMeteors, date } = req.query as RequestQuery

      const result: AsteroidsResponse = await this.asteroidService.getAsteroid(date, wereDangerousMeteors, count)

      this.send(res, StatusCodes.OK, result)
    } catch (err) {
      return next(err)
    }
  }
}

export { AsteroidApiController }
