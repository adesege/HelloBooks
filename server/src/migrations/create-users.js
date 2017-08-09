
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    email: {
      allowNull: false,
      type: Sequelize.STRING
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING
    },
    userRank: {
      allowNull: false,
      defaultValue: 'beginner',
      type: Sequelize.STRING
    },
    userGroup: {
      allowNull: false,
      type: Sequelize.STRING
    },
    isActive: {
      allowNull: false,
      defaultValue: 1,
      type: Sequelize.INTEGER
    },
    isValidated: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.INTEGER
    },
    key: {
      allowNull: false,
      type: Sequelize.STRING
    },
    updatedAt: {
      allowNull: false,
      defaultValue: Sequelize.NOW,
      type: Sequelize.DATE
    },
    createdAt: {
      allowNull: false,
      defaultValue: Sequelize.NOW,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('User')
};
