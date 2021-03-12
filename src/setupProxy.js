const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://59.77.7.58:8080',
      changeOrigin: true,
    }),
  );
};
