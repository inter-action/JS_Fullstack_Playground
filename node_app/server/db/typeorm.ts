import * as path from "path";
import { createConnection, getConnectionManager } from "typeorm";
import { ENV_UTILS } from "../utils";
import { logger, LOGGER_LEVELS } from "../logging";

let conn;

export async function connect() {
    let MYSQL_ENV_CONFIG = ENV_UTILS.get_mysql_env();
    logger.info("MYSQL_ENV_CONFIG", MYSQL_ENV_CONFIG.DB);

    if (conn) {
        return conn;
    } else {
        return await createConnection({
            driver: {
                type: "mysql",
                host: MYSQL_ENV_CONFIG.HOST,
                port: 3306,
                username: MYSQL_ENV_CONFIG.USER,
                password: MYSQL_ENV_CONFIG.PASSWORD,
                database: MYSQL_ENV_CONFIG.DB
            },
            entities: [
                path.resolve(__dirname, "../entities/*.js")
            ],
            logging: {
                logger: (_level, str) => {
                    logger.trace(str);
                },
                logQueries: ENV_UTILS.getEnvConfig("LOG_LEVEL", false) === LOGGER_LEVELS.trace,
                logFailedQueryError: true,
            }
        }).then(c => {
            conn = c;
            return c;
        })
    }
}

export function getConnection() {
    return getConnectionManager().get();
}