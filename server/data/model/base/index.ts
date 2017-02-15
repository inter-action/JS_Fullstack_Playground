const {bookshelf} = require('../../db');
const uuidV4 = require('uuid/v4');

export const AppBookshelf = bookshelf;
// Cache an instance of the base model prototype
// let _ = bookshelf.Model.prototype;

AppBookshelf.Model = bookshelf.Model.extend({
    // Bookshelf `hasTimestamps` - handles created_at and updated_at properties
    hasTimestamps: true,

    // Bookshelf `defaults` - default values setup on every model creation
    defaults: function defaults() {
        return {
            uuid: uuidV4()
        };
    },

    // When loading an instance, subclasses can specify default to fetch
    // defaultColumnsToFetch: function defaultColumnsToFetch() {
    //     return [];
    // },

    // // format date before writing to DB, bools work
    // format: function format(attrs) {
    //     return this.fixDatesWhenSave(attrs);
    // },

    // // format data and bool when fetching from DB
    // parse: function parse(attrs) {
    //     return this.fixBools(this.fixDatesWhenFetch(attrs));
    // },

}, {
        // static method goes here
    })
