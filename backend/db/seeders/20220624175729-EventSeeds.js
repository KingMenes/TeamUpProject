'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Events', [{
      userId: 1,
      title: 'Paintball squad',
      description: 'I am looking for somebody to join my paintball team for the upcoming event',
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      title: 'Pingpong partner',
      description: 'looking for a professional partner for the doubles tournament',
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 3,
      title: 'Looking for setter',
      description: 'we need a setter for recreational volleyball at dyker heights',
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Events', null, {});
  }
};
