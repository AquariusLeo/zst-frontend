const { resolve } = require('path')

module.exports = function(config, env) {
  config.resolve.alias = {
    ...config.resolve.alias,
    "@":resolve('src')
  }
  return config
}