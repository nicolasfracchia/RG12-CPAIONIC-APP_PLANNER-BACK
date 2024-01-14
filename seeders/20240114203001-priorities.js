'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('priorities', [
      {id: 1, name: "LOW"},
      {id: 2, name: "MEDIUM"},
      {id: 3, name: "HIGH"},
      {id: 4, name: "URGENT"}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('priorities', null, {});
  }
};
