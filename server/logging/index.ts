import * as pino from 'pino'

import { ENV_UTILS } from '../utils/env';
import * as Constants from '../utils/constants';

class LOGGER_LEVELS {
    static readonly fatal = 'fatal'
    static readonly error = 'error'
    static readonly warn = 'warn'
    static readonly info = 'info'
    static readonly debug = 'debug'
    static readonly trace = 'trace'
}

interface LogMock {
    levelVal: number
    fatal(msg: string, ...args: any[]): void
    fatal(obj: {}, msg?: string, ...args: any[]): void
    error(msg: string, ...args: any[]): void
    error(obj: {}, msg?: string, ...args: any[]): void
    warn(msg: string, ...args: any[]): void
    warn(obj: {}, msg?: string, ...args: any[]): void
    info(msg: string, ...args: any[]): void
    info(obj: {}, msg?: string, ...args: any[]): void
    debug(msg: string, ...args: any[]): void
    debug(obj: {}, msg?: string, ...args: any[]): void
    trace(msg: string, ...args: any[]): void
    trace(obj: {}, msg?: string, ...args: any[]): void
    LOG_VERSION: number,
    level: string,
}


function createLogger() {
    if (ENV_UTILS.is_test()) {
        return <LogMock>{ info: console.log, error: console.log, warn: console.log };
    } else {
        return pino({
            name: Constants.APP_NAME,
        });
    }
}

export const logger = createLogger();

logger.level = LOGGER_LEVELS.debug