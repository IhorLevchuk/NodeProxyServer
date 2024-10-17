import { Response, Router } from 'express'
import { injectable } from 'inversify'

import { IController } from './controller.interface'

@injectable()
abstract class BaseController {
  private readonly _router: Router

  constructor () {
    this._router = Router()
  }

  get router (): Router {
    return this._router
  }

  public send<T> (res: Response, code: number, message?: T): Response {
    if (message) {
      res.type('application/json')
      return res.status(code).json(message)
    }
    return res.status(code).send()
  }

  public render<T> (res: Response, view: string, data?: T): void {
    if (data) {
      return res.render(view, data)
    }
    return res.render(view)
  }

  protected bindRoutes (routes: Array<IController>): void {
    routes.forEach(({ path, func, method, middlewares }) => {
      const middleware = middlewares?.map((m) => m.execute.bind(m))
      const handler = func.bind(this)
      const pipeline = middleware ? [...middleware, handler] : handler
      this._router[method](path, pipeline)
    })
  }
}

export { BaseController }
