'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('User', [{
      name: 'John Doe',
      password: 12345,
      email: 'john.doe@we.com',
      userGroup: 'user',
      key: 'sd46hu87HFEQ2847BZAMNJ',
      createdAt: '08-09-2017',
      updatedAt: '08-09-2017'
    }, {
      name: 'Steve Doe',
      password: 2345,
      email: 'steve.doe@we.com',
      userGroup: 'admin',
      key: 'EQ2847sd46hu87HMNJFBZA',
      createdAt: '08-09-2017',
      updatedAt: '08-09-2017'
    }], {});
  },
  down: function down(queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
       Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDestroy('User', null, {});
  }
};