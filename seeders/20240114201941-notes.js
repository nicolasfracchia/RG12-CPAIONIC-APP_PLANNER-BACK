'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('notes', [
      {name: "Note 1", header: "Note 1 - Header", details: "Note 1 - details", importance: 1},
      {name: "Note 2", header: "Note 2 - Header", details: "Note 2 - details", importance: 2},
      {name: "Note 3", header: "Note 3 - Header", details: "Note 3 - details", importance: 3},
      {name: "Note 4", header: "Note 4 - Header", details: "Note 4 - details", importance: 4},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('notes', null, {});
  }
};
