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
    return queryInterface.addColumn('User', ['id'], {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    });
  },
  down: function down(queryInterface) {
    queryInterface.removeColumn('User', 'id');
  }
};