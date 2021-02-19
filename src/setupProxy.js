const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://106.75.223.149:8080',
      changeOrigin: true,
    }),
  );
};
