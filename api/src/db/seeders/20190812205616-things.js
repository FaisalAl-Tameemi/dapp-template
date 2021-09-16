'use strict';

const uuidv4 = require('uuid/v4')
const { thingTypeEnums } = require('../models/Thing/Thing.model')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('things', [{
      id: uuidv4(),
      title: 'Testing Things',
      ownerId: '7043ba2e-1ddd-4092-b926-6a13cfb3843c',
      kind: thingTypeEnums.GENERAL,
      createdAt: new Date(),
      updatedAt: new Date(),
    }])
  },

  down: (queryInterface, Sequelize) => {}
};
