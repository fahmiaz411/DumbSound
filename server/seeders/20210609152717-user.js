"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "users",
      [
        {
          fullName: "Admin",
          email: "admin@dumbsound.id",
          password:
            "$2b$10$21MmffdY9b9Gr73mbkctq.LAxdem2mKuQ1GwuWjwxF4eedgCYsJFy",
          gender: "",
          phone: "",
          address: "",
          p_image: "admin.jpg",
          role: "admin",
          createdAt: "2021-06-08 21:03:52",
          updatedAt: "2021-06-08 21:03:52",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
