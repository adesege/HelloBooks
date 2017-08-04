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
        defaulltValue: ' ',
        allowNull: false
      },
      bookURL: {
        type: Sequelize.STRING,
        defaulltValue: ' ',
        allowNull: false
      },
      ISSBN: {
        type: Sequelize.STRING,
        defaulltValue: ' ',
        allowNull: false
      },
      publishedDate: {
        type: Sequelize.STRING,
        defaulltValue: ' ',
        allowNull: false
      },
      bookCategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      coverPhotoId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      documentPath: {
        type: Sequelize.STRING(1000),
        defaulltValue: ' ',
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
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
