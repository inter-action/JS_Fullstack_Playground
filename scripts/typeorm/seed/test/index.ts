
import { getConnection } from 'typeorm';
import { User, getUserAccess, TvShow } from '../../../../server/entities';


export async function seed() {
    await seedTvShows();
    return await seedUser();
}


async function seedUser() {
    let userResp = getUserAccess().getRespsitory();
    let usr1 = User.create('bran_stark', 'bran_stark@ele.me', '$2a$10$Me6ee0U0pwsA9QrdmanvjOi1EurxcWltCsOaesoxt4HWFUWKuUhjW')
    await userResp.persist(usr1);

    let usr2 = User.create('mahone', 'mahone@hotmail.com', 'mahone_password')
    await userResp.persist(usr2)
}

async function seedTvShows() {
    function newTvShow(show) {
        let nshow = new TvShow();
        return Object.assign(nshow, show)
    }

    let resp = getConnection().getRepository(TvShow);
    await resp.persist(newTvShow({
        name: 'Suits',
        channel: 'USA Network',
        genre: 'Drama',
        rating: 3,
        explicit: false
    }))

    await resp.persist(newTvShow({
        name: 'Game of Thrones',
        channel: 'HBO',
        genre: 'Fantasy',
        rating: 5,
        explicit: true
    }))
    await resp.persist(newTvShow({
        name: 'South Park',
        channel: 'Comedy Central',
        genre: 'Comedy',
        rating: 4,
        explicit: true
    }))
    await resp.persist(newTvShow({
        name: 'Mad Men',
        channel: 'AMC',
        genre: 'Drama',
        rating: 3,
        explicit: false
    }))

}