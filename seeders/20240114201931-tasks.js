'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tasks', [
      {name: "Task 1", description: "Task 1 - description", date_of_start: "2024-01-27", date_of_end: "2024-02-25", status: 1},
      {name: "Task 2", description: "Task 2 - description", date_of_start: "2024-02-27", date_of_end: "2024-03-25", status: 2},
      {name: "Task 3", description: "Task 3 - description", date_of_start: "2024-03-27", date_of_end: "2024-04-25", status: 3},
      {name: "Task 4", description: "Task 4 - description", date_of_start: "2024-04-27", date_of_end: "2024-05-25", status: 4},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {});
  }
};
