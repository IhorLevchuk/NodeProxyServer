import express from 'express'
import asteroidRouterApi from './delivery/route/asteroidRoutesApi.js'
import asteroidRouter from './delivery/route/asteroidRoutes.js'
import photoRouterApi from './delivery/route/photoRoutesApi.js'
import photoRouter from './delivery/route/photoRoutes.js'
import config from './config/config.js'
import errorHandler from './exception/errorMiddleware.js'
import nunjucks from 'nunjucks'

const server = express()

server.set('view engine', 'html')

nunjucks.configure('views', {
  autoescape: false,
  express: server
})

server.listen(config.serverPort)

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use(asteroidRouterApi)
server.use(asteroidRouter)
server.use(photoRouterApi)
server.use(photoRouter)

server.use(errorHandler)
