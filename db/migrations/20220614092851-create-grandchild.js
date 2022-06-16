'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Grandchildren', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      granny_name: {
        type: Sequelize.STRING,
        unique: true,

      },
      password: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING,
        references: {
          model: {
              tableName: 'Grannies',
          },
      key: 'granny_name',
      },
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Grandchildren');
  }
};
