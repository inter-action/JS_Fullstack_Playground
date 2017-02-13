import * as path from 'path';
const env = process.env.NODE_ENV;

if (!env) {
    throw new Error('process.env.NODE_ENV is not defined');
}

console.log(`resolve config using env: ${env}`);

let result = require('dotenv').config({ path: path.resolve(__dirname, `./dotenv/${env}.env`) });
if (result.error) {
    throw result.error
}

