import { User, getUserAccess } from '../../../../server/entities';


export async function seed() {
    return await seedUser();
}

async function seedUser() {
    let userResp = getUserAccess().getRespsitory();
    let usr1 = User.create('bran_stark', 'bran_stark@ele.me', '$2a$10$Me6ee0U0pwsA9QrdmanvjOi1EurxcWltCsOaesoxt4HWFUWKuUhjW')
    await userResp.persist(usr1);

    let usr2 = User.create('mahone', 'mahone@hotmail.com', 'mahone_password')
    await userResp.persist(usr2)
}