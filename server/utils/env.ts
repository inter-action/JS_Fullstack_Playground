export const ENV = {
    dev: 'dev',
    test: 'test'
}

function get_mysql_env() {
    return {
        HOST: process.env.MYSQL_CONNECTION_HOST,
        DB: process.env.MYSQL_CONNECTION_DB,
        USER: process.env.MYSQL_CONNECTION_USER,
        PASSWORD: process.env.MYSQL_CONNECTION_PASSWORD
    }
}

interface ENV_KEYS {
    JWT_SIGNED_TOKEN: string,
}

function getEnvConfig(): ENV_KEYS {
    return process.env
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
