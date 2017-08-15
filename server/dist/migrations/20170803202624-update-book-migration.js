'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    /*return queryInterface.addConstraint('User', ['id'], {
      type: 'FOREIGN KEY',
      references: { // Required field
        table: 'Book',
        field: 'userId'
      },
      onDelete: 'set default'
    });*/
    /*return queryInterface.addColumn('Book', ['ISSBN'], {
      type: Sequelize.String
    });*/
  },
  down: function down(queryInterface) {
    queryInterface.removeColumn('User', 'id');
  }
};