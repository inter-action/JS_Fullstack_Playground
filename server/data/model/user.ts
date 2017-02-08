import * as ValidatorJS from 'validator';
import * as _ from 'lodash';

import { booleanChain, errors } from '../../utils';
import { bookshelf } from '../db';

export const User: any = bookshelf.Model.extend(
    {
        tableName: 'user',
        hasTimestamps: true,

        initialize: function () {
            this.on('saving', this.validateSave);
        },

        validateSave: function () {
            let attr: IUser = this.attributes;

            let result = booleanChain<IUser>(e => {
                return _.isString(e.username) &&
                    ValidatorJS.isLength(e.username, { min: 0 }) &&
                    ValidatorJS.matches(e.username, /^[a-z-_0-9]+$/i)
            })
                .map(e => _.isString(e.email) && ValidatorJS.isEmail(e.email))
                .map(e => _.isString(e.password) && ValidatorJS.isLength(e.password, { min: 8 }))
                .run(attr);

            if (!result) {
                // this would prevent model from saved
                throw new errors.ValidationError('user validation failed');
            }
            // else do nothing
        },

    }, {
        // static methods

        /*
        @return Promise<Model>
        */
        findOne: function (query: any, options: any) {
            return this.forge(query).fetch(options);
        },
        /*
        @return Promise<Collection>
        */
        findAll: function (filter: any = {}, options: any) {
            return this.forge().where(filter).fetchAll(options);
        },

        create: function (data: any, options: any) {
            return this.forge(data).save(null, options);
        },
    });

export interface IUser {
    username: string,
    email: string,
    password: string,
}

export const Users = bookshelf.Collection.extend({
    model: User
});

