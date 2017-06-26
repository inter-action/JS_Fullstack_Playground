// TODO: CHANGE TO STRING ENUM
type ENV_MYSQL_KEYS =
    "MYSQL_CONNECTION_HOST" | "MYSQL_DATABASE" | "MYSQL_USER" | "MYSQL_PASSWORD";

type GITHUB_OAUTH = "OAUTH_GITHUB_CLIENT_ID" | "OAUTH_GITHUB_CLIENT_SECREAT"

type ENV_KEYS = ENV_MYSQL_KEYS | GITHUB_OAUTH | "JWT_SIGNED_TOKEN" | "APP_COOKIE_KEY" | "NODE_PORT" | "LOG_LEVEL";


function getEnvConfig(key: ENV_KEYS, safe = true): string {
    let result = process.env[key];

    if (safe && !result) {
        throw new Error(`no config been found for key: ${key}`);
    }
    return result;
}

export const ENV = {
    dev: "dev",
    test: "test"
}


function get_mysql_env() {
    return {
        HOST: getEnvConfig("MYSQL_CONNECTION_HOST"),
        DB: getEnvConfig("MYSQL_DATABASE"),
        USER: getEnvConfig("MYSQL_USER"),
        PASSWORD: getEnvConfig("MYSQL_PASSWORD")
    }
}


export const ENV_UTILS = {
    is_test: () => {
        return process.env.NODE_ENV === ENV.test
    },

    get_current_env() {
        return process.env.NODE_ENV;
    },
    get_mysql_env,
    getEnvConfig
}
