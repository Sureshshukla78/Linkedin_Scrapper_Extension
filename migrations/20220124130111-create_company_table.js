'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("companies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11),
      },
      url: {
        type: Sequelize.STRING,
        unique: true
      },
      name: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM("not_scraped", "scraped", "processing"),
        defaultValue: "not_scraped"
      },
      people_status: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    })
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('company');
  }
};
