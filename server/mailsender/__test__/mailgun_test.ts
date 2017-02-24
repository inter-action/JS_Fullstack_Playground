const ava = require('ava');
import { expect } from 'chai';

import { loadTplPr, sendmail } from '../mailgun';

let TAG = '#mailsender: ';
ava(`${TAG}: templates render should work`, async t => {
    let str = await loadTplPr(
        'activation.ejs',
        { email: '243127395@qq.com', activatedUrl: 'http://localhost:9000/activate' })

    expect(str).to.contains('243127395@qq.com');
});

ava(`${TAG}: should sendmail work `, async t => {
    let html = await loadTplPr('activation.ejs', { email: 'jing.miao@ele.me', activatedUrl: 'http://localhost:9000/activate' })
    let resp = await sendmail({ to: '243127395@qq.com', subject: 'welcome to Ghost', html })
    console.log(resp)
})