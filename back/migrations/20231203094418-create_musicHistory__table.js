"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("MusicHistory", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      ip: {
        type: Sequelize.STRING, // IP 주소 또는 다른 방문자 식별자
        allowNull: true,
      },
      musicId: {
        type: Sequelize.INTEGER, // 조회한 게시글의 ID
        allowNull: false,
        references: {
          model: "Musics",
          key: "id",
        },
      },
      date: {
        type: Sequelize.DATE, // 조회 일자
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
