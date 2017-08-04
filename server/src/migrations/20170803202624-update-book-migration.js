
module.exports = {
  up(queryInterface, Sequelize) {
  },

  down(queryInterface) {
    queryInterface.removeColumn('User', 'id');
  }
};
