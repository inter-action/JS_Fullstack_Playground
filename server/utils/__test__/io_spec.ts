import * as fs from 'fs'

import * as chai from 'chai'

import { BytesReader } from '../io'

const expect = chai.expect

describe('io spec', function () {
    describe('#BufferReader()', function () {
        it('get same string from test resource file', function (done) {
            const reader = new BytesReader()
            fs.createReadStream('./test/resources/io_writeble.txt').pipe(reader)

            reader.on('finish', () => {
                try {
                    const str = reader.buffer.toString('utf8')
                    expect(str).to.equal('this is a writable test')
                    done()
                } catch (e) {
                    done(e)
                }

            })

            reader.on('error', (error) => {
                done(error)
            })
        });
    });
});