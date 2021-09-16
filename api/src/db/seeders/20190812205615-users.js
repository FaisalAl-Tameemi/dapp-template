'use strict';

const uuidv4 = require('uuid/v4')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
      id: '7043ba2e-1ddd-4092-b926-6a13cfb3843c',
      name: 'test test',
      email: 'test@test.com',
      password: 'test',
      updatedAt: new Date(),
      createdAt: new Date(),
    }])
  },

  down: (queryInterface, Sequelize) => {}
};
