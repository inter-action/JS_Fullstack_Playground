import * as ValidatorJS from 'validator';
import * as _ from 'lodash';
import * as Bluebird from 'bluebird';

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
                    ValidatorJS.isLength(e.username, { min: 0 }) &&
                    ValidatorJS.matches(e.username, /^[a-z-_0-9]+$/i)
            })
                .map(e => _.isString(e.email) && ValidatorJS.isEmail(e.email))
                .map(e => _.isString(e.password))
                .map(e => _.isString(e.uuid))
                .run(user);

            return result;
        },


        // return a JWT token
        createTokenPr: async function (user: DBUser) {
            return await jwtSign({ id: user.id }, ENV_UTILS.getEnvConfig('JWT_SIGNED_TOKEN'), {})
        },

    });


export function validateUserView(user: IUser): errors.ValidationError | null {
    if (!(_.isString(user.username) &&
        ValidatorJS.isLength(user.username, { min: 0 }) &&
        ValidatorJS.matches(user.username, /^[a-z-_0-9]+$/i))) {
        return new errors.ValidationError('username is invalid')
    }

    if (!(_.isString(user.email) && ValidatorJS.isEmail(user.email))) {
        return new errors.ValidationError('email is invalid')
    }

    if (!(_.isString(user.password) && ValidatorJS.isLength(user.password as any, { min: 8 }))) {
        return new errors.ValidationError('password is invalid')
    }

    return null
}

export const Users = bookshelf.Collection.extend({
    model: User
});

