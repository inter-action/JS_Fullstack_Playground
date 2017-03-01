import { Entity, Column, PrimaryGeneratedColumn, Connection, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import * as uuidV4 from 'uuid/v4';
import * as crypto from 'crypto';

import * as validator from 'validator';
import * as _ from 'lodash';
import * as Bluebird from 'bluebird';
import * as boom from 'boom';

import { booleanChain, errors, ENV_UTILS } from '../utils';
import { Either, Left, Right } from '../extend_type';
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const bcryptCreateHash: any = Bluebird.promisify(bcrypt.hash);
const bcryptCompare: any = Bluebird.promisify(bcrypt.compare);
const jwtSign: any = Bluebird.promisify(jwt.sign);

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 36 })
    uuid: string = uuidV4();

    @Column({ length: 25 })
    username: string;

    @Column()
    password: string;

    @Column({ length: 50 })
    email: string;

    @Column({ length: 50 })
    from: string = 'this_app';

    @Column()
    fromId: string = '';

    @Column("smallint")
    status: number = 0;

    @CreateDateColumn()
    createdAt: Date;;

    @UpdateDateColumn()
    updatedAt: Date;

    static createUser(username: string, email: string, password: string) {
        let usr = new User();
        usr.username = username
        usr.email = email
        usr.password = password
        return usr;
    }

    static generateResetToken(expireMili: number, email: string, password: string, appname = 'app'): string {
        function sign(expire: number, email: string, salt: string) {
            let hash = crypto.createHash('sha256');
            hash.update(String(expire));
            hash.update(email);
            hash.update(salt);
            return hash.digest('hex');
        }

        let result = [String(expireMili), email, sign(expireMili, email, password + appname)].join('|');
        return new Buffer(result).toString('base64');
    }

    // the whole generate & valid logic token can be replace with JWT. it would be much easier to do so 
    static async validateResetToken(
        token: string,
        findUserByEmail: (email) => Promise<User>): Promise<Either<Error, User>> {

        let result = new Buffer(token, 'base64').toString();
        let tokens = result.split('|');
        if (tokens.length !== 3) return new Left<Error, User>(new Error('invalid token'));
        let expire = parseInt(tokens[0], 10);
        if (Date.now() > expire) return new Left<Error, User>(new Error('token expired'));

        let email = tokens[1];
        if (!validator.isEmail(email)) return new Left<Error, User>(new Error('invalid email: empty'));

        let dbuser = await findUserByEmail(email);
        if (!dbuser) return new Left<Error, User>(new Error('invalid email: no user'));

        let createdToken = User.generateResetToken(expire, email, dbuser.password);
        // this implementation is more slower than the simple string comparison
        // let diff = token.length === createdToken.length ? 0 : 1;
        // for (let i = createdToken.length - 1; i >= 0; i--) {
        //     diff |= token.charCodeAt(i) ^ createdToken.charCodeAt(i)
        // }
        if (createdToken !== token) return new Left<Error, User>(new Error('invalid token'));
        else return new Right<Error, User>(dbuser);
    }
}


type UserKey = {[P in keyof User]: User[P]}

export function getUserAccess(conn: Connection) {
    const resp = conn.getRepository(User);

    return {
        getRespsitory() {
            return resp;
        },

        findOne(options: UserKey) {
            return resp.findOne(options);
        }
    }
}
