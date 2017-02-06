import { bookshelf } from '../db';

export const User: any = bookshelf.Model.extend(
    {
        tableName: 'user',
        hasTimestamps: true
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

