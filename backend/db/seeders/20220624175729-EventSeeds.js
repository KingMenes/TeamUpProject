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
      image: 'https://mir-s3-cdn-cf.behance.net/projects/404/b2a453134335959.Y3JvcCw5MjAsNzIwLDE1OSww.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      title: 'Pingpong partner',
      description: 'looking for a professional partner for the doubles tournament',
      date: '2023-11-12',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB4ub8Wj1zD_YawIjwcP39yIha9IYWdt28Bg&usqp=CAU',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 3,
      title: 'Looking for setter',
      description: 'we need a setter for recreational volleyball at dyker heights',
      date: '2023-01-11',
      image: 'https://geekculture.co/wp-content/uploads/2021/07/tokyo-olympics-2020-haikyuu-volleyball-6.jpg',
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
