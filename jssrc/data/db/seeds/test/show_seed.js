exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('shows').del()
    // .then(function () {
    //   return Promise.all([
    //     // Inserts seed entries
    //     knex('table_name').insert({id: 1, colName: 'rowValue1'}),
    //     knex('table_name').insert({id: 2, colName: 'rowValue2'}),
    //     knex('table_name').insert({id: 3, colName: 'rowValue3'})
    //   ]);
    // });
    .then(function () { // Inserts seed entries one by one in series
      return knex('shows').insert({
        name: 'Suits',
        channel: 'USA Network',
        genre: 'Drama',
        rating: 3,
        explicit: false
      });
    }).then(function () {
      return knex('shows').insert({
        name: 'Game of Thrones',
        channel: 'HBO',
        genre: 'Fantasy',
        rating: 5,
        explicit: true
      });
    }).then(function () {
      return knex('shows').insert({
        name: 'South Park',
        channel: 'Comedy Central',
        genre: 'Comedy',
        rating: 4,
        explicit: true
      });
    }).then(function () {
      return knex('shows').insert({
        name: 'Mad Men',
        channel: 'AMC',
        genre: 'Drama',
        rating: 3,
        explicit: false
      });
    });
};

