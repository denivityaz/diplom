module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        email: 'admin@/rakova-elena.ru',
        isadmin: true,
        hashed_password: '$2b$10$LUQDA4yAU64Amet1XpjC8eALVB5ocu6pFxaSd3OFT9pKwsFYeWbx6',
        about: 'Administrator account',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { id: 1 });
  }
};
