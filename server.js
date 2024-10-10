import express from 'express';
import asteroidRouterApi from './delivery/route/asteroidRoutesApi.js';
import asteroidRouter from './delivery/route/asteroidRoutes.js';
import config from './config/config.js';
import errorHandler from './exception/errorMiddleware.js';
import nunjucks from 'nunjucks';

const server = express();

server.set('view engine', 'html');

nunjucks.configure('views', {
        autoescape: false,
        express: server
});

server.listen(config.serverPort);

server.use(asteroidRouterApi);
server.use(asteroidRouter);

server.use(errorHandler);
