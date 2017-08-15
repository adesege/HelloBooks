'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
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
  down: function down(queryInterface) {
    return queryInterface.dropTable('Book');
  }
};