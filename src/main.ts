import { Container, ContainerModule, interfaces } from 'inversify'
import { App } from './server'
import { TYPES } from './constants/constants'
import { IAsteroidApiController } from './controller/api/asteroid.api.controller.interface'
import { AsteroidApiController } from './controller/api/asteroid.api.controller'
import { IAsteroidController } from './controller/asteroid.controller.interface'
import { AsteroidController } from './controller/asteroid.controller'
import { IAsteroidRepository } from './repository/asteroid.repository.interface'
import { AsteroidRepository } from './repository/asteroid.repository'
import { IAsteroidService } from './service/asteroid.service.interface'
import { AsteroidService } from './service/asteroid.service'
import { Configuration } from './config/config'
import { AxiosConfig } from './config/axios'
import { IErrorHandler } from './common/error.handler.interface'
import { ErrorHandler } from './common/error.handler'
import { IPhotoController } from './controller/photo.controller.interface'
import { IPhotoRepository } from './repository/photo.repository.interface'
import { IPhotoService } from './service/photo.service.interface'
import { PhotoService } from './service/photo.service'
import { PhotoRepository } from './repository/photo.repository'
import { PhotoController } from './controller/photo.controller'

interface Bootstrap {
    appContainer: Container;
    app: App;
}

export const appBinging = new ContainerModule((bind: interfaces.Bind) => {
  bind<Configuration>(TYPES.Configuration).to(Configuration).inSingletonScope()
  bind<AxiosConfig>(TYPES.AxiosConfig).to(AxiosConfig).inSingletonScope()
  bind<IErrorHandler>(TYPES.IErrorHandler).to(ErrorHandler).inSingletonScope()

  bind<IAsteroidApiController>(TYPES.IAsteroidApiController).to(AsteroidApiController).inSingletonScope()
  bind<IAsteroidController>(TYPES.IAsteroidController).to(AsteroidController).inSingletonScope()
  bind<IAsteroidRepository>(TYPES.IAsteroidRepository).to(AsteroidRepository).inSingletonScope()
  bind<IAsteroidService>(TYPES.IAsteroidService).to(AsteroidService).inSingletonScope()

  bind<IPhotoController>(TYPES.IPhotoController).to(PhotoController).inSingletonScope()
  bind<IPhotoRepository>(TYPES.IPhotoRepository).to(PhotoRepository).inSingletonScope()
  bind<IPhotoService>(TYPES.IPhotoService).to(PhotoService).inSingletonScope()

  bind<App>(TYPES.Application).to(App)
})

const bootstrap = (): Bootstrap => {
  const appContainer = new Container()
  appContainer.load(appBinging)
  const app = appContainer.get<App>(TYPES.Application)
  app.init()

  return { appContainer, app }
}

export const { app, appContainer } = bootstrap()
