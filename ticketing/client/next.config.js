// fix the issue that nextJS doesnt change in pods
module.exports = {
  webpackDevMiddleware: config => {
    config.watchOptions.poll = 300;
    return config;
  }
}