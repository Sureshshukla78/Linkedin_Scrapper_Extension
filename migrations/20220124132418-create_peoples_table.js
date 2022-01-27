'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable("people", {
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
      company_id: {
        type: Sequelize.INTEGER(11)
      }
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
