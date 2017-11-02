
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('User', 'oauthID', {
      type: Sequelize.STRING
    });
  },

  down(queryInterface) {
    queryInterface.removeColumn('User', 'oauthID');
  }
};
