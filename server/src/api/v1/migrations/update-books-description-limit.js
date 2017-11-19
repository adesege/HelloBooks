
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.changeColumn('Book', 'description', {
      type: Sequelize.TEXT
    });
  },

  down(queryInterface, Sequelize) {
    queryInterface.changeColumn('Book', 'description', {
      type: Sequelize.STRING
    });
  }
};
