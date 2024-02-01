'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('surats', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      tujuan: {
        type: Sequelize.STRING
      },
      no_surat: {
        type: Sequelize.STRING
      },
      perihal: {
        type: Sequelize.STRING
      },
      tanggal: {
        type: Sequelize.DATE
      },
      jenis: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      files: {
        type: Sequelize.STRING
      },
      tipeFile: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('surats');
  }
};