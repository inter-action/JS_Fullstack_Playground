import * as crypto from 'crypto';

import * as validator from 'validator';
import * as _ from 'lodash';
import * as Bluebird from 'bluebird';
import * as boom from 'boom';

import { booleanChain, errors, ENV_UTILS } from '../utils';
import { bookshelf } from '../data/db';
import { AppBookshelf } from './base'
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const bcryptCreateHash: any = Bluebird.promisify(bcrypt.hash);
const bcryptCompare: any = Bluebird.promisify(bcrypt.compare);
const jwtSign: any = Bluebird.promisify(jwt.sign);

// && ValidatorJS.isLength(e.password, { min: 8 })
export interface IUser {
    username: string,
    email: string,
    from: string,
    from_id: string
    password?: string,
}

export interface DBUser extends IUser {
    id: number,
    uuid: string,
    password: string
}


// I can type this user with a User constructor & a User type. Like the `Date`
// example in link https://basarat.gitbooks.io/typescript/content/docs/types/lib.d.ts.html
export const User: any = AppBookshelf.Model.extend(
    {
        // AppBookshelf.Model.prototype.<method_name>.apply(this, arguments);
        // call super method 

        tableName: 'user',
        hasTimestamps: true,

        initialize: function () {
            AppBookshelf.Model.prototype.initialize.apply(this, arguments);
            this.on('saving', this.validateSave);
        },

        validateSave: function () {
            let attr: IUser = this.toJSON();
            if (!User.validate(attr)) {
                throw new errors.ValidationError('user model invalid');
            }
        },

        isActivated() {
            return this.get('status') === 1;
        },

        isLocked() {
            return this.get('status') === 6
        }
    }, {
        // AppBookshelf.Model.<method_name> call super static methods

        // static methods

        // todo: filter out password data, interal api call should preseve all data
        /*
        @return Promise<bookshelf.Model>
        */
        findOnePr: function (query: any, options: any) {
            return this.forge(query).fetch(options);
        },
        /*
        @return Promise<Collection>
        */
        findAllPr: function (filter: any = {}, options: any) {
            return this.forge().where(filter).fetchAll(options);
        },

        savePr: function (data: DBUser, options: any) {
            return this.forge(data).save(null, options);
        },

        // password is required, but how can i express this in a typed manner?
        addPr: async function (data: IUser, options: any) {
            if (!data.password) throw new errors.ValidationError('password field required');
            data.password = await User.createHashPr(data.password);
            return await User.savePr(data, options)
        },

        /*
        find user , compare password, if not match return null else return user
        @return Promise<user|null, null>
        */
        loginPr: async function (username, password) {
            let model = await User.findOnePr({ username })
            if (!model) return null;
            let user = <DBUser>model.toJSON();
            let ismatch = await bcryptCompare(password, user.password);
            if (ismatch) {
                delete user.password
                return user
            } else {
                return null;
            }
        },

        // return Promise<password: string>
        createHashPr: function (password: string) {
            return bcryptCreateHash(password, saltRounds);
        },

        // only validate model, the ultimate result to be persisted into database
        // view model you do it in your controller
        validate: function (user: DBUser) {
            let result = booleanChain<DBUser>(e => {
                return _.isString(e.username) &&
                    validator.isLength(e.username, { min: 0 }) &&
                    validator.matches(e.username, /^[a-z-_0-9]+$/i)
            })
                .map(e => _.isString(e.email) && validator.isEmail(e.email))
                .map(e => _.isString(e.password))
                .map(e => _.isString(e.uuid))
                .run(user);

            return result;
        },


        // return a JWT token
        createTokenPr: async function (user: DBUser) {
            return await jwtSign({ id: user.id }, ENV_UTILS.getEnvConfig('JWT_SIGNED_TOKEN'), {})
        },

        async generateResetToken(expireMili: number, email: string): Promise<[Error | null, string]> {
            let model = await User.findOnePr({ email });
            if (!model) return [boom.badRequest('invalid email'), ''];
            return [null, UserUtils.generateResetToken(expireMili, email, model.get('password'))];
        },

        async validateResetTokenPr(token: string): Promise<[Error | null, IUser | null]> {
            let findUserByEmail = async (email) => {
                // todo: findOnePr should exclude password info by default
                let user = await User.findOnePr({ email }, { require: true });
                return user.toJSON();
            };

            try {
                let [error, user] = await UserUtils.validateResetToken(token, findUserByEmail, (dbuser) => {
                    delete dbuser.passowrd;
                    return dbuser as IUser
                })

                if (error) {
                    return [boom.badRequest(error.message), null];
                }
                return [null, user]
            } catch (error) {
                return [boom.badRequest(error.message), null]
            }
        }

    });

export const Users = bookshelf.Collection.extend({
    model: User
});


export function validateUserView(user: IUser): errors.ValidationError | null {
    if (!(_.isString(user.username) &&
        validator.isLength(user.username, { min: 0 }) &&
        validator.matches(user.username, /^[a-z-_0-9]+$/i))) {
        return new errors.ValidationError('username is invalid')
    }

    if (!(_.isString(user.email) && validator.isEmail(user.email))) {
        return new errors.ValidationError('email is invalid')
    }

    if (!(_.isString(user.password) && validator.isLength(user.password as any, { min: 8 }))) {
        return new errors.ValidationError('password is invalid')
    }

    return null
}

export const UserUtils = {
    generateResetToken(expireMili: number, email: string, password: string, appname = 'app'): string {
        function sign(expire: number, email: string, salt: string) {
            let hash = crypto.createHash('sha256');
            hash.update(String(expire));
            hash.update(email);
            hash.update(salt);
            return hash.digest('hex');
        }

        let result = [String(expireMili), email, sign(expireMili, email, password + appname)].join('|');
        return new Buffer(result).toString('base64');
    },

    // the whole generate & valid logic token can be replace with JWT. it would be much easier to do so 
    async validateResetToken(
        token: string,
        findUserByEmail: (email) => Promise<DBUser>,
        convertUser: (DBUser) => IUser): Promise<[Error | null, IUser | null]> {

        let result = new Buffer(token, 'base64').toString();
        let tokens = result.split('|');
        if (tokens.length !== 3) return [new Error('invalid token'), null];
        let expire = parseInt(tokens[0], 10);
        if (Date.now() > expire) return [new Error('token expired'), null];

        let email = tokens[1];
        if (!validator.isEmail(email)) return [new Error('invalid email: empty'), null];

        let dbuser = await findUserByEmail(email);
        if (!dbuser) return [new Error('invalid email: no user'), null]

        let createdToken = UserUtils.generateResetToken(expire, email, dbuser.password);
        // this implementation is more slower than the simple string comparison
        // let diff = token.length === createdToken.length ? 0 : 1;
        // for (let i = createdToken.length - 1; i >= 0; i--) {
        //     diff |= token.charCodeAt(i) ^ createdToken.charCodeAt(i)
        // }
        if (createdToken !== token) return [new Error('invalid token'), null];
        else return [null, convertUser(dbuser)];
    }
}
