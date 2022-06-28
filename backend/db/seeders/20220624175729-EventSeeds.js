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
      date: '2023-11-11',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      title: 'Pingpong partner',
      description: 'looking for a professional partner for the doubles tournament',
      date: '2023-11-12',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 3,
      title: 'Looking for setter',
      description: 'we need a setter for recreational volleyball at dyker heights',
      date: '2023-01-11',
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
