'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('goals', [
      {name: "Goal 1", description: "Goal 1 - description", date_of_start: "2024-01-27", date_of_end: "2024-02-25", status: 1},
      {name: "Goal 2", description: "Goal 2 - description", date_of_start: "2024-02-27", date_of_end: "2024-03-25", status: 2},
      {name: "Goal 3", description: "Goal 3 - description", date_of_start: "2024-03-27", date_of_end: "2024-04-25", status: 3},
      {name: "Goal 4", description: "Goal 4 - description", date_of_start: "2024-04-27", date_of_end: "2024-05-25", status: 4},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('goals', null, {});
  }
};
