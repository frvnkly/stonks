const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './client', });
const handle = app.getRequestHandler();

module.exports = async server => {
  await app.prepare();

  server.use('/', (req, res, next) => {
    req.app = app;
    req.handle = handle;
    next();
  });

  server.originalListen = server.listen;
  server.listen = port => {
    server.get('*', (req, res) => {
      req.handle(req, res);
    });
    server.originalListen(port);
  };

  return server;
}