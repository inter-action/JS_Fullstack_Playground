import * as path from 'path';
const env = process.env.NODE_ENV;

if (!env) {
    throw new Error('process.env.NODE_ENV is not defined');
}

let result = require('dotenv').config({ path: path.resolve(__dirname, `./dotenv/${env}.env`) });
if (result.error) {
    throw result.error
}

