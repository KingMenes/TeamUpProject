'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('RSVPs', [{
      userId: 1,
      eventId: 2,
      pending: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      eventId: 3,
      pending: true,
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
    return queryInterface.bulkDelete('RSVPs', null, {});
  }
};
