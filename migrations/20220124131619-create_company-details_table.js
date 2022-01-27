'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("company_details", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11),
      },
      description: {
        type: Sequelize.STRING(300),
      },
      domain: {
        type: Sequelize.STRING(50),
      },
      website: {
        type: Sequelize.STRING(50),
      },
      employeeSize: {
        type: Sequelize.INTEGER(10),
      },
      followers: {
        type: Sequelize.INTEGER(10),
      },
      headquarter: {
        type: Sequelize.STRING(50),
      },
      company_id: {
        type: Sequelize.INTEGER(11),
      },
    })
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('company-details');
  }
};
