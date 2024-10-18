import * as Sentry from '@sentry/node'
import { nodeProfilingIntegration } from '@sentry/profiling-node'
import express, { Express } from 'express'
import { Configuration } from './config/config'
import nunjucks from 'nunjucks'
import { inject, injectable } from 'inversify'
import { TYPES } from './constants/constants'
import { IErrorHandler } from './common/error.handler.interface'
import { IAsteroidApiController } from './controller/api/asteroid.api.controller.interface'
import { StatusCodes } from 'http-status-codes'
import { Server } from 'http'
import { IAsteroidController } from './controller/asteroid.controller.interface'
import { IPhotoController } from './controller/photo.controller.interface'

@injectable()
class App {
  app: Express
  server!: Server
  port: number

  constructor (
      @inject(TYPES.Configuration) private readonly config: Configuration,
      @inject(TYPES.IAsteroidApiController) private readonly asteroidApiController: IAsteroidApiController,
      @inject(TYPES.IAsteroidController) private readonly asteroidController: IAsteroidController,
      @inject(TYPES.IPhotoController) private readonly photoController: IPhotoController,
      @inject(TYPES.IErrorHandler) private readonly errorHandler: IErrorHandler
  ) {
    this.configureSentry()

    this.app = express()
    this.port = Number(this.config.get('SERVER_PORT'))
  }

  configureSentry (): void {
    Sentry.init({
      dsn: this.config.get('SENTRY_DSN'),
      integrations: [nodeProfilingIntegration()],
      tracesSampleRate: 1.0,
      profilesSampleRate: 1.0
    })
  }

  configureNunjucks (): void {
    nunjucks.configure('src/views', {
      autoescape: true,
      express: this.app
    })

    this.app.set('view engine', 'html')
  }

  useMiddleware (): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  useRoutes (): void {
    this.app.use('/api/asteroids', this.asteroidApiController.router)
    this.app.use('/asteroids', this.asteroidController.router)
    this.app.use('/photo', this.photoController.router)
  }

  useExceptionFilters (): void {
    Sentry.setupExpressErrorHandler(this.app)
    this.app.use(this.errorHandler.catch.bind(this.errorHandler))

    this.app.use('*', (req, res) => {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Page not found' })
    })
  }

  public async init (): Promise<void> {
    this.configureNunjucks()
    this.useMiddleware()
    this.useRoutes()
    this.useExceptionFilters()
    this.server = this.app.listen(this.port)
    console.log(`[App] Server listening at http://localhost:${this.port}`)
  }
}

export { App }
