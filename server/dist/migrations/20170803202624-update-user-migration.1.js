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
    return queryInterface.addColumn('Book', ['deletedAt'], {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    });
  },
  down: function down(queryInterface) {
    queryInterface.removeColumn('User', 'id');
  }
};