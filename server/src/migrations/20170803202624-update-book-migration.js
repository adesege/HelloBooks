
module.exports = {
  up(queryInterface, Sequelize) {
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

  down(queryInterface) {
    queryInterface.removeColumn('User', 'id');
  }
};
