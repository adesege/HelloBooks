module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Book', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlphanumeric: true,
        min: 3,
        max: 200
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
        escape: true
      },
      author: {
        type: Sequelize.STRING,
        defaulltValue: ' '
      },
      bookURL: {
        type: Sequelize.STRING,
        defaulltValue: ' '
      },
      ISSBN: {
        type: Sequelize.STRING,
        defaulltValue: ' '
      },
      publishedDate: {
        type: Sequelize.STRING,
        defaulltValue: ' '
      },
      bookCategoryId: {
        type: Sequelize.INTEGER
      },
      coverPhotoId: {
        type: Sequelize.INTEGER
      },
      documentPath: {
        type: Sequelize.STRING(1000),
        defaulltValue: ' '
      },
      userId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('Book');
  }
};
