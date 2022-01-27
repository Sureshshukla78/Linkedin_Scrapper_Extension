'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("people_details", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11),
      },
      email: {
        type: Sequelize.STRING(300),
      },
      position: {
        type: Sequelize.STRING(50),
      },
      website_link: {
        type: Sequelize.STRING(50),
      },
      number: {
        type: Sequelize.BIGINT(10),
      },
      experience: {
        type: Sequelize.INTEGER(10),
      },
      people_id: {
        type: Sequelize.INTEGER(11),
      }
    })
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('people-details');
  }
};
