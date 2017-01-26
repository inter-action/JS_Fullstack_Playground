import * as pino from 'pino'

import { Constants } from '../utils'

class LOGGER_LEVELS {
    static readonly fatal = 'fatal'
    static readonly error = 'error'
    static readonly warn = 'warn'
    static readonly info = 'info'
    static readonly debug = 'debug'
    static readonly trace = 'trace'
}

export const logger = pino({
    name: Constants.APP_NAME,
})

logger.level = LOGGER_LEVELS.debug