const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    console.log("setting up proxy middleware");
  app.use(
    '/api',
    createProxyMiddleware({
      // target: 'http://localhost:5000',
      target: 'https://whispers-from-the-world-zov8.vercel.app/',
      changeOrigin: true,
    })
  );
};