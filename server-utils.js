'use strict'

const logger = require('./lib/logger')

module.exports = {
  createLogger
}

function createLogger (fileName) {
  return logger.create(fileName)
}
