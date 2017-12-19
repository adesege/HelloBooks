
module.exports = {
  up(queryInterface, Sequelize) {
    queryInterface.changeColumn('Book', 'bookCategoryId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
  },

  down(queryInterface, Sequelize) {
    queryInterface.changeColumn('Book', 'bookCategoryId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null
    });
  }
};
