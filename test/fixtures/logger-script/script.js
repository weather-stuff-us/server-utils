'use strict'

const serverUtils = require('../../../server-utils')

const logger = serverUtils.createLogger(__filename)

logger.debug('debug')
logger.info('%s', 'info')
logger.warn('warn', 42, 'warn')
logger.error('error', { a: 42 })
