const { resolve } = require('path')

module.exports = {
  webpack: function(config, env) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@":resolve('src')
    }
    return config
  }
}