export const ENV = {
    dev: 'dev',
    test: 'test'
}

export const ENV_UTILS = {
    is_test: () => {
        return process.env.NODE_ENV === ENV.test
    }
}
