const TYPES = {
  Application: Symbol.for('Application'),
  Configuration: Symbol.for('Configuration'),
  AxiosConfig: Symbol.for('AxiosConfig'),

  IAsteroidRepository: Symbol.for('IAsteroidRepository'),
  IAsteroidApiController: Symbol.for('IAsteroidApiController'),
  IAsteroidController: Symbol.for('IAsteroidController'),
  IAsteroidService: Symbol.for('IAsteroidService'),

  IPhotoRepository: Symbol.for('IPhotoRepository'),
  IPhotoController: Symbol.for('IPhotoController'),
  IPhotoService: Symbol.for('IPhotoService'),

  IErrorHandler: Symbol.for('IErrorHandler')
}

export { TYPES }
