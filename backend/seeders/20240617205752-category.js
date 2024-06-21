module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        title: 'Программирование',
        created_at:new Date(),
        updated_at: new Date()

      },
      {
        title: 'Психология',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Интвенторизация',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', {category_id: 0 });
  }
};
