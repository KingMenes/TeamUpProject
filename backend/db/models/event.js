'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING(50), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    date: DataTypes.DATE
  }, {});
  Event.associate = function (models) {
    // associations can be defined here
  };
  return Event;
};
