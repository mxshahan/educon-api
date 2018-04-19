import convert from 'koa-convert';
import cors from '@koa/cors';
import bodyParser from 'koa-body';
import helmet from 'koa-helmet';
import config from 'config';
import serve from 'koa-static';
import mount from 'koa-mount';

import cModules from '../app';
import { catchErr, statusMessage } from './errorConfig';
import nuxtConfig from './nuxtConfig';

function baseConfig(app) {
  app.keys = config.get('secret');
  app.proxy = true;

  app.use(mount('/public', serve(config.get('paths.static'))));

  app.use(convert.compose(
    catchErr,
    cors(),
    bodyParser({
      multipart: true,
      formLimit: '200mb'
    }),
    helmet(),
    statusMessage
  ));

  cModules(app);

  if (config.get('nuxtBuild')) {
    nuxtConfig(app);
  }
}

export default baseConfig;
