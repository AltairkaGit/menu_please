'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {  
    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([
        queryInterface.addColumn({tableName:'dish_list_dishes', schema: 'please'}, 'amount', {
          type: Sequelize.DataTypes.INTEGER,
          defaultValue: 1
        }, { transaction })
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([
        queryInterface.removeColumn({tableName:'dish_list_dishes', schema: 'please'}, 'amount', { transaction })
      ]);
    });
  }
};
