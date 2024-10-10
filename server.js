const express = require('express');
const asteroidRouterApi = require('./delivery/route/asteroidRoutesApi');
const asteroidRouter = require('./delivery/route/asteroidRoutes');
const roverRouterApi = require('./delivery/route/roverRoutesApi');
const config = require('./config/config');
const errorHandler = require('./exception/errorMiddleware');
const nunjucks = require('nunjucks');

const server = express();

server.set('view engine', 'html');

nunjucks.configure('views', {
        autoescape: false,
        express: server
});

server.listen(config.SERVER_PORT);

server.use(errorHandler);
server.use(asteroidRouterApi);
server.use(asteroidRouter);
server.use(roverRouterApi);
