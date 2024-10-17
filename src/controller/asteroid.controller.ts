import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'
import { BaseController } from '../common/controller/base.controller'
import { TYPES } from '../constants/constants'
import { ValidateMiddleware } from '../common/validate.middleware'
import { IAsteroidController } from './asteroid.controller.interface'
import { IAsteroidService } from '../service/asteroid.service.interface'
import { asteroidSchema } from '../common/validation_schema/asteroid.schema'
import AsteroidsResponse from '../dto/asteroids.response'

interface RequestQuery {
  date?: string;
  count?: boolean;
  wereDangerousMeteors?: boolean;
}

@injectable()
class AsteroidController extends BaseController implements IAsteroidController {
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

      this.render(res, 'index.html', { body: result })
    } catch (err) {
      return next(err)
    }
  }
}

export { AsteroidController }
