const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    console.log("setting up proxy middleware");
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      // target: 'https://mithaicart-3nna.vercel.app',
      changeOrigin: true,
    })
  );
};