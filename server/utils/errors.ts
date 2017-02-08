

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

export class AppError extends Error {
    constructor(msg: string, public others: {} = {}, public name: string = 'AppError') {
        super(msg);
        Error.captureStackTrace(this)
    }
}

export class ValidationError extends AppError {
    constructor(msg: string, others: {} = {}) {
        super(msg, others, 'ValidationError');
    }
}
