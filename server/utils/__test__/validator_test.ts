import { assert } from 'chai';
const ava = require('ava');

import { booleanChain, getValidator } from '../validator';

let TAG = 'validator chain';

ava(`${TAG}: should work`, t => {
    let validator = getValidator();
    let result1: boolean = booleanChain<any>((e) => validator.length(e, 2)).map(e => validator.contains(e, 'abc')).run('abcd');
    let result2: boolean = booleanChain<any>((e) => validator.length(e, 8)).map(() => {
        throw new Error('short path, should never got executed');
    }).run('abcd');
    assert(result1);
    assert(!result2);
    t.pass();
});