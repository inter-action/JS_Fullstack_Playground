const ava = require('ava');

import { chai, server } from '../func_test_util'

export function runTvShowTest() {
    let TAG = 'API_TEST:TV_SHOWS';
    ava.cb(`${TAG}: GET /api/tv_shows, should return all shows`, t => {
        chai.request(server)
            .get('/api/tv_shows')
            .end(function (_, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.length.should.equal(4);
                res.body[0].should.have.property('name');
                res.body[0].name.should.equal('Suits');
                res.body[0].should.have.property('channel');
                res.body[0].channel.should.equal('USA Network');
                res.body[0].should.have.property('genre');
                res.body[0].genre.should.equal('Drama');
                res.body[0].should.have.property('rating');
                res.body[0].rating.should.equal(3);
                res.body[0].should.have.property('explicit');
                res.body[0].explicit.should.not.be.ok; // ok is like , a == truthy 
                t.end();
            });
    });


    ava.cb(`${TAG}: GET /api/tv_shows/:id, should return a single show `, t => {
        chai.request(server)
            .get('/api/tv_shows/1')
            .end(function (_, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.name.should.equal('Suits');
                res.body.should.have.property('channel');
                res.body.channel.should.equal('USA Network');
                res.body.should.have.property('genre');
                res.body.genre.should.equal('Drama');
                res.body.should.have.property('rating');
                res.body.rating.should.equal(3);
                res.body.should.have.property('explicit');
                res.body.explicit.should.not.be.ok;
                t.end();
            });
    });

    ava.cb(`${TAG}: POST /api/tv_shows, should add a show`, t => {
        chai.request(server)
            .post('/api/tv_shows')
            .send({
                name: 'Family Guy',
                channel: 'Fox',
                genre: 'Comedy',
                rating: 4,
                explicit: true
            })
            .end(function (_, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.name.should.equal('Family Guy');
                res.body.should.have.property('channel');
                res.body.channel.should.equal('Fox');
                res.body.should.have.property('genre');
                res.body.genre.should.equal('Comedy');
                res.body.should.have.property('rating');
                res.body.rating.should.equal(4);
                res.body.should.have.property('explicit');
                res.body.explicit.should.be.ok;
                t.end();
            });
    });

    ava.cb(`${TAG}: PUT /api/tv_shows/:id, should update a show`, t => {

        chai.request(server)
            .put('/api/tv_shows/1')
            .send({
                rating: 4,
                explicit: true
            })
            .end(function (_, res) {
                res.should.have.status(200);
                res.should.be.json; // jshint ignore:line
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.name.should.equal('Suits');
                res.body.should.have.property('channel');
                res.body.channel.should.equal('USA Network');
                res.body.should.have.property('genre');
                res.body.genre.should.equal('Drama');
                res.body.should.have.property('rating');
                res.body.rating.should.equal(4);
                res.body.should.have.property('explicit');
                res.body.explicit.should.ok
                t.end();
            });
    });


    ava.cb(`${TAG}: PUT /api/tv_shows/:id, should NOT update a show if the id field is part of the request, `, t => {

        chai.request(server)
            .put('/api/tv_shows/1')
            .send({
                id: 3,
                rating: 4,
                explicit: true
            })
            .end(function (_, res) {
                res.should.have.status(422);
                t.end();
            });
    });

    ava.cb(`${TAG}: DELETE /api/tv_shows/:id, should delete a show `, t => {

        chai.request(server)
            .del('/api/tv_shows/1')
            .end(function (_, response) {
                response.should.have.status(200);
                response.should.be.json;
                response.body.should.be.a('object');
                response.body.should.have.property('name');
                response.body.name.should.equal('Suits');
                response.body.should.have.property('channel');
                response.body.channel.should.equal('USA Network');
                response.body.should.have.property('genre');
                response.body.genre.should.equal('Drama');
                response.body.should.have.property('rating');
                response.body.rating.should.equal(3);
                response.body.should.have.property('explicit');
                response.body.explicit.should.not.be.ok
                chai.request(server)
                    .get('/api/tv_shows')
                    .end(function (_, res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('array');
                        res.body.length.should.equal(3);
                        res.body[0].should.have.property('name');
                        res.body[0].name.should.equal('Game of Thrones');
                        res.body[0].should.have.property('channel');
                        res.body[0].channel.should.equal('HBO');
                        res.body[0].should.have.property('genre');
                        res.body[0].genre.should.equal('Fantasy');
                        res.body[0].should.have.property('rating');
                        res.body[0].rating.should.equal(5);
                        res.body[0].should.have.property('explicit');
                        res.body[0].explicit.should.be.ok
                        t.end();
                    });
            });

    });
}
