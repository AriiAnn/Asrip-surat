'use strict';
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const hashpass = await bcrypt.hash("admin123", 10);
    await queryInterface.bulkInsert('Users',
      [
        {
          name: "manager",
          email: "manager@gmail.com",
          password: hashpass,
          isAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "staff",
          email: "staff@gmail.com",
          password: hashpass,
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {});
  },


  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
