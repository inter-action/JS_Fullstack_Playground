import { assert } from 'chai';
const ava = require('ava');

import { booleanChain } from '../validator';
import * as ValidatorJS from 'validator';

let TAG = 'validator chain';
ava(`${TAG}: should work`, t => {
    let result1: boolean = booleanChain<any>((e) => ValidatorJS.isLength(e, { min: 2 })).map(e => ValidatorJS.contains(e, 'abc')).run('abcd');
    let result2: boolean = booleanChain<any>((e) => ValidatorJS.isLength(e, { min: 8 })).map(() => {
        throw new Error('short path, should never got executed');
    }).run('abcd');
    assert(result1);
    assert(!result2);
    t.pass();
});