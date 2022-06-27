'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('rsvpLists', [{
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('rsvpLists', null, {});
  }
};
