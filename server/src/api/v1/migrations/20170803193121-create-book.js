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
      ISBN: {
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
<<<<<<< HEAD
      coverPhotoPath: {
        type: Sequelize.STRING
=======
      coverPhotoId: {
        type: Sequelize.INTEGER
>>>>>>> ad44c0c7b60423889f2e4e3e79b032885217e1d8
      },
      documentPath: {
        type: Sequelize.STRING(1000),
        defaulltValue: ' '
      },
      userId: {
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
