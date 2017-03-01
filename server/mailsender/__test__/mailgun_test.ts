const ava = require('ava');
import { expect } from 'chai';

import { loadTplPr, sendmail } from '../mailgun';

let TAG = '#mailsender: ';
ava(`${TAG}: templates render should work`, async _ => {
    let str = await loadTplPr(
        'activation.ejs',
        { email: 'xyz_some@qq.com', activatedUrl: 'http://localhost:9000/activate' })

    expect(str).to.contains('xyz_some@qq.com');
});

ava.skip(`${TAG}: should sendmail work `, async _ => {
    let html = await loadTplPr('activation.ejs', { email: 'jing.miao@ele.me', activatedUrl: 'http://localhost:9000/activate' })
    let resp = await sendmail({ to: 'xyz_some@qq.com', subject: 'welcome to Ghost', html })
    console.log(resp)
})