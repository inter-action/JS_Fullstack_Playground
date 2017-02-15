type ENV_MYSQL_KEYS =
    'MYSQL_CONNECTION_HOST' | 'MYSQL_CONNECTION_DB' | 'MYSQL_CONNECTION_USER' | 'MYSQL_CONNECTION_PASSWORD';

type ENV_KEYS = ENV_MYSQL_KEYS | 'JWT_SIGNED_TOKEN';


function getEnvConfig(key: ENV_KEYS, safe = true): string {
    let result = process.env[key];

    if (safe && !result) {
        throw new Error(`no config been found for key: ${key}`);
    }
    return result;
}

export const ENV = {
    dev: 'dev',
    test: 'test'
}


function get_mysql_env() {
    return {
        HOST: getEnvConfig('MYSQL_CONNECTION_HOST'),
        DB: getEnvConfig('MYSQL_CONNECTION_DB'),
        USER: getEnvConfig('MYSQL_CONNECTION_USER'),
        PASSWORD: getEnvConfig('MYSQL_CONNECTION_PASSWORD')
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
