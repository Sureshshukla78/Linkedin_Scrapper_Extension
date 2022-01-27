'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable("configs", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      company_letter: {
        type: Sequelize.CHAR,
        required: true
      },
      page_no: {
        type: Sequelize.INTEGER,
      },
    })
  },

  down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     */
    return queryInterface.dropTable('configs');
    
  }
};
