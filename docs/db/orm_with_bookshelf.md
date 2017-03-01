#Bookshelf
http://bookshelfjs.org/






## Notes
* how to properly extends bookshelf, see `model/user` implementation.

#
    destroy bookshelf on exit:
        .destroy(cb)


* bookshelf schema conventions: 

    * 1-to-many, 1-to-1:  reference table column default to `${table_name}_id` ?
        http://bookshelfjs.org/#Model-instance-belongsTo

    * man-to-many 
        * belongsToMany:
            * table: join table name, default to <this_model_table>_<other_model_table>
            * foreignKey: in join table, the foreign key of this table, default to <table name of this model>_id
            * otherKey: in join table, the foreign key of the other table, default to <table_name_of_other_mode>_id
            * foreignKeyTarget: Column in this model's table which foreignKey references, if other than id / idAttribute.
            * otherKeyTarget: Column in the Target model's table which otherKey references, if other than Target model's id / idAttribute.


* refine relation fetch

    ```javascript
    adminAccounts: function() {
        return this.belongsToMany(Account).query({where: {access: 'admin'}});
    },
    ```




# Links

* [bookshelf tutorial](http://stackabuse.com/bookshelf-js-a-node-js-orm/)




